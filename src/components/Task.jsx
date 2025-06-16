import React from "react";
import NewTask from "./NewTask";

function Task({
  tasks,
  handleAddTask,
  handleDeleteTask,
  handleCompleteTask,
  project,
}) {
  const ProjectTasks = tasks.filter((task) => task.projectId === project.id);

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Task</h2>
      <NewTask handleAddTask={handleAddTask} />
      {ProjectTasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {ProjectTasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md max-h-80 overflow-y-auto custom-scrollbar ">
          {ProjectTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between my-4 bg-stone-200/35 p-4"
            >
              <span
                className={
                  task.completed ? "line-through text-stone-500" : undefined
                }
              >
                {task.text}
              </span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => handleCompleteTask(task.id)}
                  className="text-stone-700 hover:text-green-500"
                >
                  Done
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-stone-700 hover:text-red-500"
                >
                  Clear
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Task;
