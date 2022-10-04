import express, { json, urlencoded } from "express";
// import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";

import productRouter from "./routes/productsRoutes.js";
import componentRouters from "./components/components-router.js";

const app = express();

app.use(json({ limit: "50kb" }));
app.use(urlencoded({ limit: "50kb", extended: true }));
app.use(helmet());
app.use(cors());

app.use("/api/v1/products", productRouter);
app.use(componentRouters);

//error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message || "fatal-error",
    },
  });
});

export default app;
