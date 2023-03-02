import express from "express";
import Post from "../models/Post";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";

const postsRouter = express.Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate({path: 'user', select: 'displayName'}).sort([['datetime', -1]]);
    return res.send(posts);
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

postsRouter.post('/', imagesUpload.single('image'), auth,  async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
      user: user._id,
      datetime: new Date,
    });

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