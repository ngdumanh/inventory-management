import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ShopDetailsResponse, Warehouse } from "../types"; // Adjust the import path as needed
import { getAccessToken, getAuthorizedShops } from "../sdk/tiktok/tiktokSDK";

const prisma = new PrismaClient();

// https://www.synclista.com/?app_key=6dt7o5taa35ra&code=TTP_zAl-agAAAAAIvp7tReYvtnY21CkbT1YGslRwp5EMBgEBrfDiLkrJ4LSZ7qwYbfRUh5e8jO9q720U022vvHzcoINTwGWmICuHhIOoTpa4J1WLV0e-S0r_pHzBTiod-1ce7DKLpx35nlgpKqcNNHmTglERPTtfTEGI&locale=en&shop_region=US
export const getAPIServices = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const apiServices = await prisma.aPIServices.findMany({
      where: {
        status: 1,
      },
      select: {
        service_id: true,
      },
    });
    res.status(200).json(apiServices);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while fetching API services" });
  }
};

export const getShopDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { user_id } = req.query;

  if (!user_id) {
    res.status(400).json({ message: "user_id is required" });
    return;
  }

  try {
    const shops = await prisma.shop.findMany({
      where: {
        user_id: Number(user_id),
      },
    });
    // get email from user_id
    const user = await prisma.user.findUnique({
      where: {
        id: Number(user_id),
      },
      select: {
        email: true,
      },
    });
    const shopDetails: ShopDetailsResponse[] = shops.map((shop) => ({
      shop_id: shop.shop_id,
      shop_name: shop.shop_name,
      shop_code: shop.shop_code,
      access_token_expire_in: shop.access_token_expire_in.toISOString(),
      owner_name: user?.email || "Unknown", // Set default value
      api_service_id: shop.api_service_id,
      subscription_start_date: shop.subscription_start_date.toISOString(),
      subscription_expire_date: shop.subscription_expire_date.toISOString(),
      refresh_token_expire_in: shop.refresh_token_expire_in.toISOString(),
      seller_base_region: shop.seller_base_region,
      shop_description: shop.shop_description || "None", // Set default value if not provided
      total_listing: 0, // Set default value
      total_live_listing: 0, // Set default value
      total_pending_listing: 0, // Set default value
      total_rejected_listing: 0, // Set default value
      total_frozen_listing: 0, // Set default value
      last_time_sync_listings: new Date().toISOString(), // Set default value
      total_orders: 0, // Set default value
      last_time_sync_orders: new Date().toISOString(), // Set default value
      scheduled_listing_to_date: 0, // Set default value
      warehouses: [], // Set default value
      status: 1, // Set default value
    }));

    res.status(200).json(shopDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while fetching shops" });
  }
};

export const createShop = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    user_id,
    auth_code_link,
    shop_name,
    shop_description,
    subscription_id,
    api_service_id,
  } = req.body;

  // Define the variables object
  const variables = {
    shop_id: "", // Assuming auth_code is used as shop_id
    shop_name: shop_name,
    shop_description: shop_description,
    subscription_id: 6,
    access_token: "",
    access_token_expire_in: new Date(),
    refresh_token: "",
    refresh_token_expire_in: new Date(),
    seller_base_region: "",
    shop_cipher: "",
    shop_code: "",
    user_id: user_id, // Example default value
    marketplace_id: 4, // Example default value
    api_service_id: api_service_id, // Example default value
    subscription_start_date: new Date(), // Example default value
    subscription_expire_date: new Date(), // Example default value
  };

  // Validate the request body
  if (
    !auth_code_link ||
    !shop_name ||
    !shop_description ||
    !subscription_id ||
    !api_service_id
  ) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const url = new URL(auth_code_link);
    const app_key = url.searchParams.get("app_key");
    const auth_code = url.searchParams.get("code");
    console.log("app_key", app_key);
    console.log("auth_code", auth_code);

    if (!app_key || !auth_code) {
      res.status(400).json({ message: "Invalid auth_code_link" });
      return;
    }

    // get service_id and app_secret from app_key
    const apiService = await prisma.aPIServices.findFirst({
      where: {
        app_key,
      },
      select: {
        service_id: true,
        app_secret: true,
      },
    });

    if (!apiService) {
      res.status(404).json({ message: "API Service not found" });
      return;
    }

    var response = await getAccessToken(
      app_key,
      apiService.app_secret,
      auth_code
    );

    // check if message = success
    if (response.code !== 0) {
      res.status(400).json({ message: response.message });
      return;
    }

    variables.access_token = response.data.access_token;
    variables.access_token_expire_in = new Date(
      response.data.access_token_expire_in * 1000
    );
    variables.refresh_token = response.data.refresh_token;
    variables.refresh_token_expire_in = new Date(
      response.data.refresh_token_expire_in * 1000
    );
    variables.seller_base_region = response.data.seller_base_region;

    console.log(response);

    response = await getAuthorizedShops(
      app_key,
      apiService.app_secret,
      response.data.access_token
    );

    if (response.code !== 0) {
      res.status(400).json({ message: response.message });
      return;
    }

    const shopList = response.data?.shops;
    console.log("shopList => " + shopList[0]);

    if (shopList && shopList.length > 0) {
      variables.shop_id = shopList[0].id;
      variables.shop_cipher = shopList[0].cipher;
      variables.shop_code = shopList[0].code;
      variables.shop_name = shopList[0].name;
    }

    console.log(response);

    // find marketplace_id with name = TikTok
    const marketplace = await prisma.marketplace.findFirst({
      where: {
        name: "TikTok",
      },
      select: {
        id: true,
      },
    });
    variables.marketplace_id = marketplace?.id || 4;

    // check if shop already exists
    const shop = await prisma.shop.findFirst({
      where: {
        shop_id: variables.shop_id,
      },
    });

    // we update the shop if it already exists
    if (shop) {
      console.log("Shop already exists, updating shop");
      const updatedShop = await prisma.shop.update({
        where: {
          shop_id: variables.shop_id,
        },
        data: variables,
      });
      res.status(200).json(updatedShop);
      return;
    }

    console.log("Creating new shop");
    // Create the new shop
    const newShop = await prisma.shop.create({
      data: variables,
    });

    res.status(200).json(newShop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating shop" });
  }
};
