import express from "express";
import { user } from "../models/user.js";
import { isauth } from "../middleware/auth.js";
import {
  registeruser,
  loginuser,
  getusers,
  logoutuser,
  getuser,
  getuserbyid,
} from "../controllers/user.js";
const router = express.Router();

router.post("/register", registeruser);
router.post("/login", loginuser);
router.post("/", isauth, getusers);
router.post("/logout", logoutuser);
router.post("/getuser", isauth, getuser);
router.post("/peruser", getuserbyid);

export default router;
