import styles from "../css/DeleteSetPage.module.css";
import { useState } from "react";
import Modal from "@mui/material/Modal";

export default function DeleteSet({
  setName,
  deleteSet,
}: {
  setName: string;
  deleteSet: any;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <li className={styles.deleteSet} onClick={handleOpen}>
      {setName}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        component='div'
        children={
          <div className={styles.modal}>
            <p>Are you sure you want to delete {setName} set?</p>
            <div
              onClick={() => {
                deleteSet(setName);
              }}>
              Yes
            </div>
          </div>
        }
      />
    </li>
  );
}
