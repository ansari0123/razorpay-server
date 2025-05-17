import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import courseRouter from "./routes/Course.routes.js";

dotenv.config();
const app = express();

console.log(process.env.MONGO_DB_URL);

app.use("/api/course", courseRouter);

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("DB Connected");
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
