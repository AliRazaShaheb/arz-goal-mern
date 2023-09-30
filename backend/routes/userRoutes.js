import express from "express";
import {
  loggedUser,
  userLogin,
  userRegister,
} from "../controllers/userController.js";
import authToken from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/me", authToken, loggedUser);

export default userRouter;
