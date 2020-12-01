import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import BackDrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const Modal = (props) => {
  const { closeModal } = props;
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        closeModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close); //important, to remove the event listener when the components is unmounted
  }, [closeModal]);

  useEffect(() => {}, [props.show]);

  return (
    <Aux>
      <BackDrop show={props.show} backdropClicked={props.closeModal} />
      <div
        className={styles.Modal}
        style={{
          zIndex: props.show ? "500" : "-500",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;
