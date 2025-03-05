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

const checkIfAdmin: RequestHandler = async (req, res, next) => {
  try {
    req.auth = {
      name: "windy",
      // changez la valeur du boolean pour voir ce qu'il se passe
      isAdmin: true,
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

      res.cookie("auth", token).send("Utilisateur connecté");
    }
  } catch (error) {
    next(error);
  }
};

export default { checkIfAdmin, hashPassword, login };
