import { useEffect, useState } from "react";
import NewProject from "./components/NewProject";
import ProjectSidebar from "./components/ProjectSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
const [projectState, setProjectState] = useState(() => {
  const saved = localStorage.getItem("projectState");
  return saved
    ? JSON.parse(saved)
    : {
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
      };
});


  useEffect(() => {
    localStorage.setItem("projectState", JSON.stringify(projectState));
  }, [projectState]);

  function handleAddTask(taskText) {
    setProjectState((prev) => {
      const newTask = {
        text: taskText,
        completed: false,
        projectId: prev.selectedProjectId,
        id: Math.random(),
      };
      return {
        ...prev,
        tasks: [...prev.tasks, newTask],
      };
    });
  }
  function handleDeleteTask(id) {
    const filteredTask = projectState.tasks.filter((task) => task.id !== id);

    setProjectState((prev) => {
      return {
        ...prev,
        tasks: [...filteredTask],
      };
    });
  }

  function handleCompleteTask(id) {
    setProjectState((prev) => {
      const updatedTasks = prev.tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      );

      return {
        ...prev,
        tasks: updatedTasks,
      };
    });
  }

  function handleSelectedProject(id) {
    setProjectState((prev) => {
      return {
        ...prev,
        selectedProjectId: id,
      };
    });
  }

  function handleStart() {
    setProjectState((prev) => {
      return {
        ...prev,
        selectedProjectId: null,
      };
    });
  }
  function handleClose() {
    setProjectState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prev) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject],
      };
    });
  }

  const selectedPro = projectState.projects.find(
    (project) => project.id === projectState.selectedProjectId
  );

  function deleteProject(id) {
    const filteredProject = projectState.projects.filter(
      (project) => project.id !== id
    );

    setProjectState((prev) => {
      return {
        ...prev,
        projects: [...filteredProject],
        selectedProjectId:
          prev.selectedProjectId === id ? undefined : prev.selectedProjectId,
      };
    });
  }

  let content = (
    <SelectedProject
      project={selectedPro}
      deleteProject={deleteProject}
      handleAddTask={handleAddTask}
      handleDeleteTask={handleDeleteTask}
      handleCompleteTask={handleCompleteTask}
      tasks={projectState.tasks}
    />
  );

  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        handleAddProject={handleAddProject}
        handleClose={handleClose}
      />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected handleStart={handleStart} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        handleStart={handleStart}
        projects={projectState.projects}
        handleSelectedProject={handleSelectedProject}
      />
      {content}
    </main>
  );
}

export default App;
