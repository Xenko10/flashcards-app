import styles from "./css/ChoosePageToEdit.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LinkComponent from "./pages_components/LinkComponent";

export default function ChoosePageToEdit() {
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
      <h1>Choose page to edit </h1>
      {sets.map((set: any) => (
        <LinkComponent
          set={set.Tables_in_flashcards}
          key={uuidv4()}
          page='editsetform'
        />
      ))}
    </div>
  );
}
