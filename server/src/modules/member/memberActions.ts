import type { RequestHandler } from "express";
import { transporter } from "../../services/emailConfig";

import { randomUUID } from "node:crypto";

import memberRepository from "./memberRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const members = await memberRepository.readAll();
    res.json(members);
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const randomToken = randomUUID();

    req.body.token = randomToken;
    const insertId = await memberRepository.create(req.body);

    if (insertId) {
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: "Bienvenue sur la SPA",
        html: `<h1>Bienvenue</h1><a href="http://localhost:3310/api/confirm?email=${req.body.email}&token=${randomToken}">Clique ici</a>`,
      });
      res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
};

const sendSuccessStatus: RequestHandler = async (req, res, next) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const confirmUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, token } = req.query;

    const user = await memberRepository.readByEmailWithPassword(String(email));

    console.info(token, user.token);

    if (token !== user.token) {
      throw new Error("ça marche pas !");
    }

    await memberRepository.updateUserStatus(String(email));
    res.send("Email confirmé");
  } catch (error) {
    next(error);
  }
};

export default { browse, add, sendSuccessStatus, confirmUser };
