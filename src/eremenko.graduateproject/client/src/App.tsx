import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeesPage from './views/Employees/EmployeesPage';
import ProjectsPage from './views/Projects/ProjectsPage';
import SettingsPage from './views/Settings/SettingsPage';
import MainPage from './views/Main/MainPage';
import Sidebar from './components/sidebar/Sidebar';
import CreateEmployees from './views/Employees/createEmployees/CreateEmployees';
import UpdateEmployees from './views/Employees/updateEmployees/UpdateEmployees';
import "./App.css";
import TaskStatuses from './views/Settings/projects/task_statuses/TaskStatuses';
import ProjectStatuses from './views/Settings/projects/project_statuses/ProjectStatuses';
import {menuItems} from './components/sidebar/DataSidebar';
function App() {

  return (
    <>
      <BrowserRouter>
        <Sidebar items={menuItems}>
          <Routes >
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/employeesPage' element={<EmployeesPage />}></Route>
            <Route path='/projectsPage' element={<ProjectsPage />}></Route>
            <Route path='/settingsPage' element={<SettingsPage />}></Route>
            <Route path='/createEmployees' element={<CreateEmployees />}></Route>
            <Route path='/updateEmployees/:id' element={<UpdateEmployees />}></Route>
            <Route path='/projectStatuses' element={<ProjectStatuses/>}></Route>
            <Route path='/taskStatuses' element={<TaskStatuses/>}></Route>
          </Routes>
          </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;