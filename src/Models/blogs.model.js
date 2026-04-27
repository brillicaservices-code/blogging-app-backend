import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 5,
      maxlength: 150,
    },


    category: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 300,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);


export const Blogs = mongoose.model("Blog", blogSchema)




    // description: {
    //   type: String,
    //   required: [true, "Description is required"],
    //   trim: true,
    //   maxlength: 300,
    // },