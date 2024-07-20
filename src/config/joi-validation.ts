import * as Joi from 'joi';


export const joiValidationShema= Joi.object({

    URL_MONGODB: Joi.string().required(),
    PORT: Joi.number().default(3002),
    DEFAULT_LIMIT: Joi.number().default(10),

});
