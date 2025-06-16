import React, { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

function NewProject({ handleClose, handleAddProject }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const modal = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    }

    handleAddProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });

    title.current.value = "";
    description.current.value = "";
    dueDate.current.value = "";
  }

  return (
    <>
      <Modal ref={modal} btnCap="Okay">
        <h2 className="text-xl font-bold text-stone-700  my-4">Invalid Input</h2>
        <p className="text-stone-600  mb-4">Oops... looks like you forgot to enter a vlaue.</p>
        <p className="text-stone-600 mb-4">Provide a valid value for every input field.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={handleClose}
              className="text-stone-700 hover:text-stone-900"
            >
              Cancle
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="bg-slate-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" label="Title" ref={title} />
          <Input label="Description" isTextarea={true} ref={description} />
          <Input type="date" label="Due Date" ref={dueDate} />
        </div>
      </div>
    </>
  );
}

export default NewProject;
