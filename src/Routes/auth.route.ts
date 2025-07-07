import { Router } from "express";
import { signup } from "../Controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup",signup as any);


export default authRouter;