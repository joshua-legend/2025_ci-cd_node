import Joi from "joi";

export const movieParamsSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.base": "id는 숫자여야 합니다.",
    "number.integer": "id는 정수여야 합니다.",
    "number.positive": "id는 양수여야 합니다.",
    "any.required": "id 값은 필수 입니다.",
  }),
});

export const movieBodyschema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  rating: Joi.number().positive().min(1).max(5).required(),
}).required();
