import Joi from "joi";

export const purchaseCourseSchema = Joi.object({
  courseId: Joi.string(),
});

export const verifyPurchaseSchema = Joi.object({
  orderId: Joi.string(),
  paymentId: Joi.string(),
  signature: Joi.string(),
});
