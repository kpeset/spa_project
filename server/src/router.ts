import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

import animalActions from "./modules/animal/animalActions";

router.get("/api/animals", animalActions.browse);

// Je veux une route qui me permet d'avoir un animal selon son id
router.get("/api/animals/:id", animalActions.read);

// Importer le fichier actions qui concerne les refuges
import shelterActions from "./modules/shelter/shelterActions";

// Je veux une route qui me permet d'avoir tous les refuges
router.get("/api/shelters", shelterActions.browse);
router.get("/api/shelters/:id", shelterActions.read);

// Je veux créer une route qui me permet de créer un nouveau refuge
router.post("/api/shelters", shelterActions.add);

/* ************************************************************************* */

export default router;
