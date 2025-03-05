import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    about: { type: String, required: true },
    imgUrl: { type: String, required: true },
  },
  {
    collection: "user-data",
  }
);

// User.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

export const userData = mongoose.model("UserData", User);