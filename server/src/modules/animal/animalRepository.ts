import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Animal = {
  id: number;
  name: string;
  tattooed: number;
  vaccinated: number;
  species_id: string;
  gender: string;
  age: string;
  breed_id: string;
  description: string;
  photo: string;
  shelter_id: number;
};

class AnimalRepository {
  // Avoir tous les animaux
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(`SELECT animal.id, animal.name, breed.name as breed, species.name as species, shelter.name as shelter, shelter.address FROM animal
JOIN shelter ON animal.shelter_id = shelter.id
JOIN breed ON animal.breed_id = breed.id
JOIN species ON species.id = animal.species_id`);
    console.info(rows);
    return rows;
  }

  async readAnimalByShelter(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT animal.id, animal.name, breed.name as breed, species.name as species, shelter.name as shelter, shelter.address FROM animal
JOIN shelter ON animal.shelter_id = shelter.id
JOIN breed ON animal.breed_id = breed.id
JOIN species ON species.id = animal.species_id WHERE animal.shelter_id = ?`,
      [id],
    );
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

  async create(animal: Animal) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO animal (name, tattooed, vaccinated, species_id, gender, age, breed_id, description, photo, shelter_id) VALUES
  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        animal.name,
        animal.tattooed,
        animal.vaccinated,
        animal.species_id,
        animal.gender,
        animal.age,
        animal.breed_id,
        animal.description,
        animal.photo,
        animal.shelter_id,
      ],
    );

    return result.insertId;
  }
}

export default new AnimalRepository();

// {
//     "name": "TOUTOUYOUTOU",
//     "tattooed": 1,
//     "vaccinated": 1,
//     "species": "Chien",
//     "gender": "Mâle",
//     "age": "Adulte",
//     "breed": "Boxer",
//     "description": "Gentil et mignon.",
//     "photo": "/img/3.png",
//     "shelter_id": 1
// }
