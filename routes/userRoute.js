import express from "express";
import {
  registerUser,
  loginUser,
  findUser,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUser);

export default router;
