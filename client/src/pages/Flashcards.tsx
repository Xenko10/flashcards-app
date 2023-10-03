import axios from "axios";
import { useEffect, useState } from "react";
import LinkComponent from "./pages_components/LinkComponent";
import { v4 as uuidv4 } from "uuid";
import styles from "./css/Flashcards.module.css";

export default function Flashcards() {
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

  return (
    <div className={styles.main}>
      <h1 className={styles.flashcardsText}>Flashcards sets</h1>
      <ul>
        {sets.map((set: any) => (
          <LinkComponent
            set={set.Tables_in_flashcards}
            key={uuidv4()}
            page='flashcard'
          />
        ))}
      </ul>
    </div>
  );
}
