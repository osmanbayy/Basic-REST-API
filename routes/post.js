import express from "express";
import { createPost, getPosts, getDetails, updatePost, deletePost, searchPost } from "../controllers/post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/get-posts", getPosts);
router.post("/create-post", auth, createPost);
router.get("/get-details/:id", getDetails);
router.patch("/update-post/:id", auth ,updatePost);
router.delete("/delete-post/:id", auth ,deletePost);
router.get("/search-post", searchPost);

export default router;
