import express from "express";
import dotenv from "dotenv";
import goalRouter from "./routes/goalRoutes.js";
import homeRouter from "./routes/homeRoutes.js";
import colors from "colors";
import mdbConnection from "./config/mdbConnection.js";
import errorMiddleware from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRoutes.js";
import authToken from "./middlewares/authMiddleware.js";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", homeRouter);
app.use("/api/goals", goalRouter);
app.use("/user", userRouter);
app.use(errorMiddleware);

mdbConnection();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`.bgCyan.black);
});
