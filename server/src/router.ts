import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import des middlewares
import auth from "./middlewares/auth";
import form from "./middlewares/form";
import upload from "./middlewares/upload";

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import animalActions from "./modules/animal/animalActions";

router.get("/api/animals", animalActions.browse);

// Je veux une route qui me permet d'avoir un animal selon son id
router.get("/api/animals/:id", animalActions.read);

// Je veux une route qui me permet d'ajouter un animal
router.post(
  "/api/animals",
  form.validate,
  auth.verify,
  auth.checkIfAdmin,
  animalActions.add,
);

// Une route qui me permet d'avoir les animaux qui sont dans un certain refuge
router.get("/api/shelters/:id/animals", animalActions.readByShelter);

// Importer le fichier actions qui concerne les refuges
import shelterActions from "./modules/shelter/shelterActions";

// Je veux une route qui me permet d'avoir tous les refuges
router.get("/api/shelters", shelterActions.browse);
router.get("/api/shelters/:id", shelterActions.read);

// Je veux créer une route qui me permet de créer un nouveau refuge
router.post("/api/shelters", upload.uploadFile, shelterActions.add);

import specieActions from "./modules/specie/specieActions";

// Je veux une route qui me permet d'avoir la liste des espèces
router.get("/api/species", specieActions.browse);

// Création des routes gestion des membres

import memberActions from "./modules/member/memberActions";

router.get("/api/members", memberActions.browse);
router.post("/api/members", auth.hashPassword, memberActions.add);

router.post("/api/login", auth.login);

router.get(
  "/api/checkAdmin",
  auth.verify,
  auth.checkIfAdmin,
  memberActions.sendSuccessStatus,
);

router.get("/api/confirm", memberActions.confirmUser);

/* ************************************************************************* */

export default router;
