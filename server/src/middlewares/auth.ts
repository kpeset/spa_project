import type { RequestHandler } from "express";

const checkIfAdmin: RequestHandler = async (req, res, next) => {
  try {
    req.auth = {
      name: "windy",
      // changez la valeur du boolean pour voir ce qu'il se passe
      isAdmin: false,
    };

    if (req.auth.isAdmin === true) {
      next();
    } else {
      res.status(401).send("Pas autorisé");
    }
  } catch (error) {
    next(error);
  }
};

export default { checkIfAdmin };
