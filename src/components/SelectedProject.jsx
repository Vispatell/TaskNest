import React, { useRef } from "react";
import Task from "./Task";
import Modal from "./Modal";
import DeleteConfirmation from "./DeleteConfirmation";

function SelectedProject({
  project,
  deleteProject,
  handleAddTask,
  handleDeleteTask,
  handleCompleteTask,
  tasks,
}) {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const deleteModalRef = useRef();

  function hanleDeleteModal() {
    deleteModalRef.current.open();
  }

  function handleConfirmDeleteModal() {
    deleteProject(project.id);
    deleteModalRef.current.close();
  }

  function handleCloseModal() {
    deleteModalRef.current.close();
  }

  return (
    <>
      <Modal
        ref={deleteModalRef}
        onConfirm={handleConfirmDeleteModal}
        onCancel={handleCloseModal}
      >
        <DeleteConfirmation />
      </Modal>
      <div className="w-[35rem] mt-16">
        <header className="pb-4 mb-4 border-b-2 border-stone-300">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-stone-600 mb-2">
              {project.title}
            </h1>
            <button
              onClick={hanleDeleteModal}
              className="text-stone-600 hover:text-red-500"
            >
              Delete
            </button>
          </div>
          <p className="mb-4 text-stone-400">{formattedDate}</p>
          <p className="text-stone-600 whitespace-pre-wrap">
            {project.description}
          </p>
        </header>
        <Task
          handleAddTask={handleAddTask}
          handleDeleteTask={handleDeleteTask}
          handleCompleteTask={handleCompleteTask}
          tasks={tasks}
          project={project}
        />
      </div>
    </>
  );
}

export default SelectedProject;
