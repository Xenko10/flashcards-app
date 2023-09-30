import styles from "./css/DeleteSetPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import DeleteSet from "./pages_components/DeleteSet";

export default function DeleteSetPage() {
  const [sets, setSets] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5174/getsets")
      .then((res: any) => {
        setSets(res.data);
      })
      .catch((error) => {
        console.error("Error fetching sets:", error);
      });
  }, []);

  function deleteSet(set: string) {
    axios.delete(`http://localhost:5174/delete/${set}`);
    setSets((prevSets) =>
      prevSets.filter((prevSet: any) => prevSet.Tables_in_flashcards !== set)
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.flashcardsText}>Choose set to delete: </div>
      {sets.map((set: any) => (
        <DeleteSet
          set={set.Tables_in_flashcards}
          key={uuidv4()}
          deleteSet={deleteSet}
        />
      ))}
    </div>
  );
}
