export default function AddAnimal({ species }: Species) {
  console.info("species depuis enfant", species);

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

// "breed_id": 1,
// "species_id": 1,
// "tattooed": true,
// "vaccinated": true,
// "gender": "male",
// "age": 12,
// "description": "Trop sympa",
// "photo": "/path",
// "shelter_id": 1,
// "address": "Entre Arcachon et le Moulou"
