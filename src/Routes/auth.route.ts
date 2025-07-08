import { Router } from "express";
import { getProfile, signin, signup } from "../Controllers/auth.controller";
import { authMiddleware } from "../Middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/profile", authMiddleware as any, getProfile);

export default authRouter;
