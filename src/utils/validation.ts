import Joi from 'joi';

const schemaObj = {
  firstName: Joi.string().alphanum(),
  lastName: Joi.string().alphanum(),
  email: Joi.string().email(),
};

export const createUserSchema = Joi.object(schemaObj).fork(
  Object.keys(schemaObj),
  (schema) => schema.required(),
);

export const updateUserSchema = Joi.object(schemaObj);
