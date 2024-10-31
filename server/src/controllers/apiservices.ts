import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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
