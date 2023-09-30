import express from "express";
import {
  createGoals,
  deleteGoals,
  getGoals,
  updateGoals,
} from "../controllers/goalController.js";
import authToken from "../middlewares/authMiddleware.js";

const goalRouter = express.Router();

goalRouter
  .route("/")
  // get goals
  .get(authToken, getGoals)
  // create goals
  .post(authToken, createGoals);

goalRouter
  .route("/:id")
  // update goals
  .put(authToken, updateGoals)
  // delete goals
  .delete(authToken, deleteGoals);

export default goalRouter;
