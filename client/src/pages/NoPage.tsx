import { Link } from "react-router-dom";
import styles from "./css/NoPage.module.css";

export default function NoPage() {
  return (
    <div className={styles.main}>
      <p className={styles.mainParagraph}>
        We can't seem to find the page you're looking for.
      </p>
      <Link to='/' className={styles.mainGoToHome}>
        Go to homepage
      </Link>
    </div>
  );
}
