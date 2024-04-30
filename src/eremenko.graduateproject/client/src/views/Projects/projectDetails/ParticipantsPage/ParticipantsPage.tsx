import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import Header from "../../../../components/header/Header";

interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  gender: String
  serviceNumber: number;
  position: Position; 
  employeeStatus: EmployeeStatus;
}

interface Position {
  _id: string;
  title: string;
}

interface EmployeeStatus {
  _id: string;
  title: string;
}

interface ProjectStatus {
  _id: string;
  title: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  statusProjectId: ProjectStatus;
  supervisorId: Employee[];
}

interface EmployeeProject {
  _id: string;
  employeeId: Employee[];
  projectId: Project;
}

interface EmployeeStatusColors {
  [employeeStatus: string]: string;
}

function ParticipantsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<EmployeeProject | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); //Состояние для строки поиска
  const [selectedPosition, setSelectedPosition] = useState<string>(""); // Состояние для выбранной должности

  const statusColors: EmployeeStatusColors = {
    Активный: "#019F3C",
    Неактивный: "#D91528",
  };

  const statusBackground: EmployeeStatusColors = {
    Активный: "#C0E7CE",
    Неактивный: "#F6C5C9",
  };

  useEffect(() => {
    axios
      .get<EmployeeProject>(`http://localhost:3001/employeeProject/${projectId}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке проекта:", error);
      });
  }, [projectId]);

  if (!project) {
    return <p>Загрузка...</p>;
  }

  const handleDeleteEmployee = (employeeId: string) => {
    axios
      .delete(`http://localhost:3001/deleteEmployee/${projectId}/${employeeId}`)
      .then((response) => {
        // Обновляем список сотрудников после удаления
        setProject((prevProject) => {
          if (prevProject) {
            const updatedEmployees = prevProject.projectId.supervisorId.filter(
              (employee) => employee._id !== employeeId
            );
            return { ...prevProject, supervisorId: updatedEmployees };
          }
          return prevProject;
        });
      })
      .catch((error) => {
        console.error("Ошибка при удалении сотрудника:", error);
      });
  };

  //Реализация логики поиска
  const filteredEmployees = project.employeeId.filter((employee) =>
    `${employee.lastName} ${employee.firstName} ${employee.middleName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Фильтрация по выбранной должности
  const filteredByPosition = selectedPosition
    ? filteredEmployees.filter(
        (employee) =>
          employee.position.title.toLowerCase() ===
          selectedPosition.toLowerCase()
      )
    : filteredEmployees;

  return (
    <>
      <Header />
      <div className="container">
        <div className={"container_search_filter"}>
          <div className={"div_input_search"}>
            <input
              type="text"
              className={"input_search"}
              placeholder="Поиск"
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={"div_filter"}>
            <select
              className={"filter"}
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              <option value="">Все</option>
              <option value="Программист">Программист</option>
              <option value="Дизайнер">Дизайнер</option>
            </select>
          </div>
        </div>

        <div className="table_user">
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Пол</th>
                <th>Табельный номер</th>
                <th>Должность</th>
                <th>Статус</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredByPosition.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.lastName}</td>
                  <td>{user.firstName}</td>
                  <td>{user.middleName}</td>
                  <td>{user.gender}</td>
                  <td>{user.serviceNumber}</td>
                  <td>{user.position ? user.position.title : "Нет данных"}</td>
                  <td>
                    <p
                      style={{
                        color: statusColors[user.employeeStatus.title],
                        backgroundColor:
                          statusBackground[user.employeeStatus.title],
                        borderRadius: "6px",
                        width: "100px",
                      }}
                    >
                      {" "}
                      {user.employeeStatus
                        ? user.employeeStatus.title
                        : "Нет данных"}
                    </p>
                  </td>

                  <td className="td-icon">
                    <div
                      className={"icon_delete"}
                      onClick={() => handleDeleteEmployee(user._id)}
                    >
                      <AiOutlineDelete />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ParticipantsPage;
