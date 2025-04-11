import axios from "axios";
import Papa from "papaparse";

import Plat from "../components/Plat";

import { useEffect, useState } from "react";

interface DataTypes {
  nom: string;
  prix: string;
  image: string;
  description: string;
}

export default function Home() {
  const [data, setData] = useState([] as DataTypes[]);

  useEffect(() => {
    const fetchGoogleSheet = async () => {
      try {
        const response = await axios.get("URL DU GOOGLE SHEET", {
          responseType: "blob",
        });

        Papa.parse<DataTypes>(response.data, {
          header: true,
          skipEmptyLines: true,
          complete: (response) => {
            setData(response.data);
          },
          error: (error) => {
            console.error(error);
          },
        });

        console.info(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGoogleSheet();
  }, []);

  return (
    <>
      <h1>Liste des plats</h1>
      {data.map((plat) => (
        <Plat key={plat.nom} plat={plat} />
      ))}
    </>
  );
}
