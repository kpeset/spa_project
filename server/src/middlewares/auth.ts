import argon2 from "argon2";
import jwt from "jsonwebtoken";

import type { RequestHandler } from "express";

import memberRepository from "../modules/member/memberRepository";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;
    next();
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const member = await memberRepository.readByEmailWithPassword(email);

    if (!member) {
      res.sendStatus(422);
    }

    const verified = await argon2.verify(member.hashed_password, password);

    if (!verified) {
      res.sendStatus(422);
    } else {
      const payload = {
        id: member.id,
        email: member.email,
        role: "admin",
      };

      if (!process.env.APP_SECRET) {
        throw new Error(
          "Vous n'avez pas configuré votre APP SECRET dans le .env",
        );
      }

      const token = await jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "1y",
      });

      res.cookie("auth", token).json({
        message: "Connexion réussie",
        role: payload.role,
        email: payload.email,
      });
    }
  } catch (error) {
    next(error);
  }
};

const verify: RequestHandler = async (req, res, next) => {
  if (!process.env.APP_SECRET) {
    throw new Error("Vous n'avez pas configuré votre APP SECRET dans le .env");
  }

  try {
    // Récupérer le token qui est à l'intérieur du cookie
    const { auth } = req.cookies;

    // Si il y a pas le cookie on déclenche une erreur
    if (!auth) {
      res.sendStatus(403);
    }

    // Vérifier le token JWT qu'il y a à l'intérieur
    const resultPayload = await jwt.verify(auth, process.env.APP_SECRET);

    if (typeof resultPayload !== "object") {
      throw new Error("Token invalid");
    }

    req.member = {
      role: resultPayload.role,
      id: resultPayload.id,
    };

    // Si tout se passe bien => next()
    next();
  } catch (error) {
    next(error);
  }
};

const checkIfAdmin: RequestHandler = async (req, res, next) => {
  try {
    if (req.member.role === "admin") {
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
};

export default { checkIfAdmin, hashPassword, login, verify };
