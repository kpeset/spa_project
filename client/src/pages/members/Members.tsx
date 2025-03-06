import { useLoaderData } from "react-router-dom";

export default function Members() {
  const members = useLoaderData();

  console.info(members);

  return (
    <>
      <h1>Liste des membres</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi dicta
        mollitia, sed molestias unde consequatur quaerat quisquam? Quia nemo
        asperiores, nihil inventore architecto ullam ratione maxime commodi
        labore velit ut?
      </p>
    </>
  );
}
