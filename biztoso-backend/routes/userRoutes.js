import express from "express";
import { userData } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await userData.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location,
      about: req.body.about,
      imgUrl: req.body.imgUrl,
    });
    res.json({ status: "ok" });
    console.log("req.body:" + req.body);
    console.log("userData: " + user);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Duplicate email" });
  }
});

router.post("/login", async (req, res) => {
  const user = await userData.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  console.log("user: " + user);

  if (user) {
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      "secret123"
    );
    res.json({ status: "login success!", user: token });
    console.log("userData: " + user);
  } else {
    res.json({ status: "error", error: "Invalid credentials!" });
  }
});

export default router;