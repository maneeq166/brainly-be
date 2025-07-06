import express from "express";
const app = express();
import helmet from "helmet";
import morgan from "morgan";
import { connectDb } from "./Config/db.config";

//logs every stuff 
const morganFormat = ':method :url :status :response-time ms';
app.use(
  morgan(morganFormat)
);
//protects my website from attacks
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
  res.json({message:"hello"})
})


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



