import { Link } from "react-router-dom";
import styles from "./NoPage.module.css";

export default function NoPage() {
  return (
    <div className={styles.main}>
      <h1 className={styles.mainH1}>
        We can't seem to find the page you are looking for.
      </h1>
      <Link to='/' className={styles.mainGoToHome}>
        Go to homepage
      </Link>
    </div>
  );
}
