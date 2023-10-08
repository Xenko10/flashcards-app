import styles from "./ChooseSetToDelete.module.css";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type Props = {
  setName: string;
  deleteSet: (setName: string) => void;
};

export default function DeleteSet({ setName, deleteSet }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <li className={styles.deleteSet} onClick={() => setOpen(true)}>
        {setName}
      </li>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box className={styles.modal}>
          <div className={styles.paragraphButtonWrapper}>
            <p>
              Are you sure you want to delete set called{" "}
              <span className={styles.underline}>{setName}</span>?
            </p>
            <Button onClick={() => deleteSet(setName)}>Yes</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
