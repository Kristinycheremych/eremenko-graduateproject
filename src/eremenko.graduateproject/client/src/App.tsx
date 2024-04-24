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
import ProjectStatuses from "./views/settings/projectsSettings/project_statuses/ProjectStatuses";
import Divisions from "./views/settings/employeesSettings/divisions/Divisions";
import EmployeeStatus from "./views/settings/employeesSettings/employee_status/EmployeeStatus";
import Position from "./views/settings/employeesSettings/position/Position";
import AddProjectStatuses from "./views/settings/projectsSettings/project_statuses/addProjectStatuses/AddProjectStatuses";
import UpdateProjectStatuses from "./views/settings/projectsSettings/project_statuses/updateProjectStatuses/UpdateProjectStatuses";
import AddEmployeeStatus from "./views/settings/employeesSettings/employee_status/addEmployeeStatus/AddEmployeeStatus";
import UpdateEmployeeStatus from "./views/settings/employeesSettings/employee_status/updateEmployeeStatus/UpdateEmployeeStatus";
import AddProjectForm from "./views/projects/addProjectForm/AddProjectForm";
import UpdateProject from "./views/projects/updateProjectForm/UpdateProject";
import AddPosition from "./views/settings/employeesSettings/position/addPosition/AddPosition";
import UpdatePosition from "./views/settings/employeesSettings/position/updatePosition/UpdatePosition";
import ProjectDetails from "./views/projects/projectDetails/ProjectDetails";
import ParticipantsPage from "./views/projects/projectDetails/participantsPage/ParticipantsPage";
import StagesPage from "./views/projects/projectDetails/stagesPage/StagesPage";
import StagePage from "./views/settings/projectsSettings/stage/StagePage";
import AddStage from "./views/settings/projectsSettings/stage/addStage/AddStage";
import UpdateStage from "./views/settings/projectsSettings/stage/updateStage/UpdateStage";
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
            {/* Статус проекта */}
            <Route
              path="/projectStatuses"
              element={<ProjectStatuses />}
            ></Route>
            {/* Подразделения */}
            <Route path="/divisions" element={<Divisions />}></Route>
            {/* Должность */}
            <Route path="/position" element={<Position />}></Route>
            <Route
              path="/position/addPosition"
              element={<AddPosition />}
            ></Route>
            <Route
              path="/position/updatePosition/:id"
              element={<UpdatePosition />}
            ></Route>
            {/* Статус проекта */}
            <Route
              path="/projectStatuses/addProjectStatuses"
              element={<AddProjectStatuses />}
            ></Route>
            <Route
              path="/projectStatuses/updateProjectStatuses/:id"
              element={<UpdateProjectStatuses />}
            ></Route>
            {/* Статус сотрудника */}
            <Route path="/employeeStatus" element={<EmployeeStatus />}></Route>
            <Route
              path="/employeeStatus/addEmployeeStatus"
              element={<AddEmployeeStatus />}
            ></Route>
            <Route
              path="/employeeStatus/updateEmployeeStatus/:id"
              element={<UpdateEmployeeStatus />}
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
            {/* Этапы */}
            <Route path="/stagePage" element={<StagePage />}></Route>
            <Route path="/stagePage/addStage" element={<AddStage />}></Route>
            <Route
              path="/stagePage/updateStage/:id"
              element={<UpdateStage />}
            ></Route>
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
