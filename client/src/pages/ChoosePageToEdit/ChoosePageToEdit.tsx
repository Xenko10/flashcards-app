import styles from "./ChoosePageToEdit.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import LinkComponent from "../../components/LinkComponent";
import { API_URL } from "../../constant";

type SetsDto = {
  Tables_in_flashcards: string;
}[];

export default function ChoosePageToEdit() {
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
  return (
    <div className={styles.main}>
      <h1 className={styles.pageToEditText}>Choose page to edit </h1>
      <ul>
        {setsName.map((setNameObject) => (
          <LinkComponent
            setName={setNameObject.Tables_in_flashcards}
            key={setNameObject.Tables_in_flashcards}
            subpageName='edit-set-form'
          />
        ))}
      </ul>
    </div>
  );
}
