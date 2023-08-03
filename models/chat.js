import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      message: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const chat = mongoose.model("Chat", chatSchema);
