import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import mongoose, { connect } from 'mongoose';
import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
import Post from "./model/postModel.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
    res.send("Server is runnig can  ");
})

app.post('/create-post',async (req,res) => {
    console.log(req.body);
    
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
