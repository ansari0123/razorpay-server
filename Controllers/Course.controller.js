import { purchaseCourseSchema } from "../validation/Course.schema.js";
import Course from "../modals/Course.modal.js";
import razorpay from "../configs/Razorpay.js";

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
    res.status(500).json("Server Error..!");
  }
};

export const verifyPurchase = async (req, res, next) => {
  res.json("hello");
};
