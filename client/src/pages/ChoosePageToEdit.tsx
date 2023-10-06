import styles from "./css/ChoosePageToEdit.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LinkComponent from "./pages_components/Link";

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
      <h1 className={styles.pageToEditText}>Choose page to edit </h1>
      <ul>
        {sets.map((set: any) => (
          <LinkComponent
            set={set.Tables_in_flashcards}
            key={uuidv4()}
            page='editsetform'
          />
        ))}
      </ul>
    </div>
  );
}
