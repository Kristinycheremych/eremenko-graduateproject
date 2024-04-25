import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeesPage from "./views/employees/EmployeesPage";
import ProjectsPage from "./views/projects/ProjectsPage";
import MainPage from "./views/main/MainPage";
import Sidebar from "./components/sidebar/Sidebar";
import CreateEmployees from "./views/employees/createEmployees/CreateEmployees";
import UpdateEmployees from "./views/employees/updateEmployees/UpdateEmployees";
import { menuItems } from "./components/sidebar/DataSidebar";
import AddProjectForm from "./views/projects/addProjectForm/AddProjectForm";
import UpdateProject from "./views/projects/updateProjectForm/UpdateProject";
import ProjectDetails from "./views/projects/projectDetails/ProjectDetails";
import ParticipantsPage from "./views/projects/projectDetails/participantsPage/ParticipantsPage";
import StagesPage from "./views/projects/projectDetails/stagesPage/StagesPage";
import AddStageProject from "./views/projects/projectDetails/stagesPage/addStageProject/AddStageProject";
import UpdateStageProject from "./views/projects/projectDetails/stagesPage/updateStageProject/UpdateStageProject";
import StageDetailsProject from "./views/projects/projectDetails/stagesPage/stageProjectDetails/StageDetailsProject";
import AddTaskStatusPage from "./views/projects/projectDetails/stagesPage/stageProjectDetails/addTaskStatus/AddTaskStatusPage";
import AddTask from "./views/projects/projectDetails/stagesPage/stageProjectDetails/addTask/AddTask";
function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar items={menuItems}>
          <Routes>
            {/* Главная */}
            <Route path="/" element={<MainPage />}></Route>
            {/* Сотрудники */}
            <Route path="/employeesPage" element={<EmployeesPage />}></Route>
            <Route
              path="/createEmployees"
              element={<CreateEmployees />}
            ></Route>
            <Route
              path="/updateEmployees/:id"
              element={<UpdateEmployees />}
            ></Route>
            {/* Проекты */}
            <Route path="/projectsPage" element={<ProjectsPage />}></Route>
            <Route
              path="/projectsPage/addProjectForm"
              element={<AddProjectForm />}
            ></Route>
            <Route
              path="/projectsPage/updateProject/:id"
              element={<UpdateProject />}
            ></Route>
            {/* Подробнее о проекте */}
            <Route
              path="/projectsPage/projectDetails/:projectId"
              element={<ProjectDetails />}
            ></Route>
            {/* Участники проекта */}
            <Route
              path="/projectsPage/projectDetails/:projectId/participants"
              element={<ParticipantsPage />}
            ></Route>
            {/* Задачи */}
            <Route
              path="/projectsPage/projects/:projectId/stageDetails/:stageId/addTask"
              element={<AddTask />}
            />
            {/* Этапы проекта*/}
            <Route
              path="/projectsPage/projectDetails/:projectId/stages"
              element={<StagesPage />}
            ></Route>
            <Route
              path="/projectsPage/projects/:projectId/addStageProject"
              element={<AddStageProject />}
            ></Route>
            <Route
              path="/projectsPage/projects/:projectId/addStageProject/:id"
              element={<UpdateStageProject />}
            ></Route>
            {/* Подробнее об этапе проекта */}
            <Route
              path="/projectsPage/projectDetails/:projectId/stages/stageDetails/:stageId"
              element={<StageDetailsProject />}
            />
            {/* Статус задачи */}
            <Route
              path="/projectsPage/projects/:projectId/stageDetails/:stageId/addTaskStatus"
              element={<AddTaskStatusPage />}
            />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
