import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  DB_IS_SYNC: Joi.boolean().required(),
  DB_AUTOLOAD_ENTITIES: Joi.boolean().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).optional(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});
