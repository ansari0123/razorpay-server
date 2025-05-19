import express from "express";
import {
  courseList,
  purchaseCourse,
  verifyPurchase,
} from "../Controllers/Course.controller.js";

const courseRouter = express.Router();

courseRouter.get("/list", courseList);

courseRouter.post("/order", purchaseCourse);

courseRouter.post("/verify-purchase", verifyPurchase);

export default courseRouter;
