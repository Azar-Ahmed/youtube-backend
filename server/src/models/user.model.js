import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  channelName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  logo:{
    public_id: String,
    secure_url: String,  
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  subscribedChannels: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},{timestamps:true});

// Ensure password never appears in JSON
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const userModel = mongoose.model("User" , userSchema);
export default userModel;