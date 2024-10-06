import mongoose from "mongoose";

export const database = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB Connected!");
    })
    .catch((error) => {
      // throw new Error(error.message);
      console.log(error.message);
    });
};