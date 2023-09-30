import { msgObj } from "../utils/helpers.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// jwt token generate
const token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//@ desc    display logged user
//@ route    GET /user
//@ access   public

export const loggedUser = async (req, res) => {
  res.json(req.user);
};

//@ desc    register user
//@ route    POST /user/register
//@ access   public

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400);
      res.json(msgObj("please fill necessary feild"));
    }

    const found = await userModel.findOne({ email });

    if (found) {
      res.json(msgObj(`email ${req.body.email} is already exist`));
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashPass,
    });

    if (newUser) {
      res.status(201);
      res.json({
        msg: `${newUser.name} added successfully`,
        token: token(newUser._id),
      });
    } else {
      res.status(400);
      res.json(msgObj(`invalid user data`));
    }
  } catch (err) {
    console.log(err);
  }
};

//@ desc    login user
//@ route    POST /user/login
//@ access   public

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400);
      res.json(msgObj("please fill necessary feild"));
    }
    // find the user with email
    const foundUser = await userModel.findOne({ email });

    // check decryp password
    const checkPass = await bcrypt.compare(password, foundUser.password);

    if (foundUser && checkPass) {
      res.status(201);
      res.json({ name: foundUser.name, token: token(foundUser._id) });
    } else {
      res.status(400);
      res.json(msgObj(`invalid credentials`));
    }
  } catch (err) {
    console.log(err);
  }
};
