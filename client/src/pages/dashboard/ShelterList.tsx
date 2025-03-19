import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ShelterList() {
  const { shelters } = useLoaderData() as Shelters;
  console.info(shelters);

  return (
    <>
      <h2>Les refuges</h2>
      <ul>
        {shelters.map((shelter) => (
          <li key={shelter.id}>
            <img
              src={`http://localhost:3310/uploads/${shelter.picture}`}
              alt=""
            />
            <Link to={`/shelters/${shelter.id}`}>{shelter.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
