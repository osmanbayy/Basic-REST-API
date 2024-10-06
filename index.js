import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { database } from "./config/database.js";
import Auth from "./routes/auth.js";
import Post from "./routes/post.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/", Auth);
app.use("/", Post);

app.get("/", (req, res) => {
  res.json({ message: "Deneme" });
});

const PORT = process.env.PORT || 4000;

database();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
