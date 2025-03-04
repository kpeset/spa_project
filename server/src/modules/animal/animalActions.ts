import type { RequestHandler } from "express";

import animalRepository from "./animalRepository";

// Il faudra plus tard, importer le fichier repository pour
// la liaison à la BDD

// Une fonction qui va nous permettre d'afficher tous les animaux des refuges

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Ici je stock dans animals, le résultat de la méthode readAll qui provient du repository
    // note : cette méthode fait un select * de la table anio
    const animals = await animalRepository.readAll();
    if (!animals.length) {
      res.sendStatus(404);
    }

    res.json(animals);
  } catch (error) {
    next(error);
  }
};

// Je veux créer une fonction qui va me permettre d'afficher un animal selon son id

const read: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const animal = await animalRepository.read(Number(id));

    if (!animal) {
      res.sendStatus(404);
    }

    res.json(animal);
  } catch (error) {
    next(error);
  }
};

// Je veux une fonction qui me permet d'ajouter un animal

const add: RequestHandler = async (req, res, next) => {
  try {
    const animal = req.body;
    const insertId = await animalRepository.create(animal);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const readByShelter: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const animals = await animalRepository.readAnimalByShelter(Number(id));

    res.json(animals);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, add, readByShelter };
