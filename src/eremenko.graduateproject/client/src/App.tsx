import React from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeesPage from './views/employees/EmployeesPage';
import ProjectsPage from './views/projects/ProjectsPage';
import MainPage from './views/main/MainPage';
import Sidebar from './components/sidebar/Sidebar';
import CreateEmployees from './views/employees/createEmployees/CreateEmployees';
import UpdateEmployees from './views/employees/updateEmployees/UpdateEmployees';
import { menuItems } from './components/sidebar/DataSidebar';
import ProjectStatuses from './views/settings/projectsSettings/project_statuses/ProjectStatuses';
import TaskStatuses from './views/settings/projectsSettings/task_statuses/TaskStatuses';
import Divisions from './views/settings/employeesSettings/divisions/Divisions';
import EmployeeStatus from './views/settings/employeesSettings/employee_status/EmployeeStatus';
import Position from './views/settings/employeesSettings/position/Position';
import AddProjectStatuses from './views/settings/projectsSettings/project_statuses/addProjectStatuses/AddProjectStatuses';
import UpdateProjectStatuses from './views/settings/projectsSettings/project_statuses/updateProjectStatuses/UpdateProjectStatuses';
import AddTaskStatuses from './views/settings/projectsSettings/task_statuses/addTaskStatuses/AddTaskStatuses';
import UpdateTaskStatuses from './views/settings/projectsSettings/task_statuses/updateTaskStatuses/UpdateTaskStatuses';
import AddEmployeeStatus from './views/settings/employeesSettings/employee_status/addEmployeeStatus/AddEmployeeStatus';
import UpdateEmployeeStatus from './views/settings/employeesSettings/employee_status/updateEmployeeStatus/UpdateEmployeeStatus';
import AddProjectForm from './views/projects/addProjectForm/AddProjectForm';
import UpdateProject from './views/projects/updateProjectForm/UpdateProject';
import AddPosition from './views/settings/employeesSettings/position/addPosition/AddPosition';
import UpdatePosition from './views/settings/employeesSettings/position/updatePosition/UpdatePosition';
import ProjectDetails from './views/projects/projectDetails/ProjectDetails';
import ParticipantsPage from './views/projects/projectDetails/participantsPage/ParticipantsPage';
import StagesPage from './views/projects/projectDetails/stagesPage/StagesPage';
import TaskPage from './views/projects/projectDetails/tasksPage/TaskPage';
import DesignPage from './views/projects/projectDetails/boards/design/DesignPage';
import IntegrationPage from './views/projects/projectDetails/boards/integration/IntegrationPage';
import SoftwareProductDevelopment from './views/projects/projectDetails/boards/softwareProductDevelopment/SoftwareProductDevelopment';
import TechnicalSpecification from './views/projects/projectDetails/boards/technicalSpecification/TechnicalSpecification';
import AddStagePage from './views/projects/projectDetails/boards/design/addStagePage/AddStagePage';
import AddTaskPage from './views/projects/projectDetails/boards/design/addTaskPage/AddTaskPage';
import AddIntegrationStage from './views/projects/projectDetails/boards/integration/addIntegrationStage/AddIntegrationStage';
import AddTaskIntegrationStage from './views/projects/projectDetails/boards/integration/addTaskIntegrationStage/AddTaskIntegrationStage';
import AddSPDStage from './views/projects/projectDetails/boards/softwareProductDevelopment/addSPDStage/AddSPDStage';
import AddTaskSPDStage from './views/projects/projectDetails/boards/softwareProductDevelopment/addTaskSPDStage/AddTaskSPDStage';
import AddTechnicalSpecificationStage from './views/projects/projectDetails/boards/technicalSpecification/addTechnicalSpecificationStage/AddTechnicalSpecificationStage';
import AddTaskTechnicalSpecificationStage from './views/projects/projectDetails/boards/technicalSpecification/addTaskTechnicalSpecificationStage/AddTaskTechnicalSpecificationStage';
import StagePage from './views/settings/projectsSettings/stage/StagePage';
import AddStage from './views/settings/projectsSettings/stage/addStage/AddStage';
import UpdateStage from './views/settings/projectsSettings/stage/updateStage/UpdateStage';
import AddStageProject from './views/projects/projectDetails/stagesPage/addStageProject/AddStageProject';
import UpdateStageProject from './views/projects/projectDetails/stagesPage/updateStageProject/UpdateStageProject';
function App() {

  return (
    <>
      <BrowserRouter>
        <Sidebar items={menuItems}>
          <Routes >
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/employeesPage' element={<EmployeesPage />}></Route>
            <Route path='/projectsPage' element={<ProjectsPage />}></Route>
            <Route path='/createEmployees' element={<CreateEmployees />}></Route>
            <Route path='/updateEmployees/:id' element={<UpdateEmployees />}></Route>
            <Route path='/projectStatuses' element={<ProjectStatuses />}></Route>
            <Route path='/divisions' element={<Divisions />}></Route>
            <Route path='/position' element={<Position />}></Route>
            <Route path='/projectStatuses/addProjectStatuses' element={<AddProjectStatuses />}></Route>
            <Route path='/projectStatuses/updateProjectStatuses/:id' element={<UpdateProjectStatuses />}></Route>
            <Route path='/taskStatuses/updateTaskStatuses/:id' element={<UpdateTaskStatuses />}></Route>
            <Route path='/taskStatuses' element={<TaskStatuses />}></Route>
            <Route path='/taskStatuses/addTaskStatuses' element={<AddTaskStatuses />}></Route>
            <Route path='/employeeStatus' element={<EmployeeStatus />}></Route>
            <Route path='/employeeStatus/addEmployeeStatus' element={<AddEmployeeStatus />}></Route>
            <Route path='/employeeStatus/updateEmployeeStatus/:id' element={<UpdateEmployeeStatus />}></Route>
            <Route path='/projectsPage/addProjectForm' element={<AddProjectForm />}></Route>
            <Route path='/projectsPage/updateProject/:id' element={<UpdateProject />}></Route>
            <Route path='/position' element={<Position />}></Route>
            <Route path='/position/addPosition' element={<AddPosition />}></Route>
            <Route path='/position/updatePosition/:id' element={<UpdatePosition />}></Route>
            <Route path='/projectsPage/projectDetails/:projectId' element={<ProjectDetails />}></Route>
            <Route path="/projectsPage/projectDetails/:projectId/participants" element={<ParticipantsPage />}></Route>
            <Route path="/projectsPage/projectDetails/:projectId/tasks" element={<TaskPage />}></Route>
            <Route path="/projectsPage/projectDetails/:projectId/boards/design" element={<DesignPage />}></Route>
            <Route path="/projectsPage/projectDetails/:projectId/boards/integration" element={<IntegrationPage />}></Route>
            <Route path="/projectsPage/projectDetails/:projectId/boards/softwareProductDevelopment" element={<SoftwareProductDevelopment />}></Route>
            <Route path="/projectsPage/projectDetails/:projectId/boards/technicalSpecification" element={<TechnicalSpecification />}></Route>
            <Route path='projectsPage/projectDetails/:projectId/addStagePage' element={<AddStagePage />}></Route>
            <Route path='projectsPage/projectDetails/:projectId/addTaskPage/:stageId' element={<AddTaskPage />}></Route>
            <Route path='projectsPage/projectDetails/:projectId/addIntegrationPage' element={<AddIntegrationStage />}></Route>
            <Route path='projectsPage/projectDetails/:projectId/addTaskIntegrationPage/:stageId' element={<AddTaskIntegrationStage />}></Route>
            <Route path='projectsPage/projectDetails/:projectId/addSPDPage' element={<AddSPDStage />}></Route>
            <Route path='projectsPage/projectDetails/:projectId/addTaskSPDPage/:stageId' element={<AddTaskSPDStage />}></Route>
            <Route path='projectsPage/projectDetails/:projectId/technicalSpecificationStage' element={<AddTechnicalSpecificationStage />}></Route>
            <Route path='projectsPage/projectDetails/:projectId/addTaskTechnicalSpecificationPage/:stageId' element={<AddTaskTechnicalSpecificationStage />}></Route>
            {/* Этапы */}
            <Route path='/stagePage' element={<StagePage/>}></Route>
            <Route path='/stagePage/addStage' element={<AddStage/>}></Route>
            <Route path='/stagePage/updateStage/:id' element={<UpdateStage/>}></Route>
            {/* Этапы проекта*/}
            <Route path="/projectsPage/projectDetails/:projectId/stages" element={<StagesPage />}></Route>
            <Route path='/projectsPage/projects/:projectId/addStageProject' element={<AddStageProject/>}></Route>
            <Route path='/projectsPage/projects/:projectId/addStageProject/:id' element={<UpdateStageProject/>}></Route>
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;