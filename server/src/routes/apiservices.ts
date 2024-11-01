import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getAPIServices } from "../controllers/apiservices";
import logger from "../middleware/logger"; // Import the logger middleware
import { getAccessToken, getAuthorizedShops } from "../sdk/tiktok/tiktokSDK";

const router = Router();
const prisma = new PrismaClient();

// Apply the logger middleware to all routes in this router
router.use(logger);

router.get("/service-ids", getAPIServices);

router.post(
  "/create-shop",
  async (req: Request, res: Response): Promise<void> => {
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

    //https://www.synclista.com/?app_key=6dt7o5taa35ra&code=TTP_x6MFUQAAAAAIvp7tReYvtnY21CkbT1YGkxn-JmQZrTJN2HVidtm_798OMRjujFnAWYR-K1TubjAiFNaLmCMoalCjJrpkJ76KdNqyjdn8a3MOGG6rYWVW8uFJPHlPx-hMijlotsuxp1HzKeMLCGMiMOtlnRxbTJJP1abTi_GK2TD4n3PiSIAirg&locale=en&shop_region=US
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
      //res.status(201).json({ message: "access_token", access_token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error while creating shop" });
    }
  }
);

export default router;
