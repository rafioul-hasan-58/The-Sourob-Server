import { Request, Response } from "express";
import { User } from "./auth.model";
import bcrypt from "bcryptjs";

const randomPass = Math.ceil(Math.random() * 1000000);

export const registerUser = async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const { name, email, role } = req.body;
    // console.log(req.body);

    const password = req.body.password || randomPass;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Create new user
    // const user = new User({
    //   name,
    //   email,
    //   role,
    //   password,
    // });

    // Save user to database
    const result = await User.create({ name, email, role, password })
    // console.log('result', result);

    res.status(201).json({ message: "User registered successfully"});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user!.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
