import goalModel from "../models/goalModel.js";
import { msgObj } from "../utils/helpers.js";
import asyncHandler from "express-async-handler";

// @dec     Get goals
// @route   GET /api/goals
// @access  public

export const getGoals = asyncHandler(async (req, res) => {
  const fetchAllGoals = await goalModel.find({ user: req.user._id });
  res.json(fetchAllGoals);
});

// @dec     create goals
// @route   POST /api/goals
// @access  public

export const createGoals = asyncHandler(async (req, res, next) => {
  if (!req.body.goal) {
    res.status(400).json(msgObj("please fill goal feilds"));
  }

  const newGoal = await goalModel.create({
    user: req.user._id,
    goal: req.body.goal,
  });
  res.status(200).json(newGoal);
});

// @dec     update goals
// @route   PUT /api/goals/id
// @access  public

export const updateGoals = asyncHandler(async (req, res) => {
  const found = await goalModel.findById(req.params.id);
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    res.json(msgObj("please fill update feild"));
  }

  if (!found) {
    res.status(400);
    res.json(msgObj("goal not found"));
  }

  if (found.user.toString() !== req.user._id.toString()) {
    res.status(400);
    throw new Error("invalid delete request");
  }

  const updatedGoal = await goalModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedGoal);
});

// @dec     delete goals
// @route   DELETE /api/goals/id
// @access  public

export const deleteGoals = asyncHandler(async (req, res) => {
  const found = await goalModel.findById(req.params.id);

  if (!found) {
    res.status(400);
    throw new Error("GOALS NOT FOUND");
  }

  if (found.user.toString() !== req.user._id.toString()) {
    res.status(400);
    throw new Error("invalid delete request");
  }

  await found.remove();
  res.status(200).json(msgObj(`goal -${found.goal}  deleted successfully `));
});
