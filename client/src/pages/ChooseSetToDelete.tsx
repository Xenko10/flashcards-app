import styles from "./css/ChooseSetToDelete.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import DeleteSet from "./pages_components/DeleteSet";

type setNameObject = {
  Tables_in_flashcards: string;
};

export default function ChooseSetToDelete() {
  const [setsName, setSetsName] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5174/sets")
      .then((res: any) => {
        setSetsName(res.data);
      })
      .catch((error) => {
        console.error("Error fetching sets:", error);
      });
  }, []);

  function deleteSet(set: string) {
    axios.delete(`http://localhost:5174/set/${set}`);
    setSetsName((prevSetsName) =>
      prevSetsName.filter(
        (prevSetName: setNameObject) => prevSetName.Tables_in_flashcards !== set
      )
    );
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.flashcardsText}>Choose set to delete: </h1>
      <ul>
        {setsName.map((setNameObject: setNameObject) => (
          <DeleteSet
            setName={setNameObject.Tables_in_flashcards}
            key={uuidv4()}
            deleteSet={deleteSet}
          />
        ))}
      </ul>
    </div>
  );
}
