import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:3310/api/animals")
      .then((response) => console.info(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}

export default App;
