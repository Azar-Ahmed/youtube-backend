import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwt.utils.js";
import {uploadImage} from "./fileUpload.service.js";

export const registerUser = async ({
  channelName,
  username,
  email,
  phone,
  password,
  file,
}) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  let logo = {};

  if (file) {
    const { public_id, secure_url } = await uploadImage(file);
    logo = { public_id, secure_url };
    console.log("Cloudinary response:", logo);
  } else {
    throw new Error("No file received, Please Upload Channel Logo");
  }

  const user = await User.create({
    _id: new mongoose.Types.ObjectId(),
    channelName,
    username,
    email,
    phone,
    password: hashedPassword,
    logo,
  });
  const token = generateToken(user._id);
  return { token, user };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  const token = generateToken(user._id);

  return { token, user };
};

export const updateUser = async ({
  userId,
  channelName,
  username,
  email,
  phone,
  password,
  file,
}) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (channelName) user.channelName = channelName;
  if (username) user.username = username;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (file) user.logo = await uploadImage(file);

  await user.save();
  return user;
};
