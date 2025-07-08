import bcrypt from "bcrypt";
import { Schema, z } from "zod";
import { Request, Response } from "express";
import { User } from "../Models/User.Model";
import jwt from "jsonwebtoken";

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
     res
      .status(400)
      .json({ message: "input info correctly", success: false });
  } else {
    try {
      const { username, email, password } = req.body;

      const userExistsAlready = await User.findOne({ username, email });

      if (userExistsAlready) {
         res.status(400).json({ message: "Something went wrong" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        if (hashedPassword) {
          const user = await User.create({
            username,
            email,
            password: hashedPassword,
          });

          if (user) {
             res
              .status(200)
              .json({ message: "Signed up", success: true });
          }
        }
      }
    } catch (error) {
      console.log(error);
       res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
       res
        .status(400)
        .json({ message: "input fields can't be empty", success: false });
    }

    const userExists = await User.findOne({ username });

    if (!userExists) {
       res
        .status(400)
        .json({ message: "Something went wrong", success: false });
    } else {
      const comparePassword = await bcrypt.compare(
        password,
        userExists.password
      );

      if (!comparePassword) {
         res
          .status(400)
          .json({ message: "Something went wrong", success: false });
      } else {
        const token = jwt.sign(
          { id: userExists._id },
          String(process.env.JWT_SECRET as string)
        );
        res.json({ token, message: "Signed in", success: true });
      }
    }
  } catch (error) {
    console.log(error);
     res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const getProfile = async (req:Request,res:Response) =>{
  try {
    const userId = req.userId;

    if(!userId){
       res.status(400).json({message:"Something went wrong",success:false})
    }

    const user = await User.findOne({_id:userId}).select(" -password");

    if(!user){
       res.status(404).json({message:"Something went wrong",success:false})
    }

     res.status(200).json({user});


  } catch (error) {
     res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
  }
}
