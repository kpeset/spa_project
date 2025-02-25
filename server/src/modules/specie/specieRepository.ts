import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

class SpecieRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM species");
    return rows;
  }
}

export default new SpecieRepository();
