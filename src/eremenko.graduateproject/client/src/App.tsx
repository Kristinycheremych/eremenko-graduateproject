import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeesPage from './views/Employees/EmployeesPage';
import ProjectsPage from './views/Projects/ProjectsPage';
import SettingsPage from './views/Settings/SettingsPage';
import MainPage from './views/Main/MainPage';
import Sidebar from './components/sidebar/Sidebar';
import CreateEmployees from './views/Employees/createEmployees/CreateEmployees';
import UpdateEmployees from './views/Employees/updateEmployees/UpdateEmployees';

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/employeesPage' element={<EmployeesPage />}></Route>
            <Route path='/projectsPage' element={<ProjectsPage />}></Route>
            <Route path='/settingsPage' element={<SettingsPage />}></Route>
            <Route path='/createEmployees' element={<CreateEmployees />}></Route>
            <Route path='/updateEmployees/:id' element={<UpdateEmployees />}></Route>
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
