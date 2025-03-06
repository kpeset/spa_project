import type { RequestHandler } from "express";

import Joi from "joi";

const animalSchema = Joi.object({
  name: Joi.string().min(3).max(40).required().messages({
    "string.min": "Une longueur de 3 caractères est demandée",
    "string.empty": "Le champ ne peut pas être vide",
    "any.required": "Le champ est obligatoire",
  }),
  breed_id: Joi.number().required(),
  species_id: Joi.number().required(),
  tattooed: Joi.boolean().required(),
  vaccinated: Joi.boolean().required(),
  gender: Joi.string().valid("male", "female").required(),
  age: Joi.number().required(),
  description: Joi.string().required(),
  photo: Joi.string().required(),
  address: Joi.string().required(),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = animalSchema.validate(req.body);

  if (error) {
    res.json(error.details[0].message);
  } else {
    next();
  }
};

export default { validate };
