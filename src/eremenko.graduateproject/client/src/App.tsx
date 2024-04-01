import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeesPage from './views/Employees/EmployeesPage';
import ProjectsPage from './views/Projects/ProjectsPage';
import MainPage from './views/Main/MainPage';
import Sidebar from './components/sidebar/Sidebar';
import CreateEmployees from './views/Employees/createEmployees/CreateEmployees';
import UpdateEmployees from './views/Employees/updateEmployees/UpdateEmployees';
import "./App.css";
import {menuItems} from './components/sidebar/DataSidebar';
import ProjectStatuses from './views/Settings/projectsSettings/project_statuses/ProjectStatuses';
import TaskStatuses from './views/Settings/projectsSettings/task_statuses/TaskStatuses';
import Divisions from './views/Settings/employeesSettings/divisions/Divisions';
import EmployeeStatus from './views/Settings/employeesSettings/employee_status/EmployeeStatus';
import Position from './views/Settings/employeesSettings/position/Position';
import AddProjectStatuses from './views/Settings/projectsSettings/project_statuses/AddProjectStatuses/AddProjectStatuses';
import UpdateProjectStatuses from './views/Settings/projectsSettings/project_statuses/updateProjectStatuses/UpdateProjectStatuses';
import AddTaskStatuses from './views/Settings/projectsSettings/task_statuses/addTaskStatuses/AddTaskStatuses';
import UpdateTaskStatuses from './views/Settings/projectsSettings/task_statuses/updateTaskStatuses/UpdateTaskStatuses';
import AddEmployeeStatus from './views/Settings/employeesSettings/employee_status/addEmployeeStatus/AddEmployeeStatus';
import UpdateEmployeeStatus from './views/Settings/employeesSettings/employee_status/updateEmployeeStatus/UpdateEmployeeStatus';
import AddProjectForm from './views/Projects/addProjectForm/AddProjectForm';
import UpdateProject from './views/Projects/updateProjectForm/UpdateProject';
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
            <Route path='/projectStatuses' element={<ProjectStatuses/>}></Route>
            <Route path='/divisions' element={<Divisions/>}></Route>
            <Route path='/position' element={<Position/>}></Route>
            <Route path='/projectStatuses/addProjectStatuses' element={<AddProjectStatuses />}></Route>
            <Route path='/projectStatuses/updateProjectStatuses/:id' element={<UpdateProjectStatuses />}></Route>
            <Route path='/taskStatuses/updateTaskStatuses/:id' element={<UpdateTaskStatuses />}></Route>
            <Route path='/taskStatuses' element={<TaskStatuses/>}></Route>
            <Route path='/taskStatuses/addTaskStatuses' element={<AddTaskStatuses />}></Route>
            <Route path='/employeeStatus' element={<EmployeeStatus />}></Route>
            <Route path='/employeeStatus/addEmployeeStatus' element={<AddEmployeeStatus />}></Route>
            <Route path='/employeeStatus/updateEmployeeStatus/:id' element={<UpdateEmployeeStatus />}></Route>
            <Route path='/projectsPage/addProjectForm' element={<AddProjectForm />}></Route>
            <Route path='/projectsPage/updateProject/:id' element={<UpdateProject />}></Route>
          </Routes>
          </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;