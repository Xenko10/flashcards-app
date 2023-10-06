import { Link } from "react-router-dom";
import styles from "./css/Home.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <h1 className={styles.mainH1}>Select type of the event</h1>
      <div className={styles.links}>
        <Link to='/createsetform' className={styles.mainGotoHome}>
          Create set
        </Link>
        <Link to='/flashcards' className={styles.mainGotoHome}>
          Use flashcards
        </Link>
        <Link to='/choosepagetoedit' className={styles.mainGotoHome}>
          Edit set
        </Link>
        <Link to='/choosesettodelete' className={styles.mainGotoHome}>
          Delete set
        </Link>
      </div>
    </div>
  );
}
