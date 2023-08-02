import express from "express";
import { addmessage, getchat, getuserchats } from "../controllers/chat.js";
import { isauth } from "../middleware/auth.js";
const router = express.Router();

router.get("/addmessage", addmessage);
router.get("/createchat", getchat);
router.get("/getmyuser", isauth, getuserchats);

export default router;
