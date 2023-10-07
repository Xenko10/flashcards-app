import { Link } from "react-router-dom";
import styles from "./css/Home.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <h1 className={styles.homeText}>What you wanna do?</h1>
      <div className={styles.links}>
        <Link to='/createsetform'>Create set</Link>
        <Link to='/flashcards'>Use flashcards</Link>
        <Link to='/choosepagetoedit'>Edit set</Link>
        <Link to='/choosesettodelete'>Delete set</Link>
      </div>
    </div>
  );
}
