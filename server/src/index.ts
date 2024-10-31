import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

// ROUTE IMPORTS
import authRoutes from "./routes/auth";
import apiServicesRoutes from "./routes/apiservices"; // Import the new route
import tiktokRoutes from "./routes/tiktok"; // Import the new route

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(
//   cors({
//     origin: "https://main.d3sxdwkjlgevbh.amplifyapp.com", // Replace with your frontend URL
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // Allow credentials
//   })
// );

app.use("/", authRoutes); // http://localhost:8000/dashboard
app.use("/service-ids", apiServicesRoutes); // Register the new route
app.use("/tiktok", tiktokRoutes); // Register the new route
// app.use("/products", productRoutes); // http://localhost:8000/products
// app.use("/users", userRoutes); // http://localhost:8000/users
// app.use("/expenses", expenseRoutes); // http://localhost:8000/expenses

/* SERVER */
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
