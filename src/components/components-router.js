import { Router } from "express";
import authRouter from "./auth/auth.routes.js";

const componentsRouter = Router();

componentsRouter.use("/auth/", authRouter);

componentsRouter.get("*", async (req, res) => {
  res.json({
    msg: "welcome i4G hacktoberfest 2022 opensource challenge",
  });
});

export default componentsRouter;
