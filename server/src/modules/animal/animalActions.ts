import type { RequestHandler } from "express";

import animalRepository from "./animalRepository";

// const animals = [
//   {
//     id: 1,
//     name: "Rex",
//     tattooed: true,
//     vaccinated: true,
//     species: "Chien",
//     gender: "Mâle",
//     age: "Adulte",
//     breed: "Berger Allemand",
//     shelterName: "Refuge des Amis Fidèles",
//     description: "Très joueur et protecteur, idéal pour une famille active.",
//     photo: "/img/1.png",
//   },
//   {
//     id: 2,
//     name: "Mia",
//     tattooed: false,
//     vaccinated: true,
//     species: "Chat",
//     gender: "Femelle",
//     age: "Junior",
//     breed: "Siamois",
//     shelterName: "Havre de Paix Animalier",
//     description: "Affectueux et calme, parfait pour un appartement.",
//     photo: "/img/2.png",
//   },
//   {
//     id: 3,
//     name: "Luna",
//     tattooed: true,
//     vaccinated: false,
//     species: "NAC",
//     gender: "Femelle",
//     age: "Senior",
//     breed: "Lapin Nain",
//     shelterName: "Refuge Espoir",
//     description: "Douce et tranquille, idéale pour les enfants.",
//     photo: "/img/3.png",
//   },
//   {
//     id: 4,
//     name: "Rocky",
//     tattooed: false,
//     vaccinated: true,
//     species: "Chien",
//     gender: "Mâle",
//     age: "Junior",
//     breed: "Labrador",
//     shelterName: "Refuge des Amis Fidèles",
//     description: "Très énergique, adore les longues promenades.",
//     photo: "/img/4.png",
//   },
//   {
//     id: 5,
//     name: "Simba",
//     tattooed: false,
//     vaccinated: false,
//     species: "Chat",
//     gender: "Mâle",
//     age: "Adulte",
//     breed: "Maine Coon",
//     shelterName: "Havre de Paix Animalier",
//     description: "Majestueux, indépendant mais très loyal.",
//     photo: "/img/5.png",
//   },
//   {
//     id: 6,
//     name: "Bella",
//     tattooed: true,
//     vaccinated: true,
//     species: "Chien",
//     gender: "Femelle",
//     age: "Senior",
//     breed: "Golden Retriever",
//     shelterName: "Refuge Espoir",
//     description: "Douce et amicale, adore être entourée de gens.",
//     photo: "/img/6.png",
//   },
//   {
//     id: 7,
//     name: "Leo",
//     tattooed: false,
//     vaccinated: true,
//     species: "NAC",
//     gender: "Mâle",
//     age: "Junior",
//     breed: "Cochon d'Inde",
//     shelterName: "Refuge des Amis Fidèles",
//     description: "Curieux et joueur, parfait pour les jeunes enfants.",
//     photo: "/img/7.png",
//   },
//   {
//     id: 8,
//     name: "Cleo",
//     tattooed: true,
//     vaccinated: false,
//     species: "Chat",
//     gender: "Femelle",
//     age: "Senior",
//     breed: "Persan",
//     shelterName: "Havre de Paix Animalier",
//     description: "Calme et affectueux, aime les environnements tranquilles.",
//     photo: "/img/8.png",
//   },
//   {
//     id: 9,
//     name: "Max",
//     tattooed: false,
//     vaccinated: true,
//     species: "Chien",
//     gender: "Mâle",
//     age: "Adulte",
//     breed: "Beagle",
//     shelterName: "Refuge des Amis Fidèles",
//     description: "Très curieux et énergique, adore explorer.",
//     photo: "/img/9.png",
//   },
//   {
//     id: 10,
//     name: "Nina",
//     tattooed: true,
//     vaccinated: true,
//     species: "NAC",
//     gender: "Femelle",
//     age: "Junior",
//     breed: "Furet",
//     shelterName: "Refuge Espoir",
//     description: "Joueuse et espiègle, a besoin de beaucoup d'interaction.",
//     photo: "/img/10.png",
//   },
// ];

// Il faudra plus tard, importer le fichier repository pour
// la liaison à la BDD

// Une fonction qui va nous permettre d'afficher tous les animaux des refuges

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Ici je stock dans animals, le résultat de la méthode readAll qui provient du repository
    // note : cette méthode fait un select * de la table animal
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

export default { browse, read };
