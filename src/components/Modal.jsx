import React, { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

function Modal({ children, ref, onConfirm, onCancel, btnCap = "No" }) {
  const modelRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        modelRef.current.showModal();
      },
      close() {
        modelRef.current.close();
      },
    };
  });

  return createPortal(
    <dialog
      ref={modelRef}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right space-x-2">
        {onCancel && (
          <Button type="button" onClick={onCancel}>
            {btnCap}
          </Button>
        )}
        {onConfirm && (
          <Button type="button" onClick={onConfirm}>
            Yes
          </Button>
        )}
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
}

export default Modal;
