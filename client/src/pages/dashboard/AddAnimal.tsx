export default function AddAnimal({ species }: Species) {
  return (
    <>
      <h2>Ajouter un animal</h2>
      <select name="" id="">
        {species.map((specie) => (
          <option key={specie.id}>{specie.name}</option>
        ))}
      </select>
      <p>Nom de l'animal</p>
      <input type="text" />
    </>
  );
}
