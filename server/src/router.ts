import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import des middlewares
import auth from "./middlewares/auth";
import form from "./middlewares/form";

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import animalActions from "./modules/animal/animalActions";

router.get("/api/animals", auth.checkIfAdmin, animalActions.browse);

// Je veux une route qui me permet d'avoir un animal selon son id
router.get("/api/animals/:id", animalActions.read);

// Je veux une route qui me permet d'ajouter un animal
router.post("/api/animals", form.validate, animalActions.add);

// Importer le fichier actions qui concerne les refuges
import shelterActions from "./modules/shelter/shelterActions";

// Je veux une route qui me permet d'avoir tous les refuges
router.get("/api/shelters", shelterActions.browse);
router.get("/api/shelters/:id", shelterActions.read);

// Je veux créer une route qui me permet de créer un nouveau refuge
router.post("/api/shelters", auth.checkIfAdmin, shelterActions.add);

/* ************************************************************************* */

export default router;
