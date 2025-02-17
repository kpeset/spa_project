import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

class AnimalRepository {
  // Avoir tous les animaux
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM animal");
    console.info(rows);
    return rows;
  }

  // Avoir un animal selon son id
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM animal WHERE id = ?",
      [id],
    );
    console.info(rows[0]);
    return rows[0];
  }
}

export default new AnimalRepository();
