import type { RequestHandler } from "express";

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
    console.info("depuis add", req.body);
    const insertId = await memberRepository.create(req.body);

    if (insertId) {
      res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
};

export default { browse, add };
