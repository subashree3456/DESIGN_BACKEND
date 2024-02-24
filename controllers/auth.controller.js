import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).send("users not found");
    const list = users.map(function (i) {
      return { id: i._id, username: i.username };
    });
    res.status(200).send(list);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has Been Created...");
  } catch (error) {
    res.status(500).send(error);
  }
};
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send("User not found!");

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) {
      return res.status(400).send("Wrong password or username!");
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    );

    const { password, ...other } = user._doc;
    res.status(200).json({ other, token });
  } catch (error) {
    res.status(500).send(error);
  }
};
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
