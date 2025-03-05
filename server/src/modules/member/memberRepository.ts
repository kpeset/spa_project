import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Member = {
  id: number;
  email: string;
  hashed_password: string;
};

class MemberRepository {
  async create(member: Member) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO member (email, hashed_password) VALUES (?, ?)",
      [member.email, member.hashed_password],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM member");
    return rows;
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM member WHERE email = ?",
      [email],
    );

    return rows[0];
  }
}

export default new MemberRepository();
