import type { RequestHandler } from "express";

import shelterRepository from "./shelterRepository";

// const shelters = [
//   {
//     id: 1,
//     name: "Refuge des Amis Fidèles",
//     address: "123 Rue des Animaux, Paris",
//     capacity: 50,
//   },
//   {
//     id: 2,
//     name: "Havre de Paix Animalier",
//     address: "45 Avenue des Compagnons, Lyon",
//     capacity: 30,
//   },
//   {
//     id: 3,
//     name: "Refuge Espoir",
//     address: "78 Boulevard des Ailes, Marseille",
//     capacity: 40,
//   },
// ];

const browse: RequestHandler = async (req, res, next) => {
  try {
    // C'est comme si on avait la requête SQL
    const shelters = await shelterRepository.readAll();
    res.json(shelters);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shelter = await shelterRepository.read(Number(id));

    if (!shelter) {
      res.sendStatus(404);
    }

    res.json(shelter);
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    console.info(req.body, "REQ BODY");
    const insertId = await shelterRepository.create(req.body);

    if (insertId) {
      res.status(201).json({ insertId });
    }
  } catch (error) {
    next(error);
  }
};

export default { browse, read, add };
