import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const authToken = asyncHandler(async (req, res, next) => {
  let token;
  const authorization = req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decoded;
      const authorizedUser = await userModel
        .findOne({ _id: id })
        .select("-password");
      req.user = authorizedUser;
      next();
    } catch (err) {
      res.status(400);
      throw await new Error("wrong token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("no token");
  }
});

export default authToken;
