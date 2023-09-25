import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <p className={styles.footer}>Copyright © {new Date().getFullYear()}</p>
  );
}
