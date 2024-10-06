import PostSchema from "../models/post.js";

const getPosts = async (req, res) => {
  try {
    const getPosts = await PostSchema.find();
    res.status(201).json({ getPosts });
  } catch (error) {
    return res.status.json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = await PostSchema.create(req.body);
    res.status(201).json({ newPost });
  } catch (error) {
    return res.status.json({ message: error.message });
  }
};

const getDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const postDetail = await PostSchema.findById(id);
    res.status(200).json({ postDetail });
  } catch (error) {
    return res.status.json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await PostSchema.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ updatedPost });
  } catch (error) {
    return res.status.json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await PostSchema.findByIdAndDelete(id);
    res.status(201).json({ message: "Post removed!" });
  } catch (error) {
    return res.status.json({ message: error.message });
  }
};

const searchPost = async (req, res) => {
  const { search, tag } = req.query;
  try {
    const title = new RegExp(search, "i");
    const posts = await PostSchema.find({ $or: [{ title }], tag: { $in: tag.split(",") } });
    res.status(200).json({ posts });
  } catch (error) {
    return res.status.json({ message: error.message });
  }
};

export { getPosts, createPost, getDetails, updatePost, deletePost, searchPost };
