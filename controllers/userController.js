import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(400).json("User with the given email already exist");
    if (!name || !email || !password)
      return res.status(400).json("All fields are required");
    if (!validator.isEmail(email))
      return res.status(400).json("Email must be a valid email");
    if (!validator.isStrongPassword(password))
      return res.status(400).json("Password must be a strong password");

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      name,
      email,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json("Invalid email or password");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json("Invalid email or password");

    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
