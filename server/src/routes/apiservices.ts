import express from "express";
import { getAPIServices } from "../controllers/apiservices";

const router = express.Router();

router.get("/", getAPIServices);

export default router;
