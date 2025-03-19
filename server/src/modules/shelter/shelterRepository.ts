import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Shelter = {
  id: number;
  name: string;
  address: string;
  capacity: number;
  picture: string;
};

class ShelterRepository {
  // Créer une requête qui me permet d'ajouter un refuge

  async create(shelter: Shelter) {
    // do something
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO shelter (name, address, capacity, picture) VALUES (?, ?, ?, ?)",
      [shelter.name, shelter.address, shelter.capacity, shelter.picture],
    );

    return result.insertId;
  }

  // fonction pour avoir tous les refuges

  async readAll() {
    // do something
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM shelter");
    return rows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM shelter WHERE id = ?",
      [id],
    );
    return rows[0];
  }
}

export default new ShelterRepository();
