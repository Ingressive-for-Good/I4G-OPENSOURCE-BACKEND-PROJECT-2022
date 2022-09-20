import express from "express";
// import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";

import componentRouters from "./components/components-router.js";

const app = express();

app.use(helmet());
app.use(cors());

app.use(componentRouters);

export default app;
