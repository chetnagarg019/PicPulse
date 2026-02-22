import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import Post from "./model/postModel.js";
import multer from "multer";
import uploadFile from "./services/storage.js";

connectDB();
const app = express();
app.use(cors());
app.use(express.json()); //data row format me ho jb use krte hai

//multer ka use jb krte hai jb data forms ke format me ho

app.get("/", (req, res) => {
  res.send("Server is runnig can  ");
});

const upload = multer({ storage: multer.memoryStorage() });
//Multer form-data ko parse karta ha Jab memoryStorage() use karte hain Tab file disk me save nahi hoti Wo memory me aati hai as req.file.buffer

app.post("/create-post", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const result = await uploadFile(req.file.buffer);

    const post = await Post.create({
      image: result.url,
      caption: req.body.caption,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    }); 
  }
});

//all show by [get mehtod]
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); //[] return
    res.status(200).json({
      message: "post fetched sucessfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching posts",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
