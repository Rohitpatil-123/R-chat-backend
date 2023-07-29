import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "Please enter your email"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    picture: {
      type: String,
    },
    newMessages: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: "online",
    },
  },
  { minimize: false }
);

export const user = mongoose.model("User", userSchema);
