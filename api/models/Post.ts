import {HydratedDocument, model, Schema, Types} from "mongoose";
import User from "./User";
import {IPost} from "../types";

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<IPost>) {
        if (this.image) return true;
        if (!this.description) return false;
      }
    }
  },
  image: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<IPost>) {
        if (this.description) return true;
        if (!this.image) return false;
      }
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  },
  datetime: {
    type: Date,
    required: true
  },
});

const Post = model('Post', PostSchema);
export default Post;