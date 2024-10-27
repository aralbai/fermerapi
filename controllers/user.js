import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // // Generate JWT token
    // const token = jwt.sign(
    //   { username: user.username, id: user._id },
    //   "mysecretkey"
    // );
    // console.log(user.username);

    res.status(200).json({ token: user._id });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const register = async (req, res) => {
  try {
    const { phone, username, password } = req.body;

    // Hash the password and store the user
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(phone, username, password);

    const newUser = new User({
      phone,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
