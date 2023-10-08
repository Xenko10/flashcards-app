import axios from "axios";
import { useEffect, useState } from "react";
import LinkComponent from "./pages_components/LinkComponent";
import { v4 as uuidv4 } from "uuid";
import styles from "./css/ChooseFlashcardSet.module.css";

type setNameObject = {
  Tables_in_flashcards: string;
};

export default function ChooseFlashcardSet() {
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

  return (
    <div className={styles.main}>
      <h1 className={styles.flashcardsText}>Flashcards sets</h1>
      <ul>
        {setsName.map((setNameObject: setNameObject) => (
          <LinkComponent
            setName={setNameObject.Tables_in_flashcards}
            key={uuidv4()}
            subpageName='flashcard'
          />
        ))}
      </ul>
    </div>
  );
}
