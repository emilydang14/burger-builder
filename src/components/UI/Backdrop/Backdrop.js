import React from "react";

const Backdrop = (props) => {
  return (
    props.show && (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: "100",
          left: "0",
          top: "0",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={props.backdropClicked}
      >
        {props.children}
      </div>
    )
  );
};

export default Backdrop;
