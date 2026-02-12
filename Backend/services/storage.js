import dotenv from "dotenv";
dotenv.config();
import { ImageKit } from "@imagekit/nodejs"; //Ye ImageKit ka official Node.js SDK hai. Ready-made library jo ImageKit ke server se baat karne deti hai.

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
//Tum ImageKit ka client bana rahi ho. Ab mera backend ImageKit ke server se connect ho sakta hai.”

async function uploadFile(buffer) { //Ye ek async function hai. Isko ek buffer milega.buffer multer se aata hai buufer means image ka raw binary data
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: "image.jpg",
  });

  return result;
}

//Base64 binary data ko string me convert karta hai  Base64 binary data ko string me convert karta hai ImageKit ko string format me file chahiye hoti hai
//ImageKit ko string format me file chahiye hoti hai Wo ek response object return karta hai usme url,field,name,size ye hota h


export default uploadFile;
