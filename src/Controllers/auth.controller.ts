import bcrypt from "bcrypt";
import { Schema, z } from "zod";
import { Request, Response } from "express";
import { User } from "../Models/User.Model";

const safeBody = z.object({
  username: z
    .string()
    .min(3, { message: "Username can't be shorter than your dick" })
    .max(30, { message: "Username can't be longer than you ahh" }),
  email: z.string().email("Write correct email"),
  password: z
    .string()
    .min(4, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

export const signup = async (req: Request, res: Response) => {
  const result = safeBody.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .json({ message: "input info correctly", success: false });
  } else {
    try {
      const { username, email, password } = req.body;

      const userExistsAlready = await User.findOne({ username, email });

      if (userExistsAlready) {
        return res.status(400).json({ message: "Something went wrong" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        if (hashedPassword) {
          const user = await User.create({
            username,
            email,
            password: hashedPassword,
          });

          if (user) {
            return res
              .status(200)
              .json({ message: "Signed up", success: true });
          }
        }
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  }
};
