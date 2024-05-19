import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeesPage from "./views/employees/EmployeesPage";
import ProjectsPage from "./views/projects/ProjectsPage";
import ParticipantsPage from "./views/projects/projectDetails/participantsPage/ParticipantsPage";
import StagesPage from "./views/projects/projectDetails/stagesPage/StagesPage";
import StageDetailsProject from "./views/projects/projectDetails/stagesPage/stageProjectDetails/StageDetailsProject";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Авторизация */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Сотрудники */}
          <Route path="/employeesPage" element={<EmployeesPage />}></Route>
          {/* Проекты */}
          <Route path="/projectsPage" element={<ProjectsPage />}></Route>
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
      </BrowserRouter>
    </>
  );
}

export default App;
