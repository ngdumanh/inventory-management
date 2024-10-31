// server/src/routes/tiktok.ts

import express from "express";
import { getAccessToken, getAuthorizedShops } from "../sdk/tiktok/tiktokSDK";
const router = express.Router();

router.get("/get-token", async (req, res) => {
  const { app_key, app_secret, auth_code } = req.query;
  // log
  console.log("app_key", app_key);
  console.log("app_secret", app_secret);
  console.log("auth_code", auth_code);
  try {
    const tokenData = await getAccessToken(
      app_key as string,
      app_secret as string,
      auth_code as string
    );
    res.status(200).json(tokenData);
  } catch (error) {
    res.status(500).json({ message: "Error obtaining access token", error });
  }
});

router.get("/authorized-shops", async (req, res) => {
  const { appKey, appSecret, accessToken } = req.query;
  try {
    const shops = await getAuthorizedShops(
      appKey as string,
      appSecret as string,
      accessToken as string
    );
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching authorized shops", error });
  }
});

export default router;
