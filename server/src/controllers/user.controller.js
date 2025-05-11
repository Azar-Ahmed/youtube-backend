import {
  registerUser,
  loginUser,
  updateUser,
} from "../services/user.service.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

export const signUp = async (req, res, next) => {
  try {
    const { channelName, username, email, phone, password } = req.body;
    const file = req.files?.logo;

    if (!channelName || !username || !email || !phone || !password) {
      throw new Error("All fields are required!");
    }

    const { token, user } = await registerUser({
      channelName,
      username,
      email,
      phone,
      password,
      file,
    });
    res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required!");
    }

    const { token, user } = await loginUser({ email, password });
    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res
      .status(200)
      .json({ message: "Logout successful. Just remove token on client." });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { channelName, username, email, phone } = req.body;
    const file = req.files?.logo;
    const user = await updateUser({
      userId: req.user.id,
      channelName,
      username,
      email,
      phone,
      file,
    });
    res.status(200).json({ user, message: "Profile updated" });
  } catch (error) {
    next(error);
  }
};


export const subscribe = async (req, res, next) => {
  try {
    const { channelId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(400).json({ message: "Invalid channel ID" });
    }

    if (req.user._id === channelId) {
      return res.status(400).json({ message: "You cannot subscribe to yourself!" });
    }

    const currentUser = await User.findById(req.user._id);
    const channelUser = await User.findById(channelId);

    if (!currentUser || !channelUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { subscribedChannels: channelId } },
      { new: true, runValidators: true }
    );

    await User.findByIdAndUpdate(
      channelId,
      { $inc: { subscribers: 1 } },
      { new: true }
    );

    res.status(200).json({ message: "Subscribed successfully" });
  } catch (error) {
    next(error);
  }
};

