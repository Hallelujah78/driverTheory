import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import xss from "xss-clean";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();
import connectDB from "./db/connect.js";

import authRouter from "./routes/authRoutes.js";
import emptyRouter from "./routes/emptyRoutes.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({ msg: "welcome!" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", emptyRouter);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("connected to DB...");
    app.listen(port, () => {
      console.log(`server listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
