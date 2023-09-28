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
      <div className={styles.flashcardsText}>Flashcards sets</div>
      {sets.map((set: any) => {
        return <LinkComponent set={set.Tables_in_flashcards} key={uuidv4()} />;
      })}
    </div>
  );
}
