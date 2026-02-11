import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import mongoose, { connect } from 'mongoose';
import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
import Post from "./model/postModel.js";
import multer from "multer";


dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json()); //data row format me ho jb use krte hai 

//multer ka use jb krte hai jb data forms ke format me ho 

app.get("/",(req,res) => {
    res.send("Server is runnig can  ");
})

const upload = multer({ storage : multer.memoryStorage() });

app.post('/create-post', upload.single("image"), async (req,res) => {
    console.log(req.body);
    console.log(req.file);
    
    
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
