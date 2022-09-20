import express,{json,urlencoded} from "express";
// import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";

import componentRouters from "./components/components-router.js";

const app = express();

app.use(json({ limit: '50kb' }));
app.use(urlencoded({ limit: '50kb' }));
app.use(helmet());
app.use(cors());

app.use(componentRouters);

export default app;
