import express, { NextFunction, Request, Response } from "express";
const app = express();
import helmet from "helmet";
import morgan from "morgan";
import { connectDb } from "./Config/db.config";
import authRouter from "./Routes/auth.route";
import 'dotenv/config'
import { configDotenv } from "dotenv";

configDotenv();

//logs every stuff 
const morganFormat = ':method :url :status :response-time ms';
app.use(
  morgan(morganFormat)
);
//protects my website from attacks
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/v1/auth",authRouter);

const port = 3000;
async function connection() {
  try {
    await connectDb();
    console.log("Database is connected");

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Connection error:", error);
  }
}

connection();


app.use((req:Request,res:Response,next:NextFunction)=>{
  res.status(404).json({message:"No route Found"})
})
