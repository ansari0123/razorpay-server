import express from "express";
import {
  purchaseCourse,
  verifyPurchase,
} from "../Controllers/Course.controller.js";

const courseRouter = express.Router();

courseRouter.post("/order", purchaseCourse);

courseRouter.post("/verify-purchase", verifyPurchase);

export default courseRouter;
