import e from "express";
import { user } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const registeruser = async (req, res) => {
  const { name, email, password, picture } = req.body;
  try {
    const data = await user.findOne({ email });
    if (data) {
      res.status(409).json({ success: false, message: "User already exists" });
    } else {
      const hashedpassword = await bcrypt.hash(password, 10);
      const userd = await user.create({
        name,
        email,
        password: hashedpassword,
        picture,
      });
      const token = jwt.sign({ _id: userd._id }, process.env.JWT_SECREAT);

      let options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
      };

      if (process.env.NODE_ENV == "development") {
        options = {};
      }

      res.status(201).cookie("token", token, options).json({
        success: true,
        message: "registered succesfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await user.findOne({ email });
    if (!data) {
      res.status(404).json({ success: false, message: "User not found" });
    } else {
      const ismatch = await bcrypt.compare(password, data.password);
      if (ismatch) {
        const token = jwt.sign({ _id: data._id }, process.env.JWT_SECREAT);
        let options = {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 15 * 60 * 1000,
        };
        if (process.env.NODE_ENV == "development") {
          options = {};
        }
        return res.status(200).cookie("token", token, options).json({
          success: true,
          message: "Logged in successfully",
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getusers = async (req, res) => {
  try {
    const data = req.data;
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const users = await user.find(keyword).find({ _id: { $ne: data._id } });
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutuser = async (req, res) => {
  try {
    res.clearCookie("token").json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
