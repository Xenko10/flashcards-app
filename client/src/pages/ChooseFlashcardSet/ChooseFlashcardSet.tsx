import axios from "axios";
import { useEffect, useState } from "react";
import LinkComponent from "../../components/LinkComponent";
import styles from "./ChooseFlashcardSet.module.css";
import { API_URL } from "../../constant";

type SetsDto = {
  Tables_in_flashcards: string;
}[];

export default function ChooseFlashcardSet() {
  const [setsName, setSetsName] = useState<SetsDto>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/sets`)
      .then((res: any) => {
        setSetsName(res.data);
      })
      .catch((error) => {
        console.error("Error fetching sets:", error);
      });
  }, []);

  return (
    <div className={styles.main}>
      <h1 className={styles.flashcardsText}>Flashcards sets</h1>
      <ul>
        {setsName.map((setNameObject) => (
          <LinkComponent
            setName={setNameObject.Tables_in_flashcards}
            key={setNameObject.Tables_in_flashcards}
            subpageName='flashcard'
          />
        ))}
      </ul>
    </div>
  );
}
