import {
  purchaseCourseSchema,
  verifyPurchaseSchema,
} from "../validation/Course.schema.js";
import Course from "../modals/Course.modal.js";
import razorpay from "../configs/Razorpay.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const courseList = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json("Server Error..!");
  }
};

export const purchaseCourse = async (req, res) => {
  try {
    const { error, value } = purchaseCourseSchema.validate(req.body);

    if (error) {
      res.status(400).json("course id required..!");
    }

    const course = await Course.findById(value.courseId);

    if (!course) {
      res.status(404).json("No course found..!");
    }

    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const verifyPurchase = async (req, res) => {
  try {
    const { error, value } = verifyPurchaseSchema.validate(req.body);

    if (error) {
      res.status(400).json("course id required..!");
    }

    const sign = value.orderId + "|" + value.paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (value.signature === expectedSignature) {
      // do DB operation here
      res.status(200).json("Payment successful..!");
    } else {
      res.status(400).json("Payment verification failed..!");
    }
  } catch (err) {
    res.status(500).json("Server Error..!");
  }
};
