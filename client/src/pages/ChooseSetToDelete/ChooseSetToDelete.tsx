import styles from "./ChooseSetToDelete.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteSet from "./DeleteSet";
import { API_URL } from "../../constant";

type SetsDto = {
  name: string;
}[];

export default function ChooseSetToDelete() {
  const [setsName, setSetsName] = useState<SetsDto>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/sets`)
      .then((res) => {
        setSetsName(res.data);
      })
      .catch((error) => {
        console.error("Error fetching sets:", error);
      });
  }, []);

  function deleteSet(set: string) {
    axios.delete(`${API_URL}/set/${set}`);
    setSetsName((prevSetsName) =>
      prevSetsName.filter((prevSetName) => prevSetName.name !== set)
    );
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.flashcardsText}>Choose set to delete: </h1>
      <ul>
        {setsName.map((setNameObject) => (
          <DeleteSet
            setName={setNameObject.name}
            key={setNameObject.name}
            deleteSet={deleteSet}
          />
        ))}
      </ul>
    </div>
  );
}
