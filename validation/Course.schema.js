import Joi from "joi";

export const purchaseCourseSchema = Joi.object({
  courseId: Joi.string(),
});
