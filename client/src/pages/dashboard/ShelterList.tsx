import { useLoaderData } from "react-router-dom";

export default function ShelterList() {
  const shelters = useLoaderData() as Shelter[];

  return (
    <>
      <h2>Les refuges</h2>
      {shelters.map((shelter) => (
        <p key={shelter.id}>{shelter.name}</p>
      ))}
    </>
  );
}
