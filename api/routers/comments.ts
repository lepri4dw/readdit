import express from "express";
import Comment from "../models/Comment";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.find({post: req.query.post}).populate({path: 'user', select: 'displayName'});
    return res.send(comments);
  } catch (e) {
    return next(e);
  }
});

commentsRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const comment = new Comment({
      user: user._id,
      post: req.body.post,
      text: req.body.text
    });

    await comment.save();
    return res.send(comment);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});



export default commentsRouter;