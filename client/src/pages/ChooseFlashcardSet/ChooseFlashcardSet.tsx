import axios from "axios";
import { useEffect, useState } from "react";
import LinkComponent from "../../components/LinkComponent";
import styles from "./ChooseFlashcardSet.module.css";
import { API_URL } from "../../constant";

type SetsDto = {
  name: string;
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
        {setsName.map((setName) => (
          <LinkComponent
            setName={setName.name}
            key={setName.name}
            subpageName='flashcard'
          />
        ))}
      </ul>
    </div>
  );
}
