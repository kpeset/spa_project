import type { RequestHandler } from "express";

import specieRepository from "./specieRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const species = await specieRepository.readAll();
    res.json(species);
  } catch (error) {
    next(error);
  }
};

export default { browse };
