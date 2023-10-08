import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <p className={styles.footer}>
      © {new Date().getFullYear()} created by{" "}
      <a href='https://github.com/Xenko10'>Jakub Kołaczyński</a>
    </p>
  );
}
