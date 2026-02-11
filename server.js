import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
// import mongoose, { connect } from 'mongoose';
import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
import Post from "./model/postModel.js";
import multer from "multer";
import uploadFile from "./services/storage.js";


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
    // --- ise krne se hume ek buffer mila tha   buffer: <Buffer 89 50 4e 4.. 548308 more bytes>, is type se ise ke andr humari file hai  isi ko hume upload krna hoga image kit(sefvice provider me )
    const result = await uploadFile(req.file.buffer);
    console.log(result);
    
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
