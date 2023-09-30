import styles from "../css/DeleteSetPage.module.css";

export default function DeleteSet({
  set,
  deleteSet,
}: {
  set: string;
  deleteSet: any;
}) {
  return (
    <div
      onClick={() => {
        deleteSet(set);
      }}
      className={styles.deleteSet}>
      {set}
    </div>
  );
}
