import { Link } from "react-router-dom";
import styles from "./css/Home.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <p className={styles.mainParagraph}>Select type of the event</p>
      <div className={styles.links}>
        <Link to='/createsetform' className={styles.mainGotoHome}>
          Create set
        </Link>
        <Link to='/editsetform' className={styles.mainGotoHome}>
          Edit set
        </Link>
        <Link to='/flashcards' className={styles.mainGotoHome}>
          Use flashcards
        </Link>
        <Link to='/takethetest' className={styles.mainGotoHome}>
          Complete the test
        </Link>
      </div>
    </div>
  );
}
