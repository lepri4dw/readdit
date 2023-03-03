import express from "express";
import Post from "../models/Post";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import Comment from "../models/Comment";

const postsRouter = express.Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate({path: 'user', select: 'displayName'}).sort([['datetime', -1]]).lean();
    const newPosts = await Promise.all(posts.map(async (post) => {
      const comments = await Comment.find({post: post._id});
      return {
        ...post,
        numberOfComments: comments.length
      }
    }));
    return res.send(newPosts);
  } catch (e) {
    return next(e);
  }
});

postsRouter.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate({path: 'user', select: 'displayName'});

    if (!post) {
      return res.sendStatus(404);
    }

    return res.send(post);
  } catch (e) {
    return next(e);
  }
});

postsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const postData = {
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
      user: user._id,
      datetime: new Date(),
    }
    const post = new Post(postData);

    await post.save();
    return res.send(post);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default postsRouter;