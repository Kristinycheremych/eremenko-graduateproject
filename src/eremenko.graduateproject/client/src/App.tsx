import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeesPage from "./views/employees/EmployeesPage";
import ProjectsPage from "./views/projects/ProjectsPage";
import MainPage from "./views/main/MainPage";
import Sidebar from "./components/sidebar/Sidebar";
import UpdateEmployees from "./components/employees/updateEmployees/UpdateEmployees";
import { menuItems } from "./components/sidebar/DataSidebar";
import ProjectDetails from "./views/projects/projectDetails/ProjectDetails";
import ParticipantsPage from "./views/projects/projectDetails/participantsPage/ParticipantsPage";
import StagesPage from "./views/projects/projectDetails/stagesPage/StagesPage";
import StageDetailsProject from "./views/projects/projectDetails/stagesPage/stageProjectDetails/StageDetailsProject";
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
              path="/employeesPage/updateEmployees/:id"
              element={<UpdateEmployees />}
            ></Route>
            {/* Проекты */}
            <Route path="/projectsPage" element={<ProjectsPage />}></Route>
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
            {/* Этапы проекта*/}
            <Route
              path="/projectsPage/stageDetails/:projectId/:stageId/stages"
              element={<StagesPage />}
            ></Route>
            {/* Подробнее об этапе проекта */}
            <Route
              path="/projectsPage/stageDetails/:projectId/:stageId/stages/:stageProjectId"
              element={<StageDetailsProject />}
            />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
