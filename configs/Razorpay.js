import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORYPAY_API_KEY,
  key_secret: process.env.RAZORYPAY_KEY_SECRET,
});

export default razorpay;
