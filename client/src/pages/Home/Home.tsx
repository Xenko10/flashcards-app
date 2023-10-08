import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <h1 className={styles.homeText}>What you wanna do?</h1>
      <div className={styles.links}>
        <Link to='/create-set-form'>Create set</Link>
        <Link to='/flashcards'>Use flashcards</Link>
        <Link to='/choose-page-to-edit'>Edit set</Link>
        <Link to='/choose-set-to-delete'>Delete set</Link>
      </div>
    </div>
  );
}
