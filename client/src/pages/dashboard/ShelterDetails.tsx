import { useLoaderData } from "react-router-dom";

import AddAnimal from "./AddAnimal";

export default function ShelterDetails() {
  const { animals, species } = useLoaderData() as AniMalSpecies;

  return (
    <>
      <AddAnimal species={species} />

      <h1>Détails du refuge</h1>
      {animals.map((animal) => (
        <p key={animal.id}>{animal.name}</p>
      ))}
    </>
  );
}
