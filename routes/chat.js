import express from "express";
import {
  addmessage,
  getchat,
  getperchat,
  getuserchats,
} from "../controllers/chat.js";
import { isauth } from "../middleware/auth.js";
const router = express.Router();

router.post("/addmessage", addmessage);
router.post("/createchat", getchat);
router.post("/getmyuser", isauth, getuserchats);
router.post("/getchat", getperchat);

export default router;
