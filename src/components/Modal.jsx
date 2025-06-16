import React, { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

function Modal({ children, ref, btnCap }) {
  const modelRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        modelRef.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={modelRef}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{btnCap}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default Modal;
