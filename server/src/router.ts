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

/* ************************************************************************* */

export default router;
