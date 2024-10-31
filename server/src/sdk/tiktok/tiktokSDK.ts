import axios, { AxiosError } from "axios";
import generateSignature from "./generateSignature";

const BASE_URL = "https://open-api.tiktokglobalshop.com";
const ACCESS_TOKEN_URL = "https://auth.tiktok-shops.com/api/v2/token/get";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// https://www.synclista.com/?app_key=6dt7o5taa35ra&code=TTP_F7N4xQAAAAAIvp7tReYvtnY21CkbT1YGpjDv9pNQ1wa_zbWtcE5ulFyrlUQotMZZhvctaokWskmID5GFH_tqLVzBWkSvsc8uOQo7kAz5DUnDrrtwJBtdbMrEY72doMKqraxqlxcC69fv3v1O6B35HOPT0f8or8abT1N86M6BwhRYFKMR3fvXXw&locale=en&shop_region=US

export const getAccessToken = async (
  appKey: string,
  appSecret: string,
  authCode: string
) => {
  try {
    // log url
    console.log(
      `${ACCESS_TOKEN_URL}?app_key=${appKey}&app_secret=${appSecret}&grant_type=authorized_code&auth_code=${authCode}`
    );
    const response = await axios.get(`${ACCESS_TOKEN_URL}`, {
      params: {
        app_key: appKey,
        app_secret: appSecret,
        grant_type: "authorized_code",
        auth_code: authCode,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      throw error.response ? error.response.data : new Error("Network Error");
    } else {
      // Handle non-Axios error
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getAuthorizedShops = async (
  appKey: string,
  appSecret: string,
  accessToken: string
) => {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const params = {
    app_key: appKey,
    timestamp,
  };
  const path = "/authorization/202309/shops";
  const sign = generateSignature(params, appSecret, path);

  try {
    const response = await axiosInstance.get(path, {
      params: {
        ...params,
        sign,
      },
      headers: {
        "x-tts-access-token": accessToken,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      throw error.response ? error.response.data : new Error("Network Error");
    } else {
      // Handle non-Axios error
      throw new Error("An unexpected error occurred");
    }
  }
};
