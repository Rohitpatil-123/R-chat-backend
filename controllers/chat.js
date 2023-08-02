import { chat } from "../models/chat.js";
import { user } from "../models/user.js";

export const getchat = async (req, res) => {
  try {
    const user1id = req.body.user1id;
    const user2id = req.body.user2id;
    const users = [user1id, user2id];
    users.sort();
    const chatd = await chat.findOne({ users: users });
    if (chatd) {
      res
        .status(200)
        .json({ success: true, messages: chatd.messages, data: chatd });
    } else {
      const response = await chat.create({ users: users });
      res
        .status(200)
        .json({ success: true, messages: response.messages, data: response });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addmessage = async (req, res) => {
  try {
    const user1id = req.body.user1id;
    const user2id = req.body.user2id;
    const users = [user1id, user2id];
    users.sort();
    const chatd = await chat.findOne({ users: users });
    if (chatd) {
      const message = req.body.message;
      chatd.messages.push({ author: user1id, message });
      const response = await chatd.save();
      res.status(200).json({ success: true, messages: response.messages });
    } else {
      res.status(404).json({ success: false, message: "Chat not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getuserchats = async (req, res) => {
  try {
    let userid = req.data._id;
    userid = userid.toString();
    const chats = await chat.find({ users: { $elemMatch: { $ne: userid } } });
    //   .populate("users");
    res.status(200).json({ success: true, data: chats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
