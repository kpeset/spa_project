interface PlatProps {
  plat: {
    nom: string;
    image: string;
    prix: string;
  };
}

export default function Plat({ plat }: PlatProps) {
  return (
    <>
      <h1>{plat.nom}</h1>
      <img style={{ width: "12rem" }} src={plat.image} alt={plat.nom} />
      <p>{plat.prix} euros HT évidemment</p>
    </>
  );
}
