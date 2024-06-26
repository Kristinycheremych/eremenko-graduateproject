import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { menuItems } from "../../../../components/sidebar/DataSidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../../../components/header/Header";
import { MdArrowBackIos } from "react-icons/md";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { EmployeeProject } from "../../ProjectInterfaces";

const URL = process.env.REACT_APP_URL;

function ParticipantsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<EmployeeProject | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<EmployeeProject>(`${URL}/employeeProject/${projectId}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке проекта:", error);
      });
  }, [projectId]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(".HiEllipsisHorizontal"))
        setOpenPopoverId(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const togglePopover = (id: string) => {
    setOpenPopoverId(openPopoverId === id ? null : id);
  };

  if (!project) {
    return <p>Загрузка...</p>;
  }

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
          employee.positionId.title.toLowerCase() ===
          selectedPosition.toLowerCase()
      )
    : filteredEmployees;

  return (
    <>
      <Sidebar items={menuItems}>
        <div className="header">
          <div className="divArrowBackIos">
            <MdArrowBackIos className="MdArrowBackIos" />
          </div>
          <p>Участники проекта - {project.projectId.title}</p>
        </div>
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
                    <td>{user.serviceNumber}</td>
                    <td>
                      {user.positionId ? user.positionId.title : "Нет данных"}
                    </td>
                    <td>
                      {user.employeeStatusId
                        ? user.employeeStatusId.title
                        : "Нет данных"}
                    </td>

                    <td>
                      <HiEllipsisHorizontal
                        className="HiEllipsisHorizontal"
                        onClick={() => togglePopover(user._id)}
                      />
                      {openPopoverId === user._id && (
                        <div className="popover-content">
                          <div className="div-popover-content">
                            <div className="div_delete">
                              <p>Удалить</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Sidebar>
    </>
  );
}

export default ParticipantsPage;
