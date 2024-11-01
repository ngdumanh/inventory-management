import { Router } from "express";
import {
  getAPIServices,
  getShopDetails,
  createShop,
} from "../controllers/shopController";
import logger from "../middleware/logger"; // Import the logger middleware

const router = Router();

// Apply the logger middleware to all routes in this router
router.use(logger);

router.get("/service-ids", getAPIServices);
router.get("/get-shop-details", getShopDetails);
router.post("/create-shop", createShop);

export default router;
