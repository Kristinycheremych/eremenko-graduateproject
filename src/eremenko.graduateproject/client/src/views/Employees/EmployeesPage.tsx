import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { menuItems } from "../../components/sidebar/DataSidebar";
import axios from "axios";
import { MdArrowBackIos } from "react-icons/md";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import "./employees.css";
import { Employee } from "./UserInterfaces";
import CreateEmployees from "../../components/employees/createEmployees/CreateEmployees";
import UpdateEmployees from "../../components/employees/updateEmployees/UpdateEmployees";

const URL = process.env.REACT_APP_URL;

function EmployeesPage() {
  const [data, setData] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${URL}/get/employees`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filterEmployees = () => {
      let filteredData = data;
      if (filter !== "") {
        filteredData = filteredData.filter(
          (user) => user.positionId && user.positionId.title === filter
        );
      }
      if (searchQuery !== "") {
        filteredData = filteredData.filter((user) => {
          const fullName = `${user.lastName} ${user.firstName} ${user.middleName}`;
          return fullName.toLowerCase().includes(searchQuery.toLowerCase());
        });
      }
      setFilteredEmployees(filteredData);
    };
    filterEmployees();
  }, [data, filter, searchQuery]);

  const handleDelete = (id: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить этого сотрудника?`)) {
      axios
        .delete(`${URL}/delete/employees/${id}`)
        .then((res) => {
          console.log(res);
          // Обновляем данные после удаления сотрудника
          setData(data.filter((user) => user._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  const togglePopover = (id: string) => {
    setOpenPopoverId(openPopoverId === id ? null : id);
  };

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

  const handleAddEmployee = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleEdit = (id: string) => {
    setSelectedEmployeeId(id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  return (
    <>
      <Sidebar items={menuItems}>
        <div className="header">
          <div className="divArrowBackIos">
            <MdArrowBackIos className="MdArrowBackIos" />
          </div>
          <p>Сотрудники</p>
        </div>
        <div className={"container"}>
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
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={"filter"}
              >
                <option value="">Все</option>
                <option value="Программист">Программист</option>
                <option value="Дизайнер">Дизайнер</option>
              </select>
            </div>

            <div className={"containet_btn_add"}>
              {/* Добавляем обработчик нажатия на кнопку "Добавить" */}
              <button className={"btn_add"} onClick={handleAddEmployee}>
                Добавить
              </button>
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
                  <th>Подразделения</th>
                  <th>Статус</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((user, index) => (
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
                      {user.divisionsId ? user.divisionsId.title : "Нет данных"}
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
                            <div
                              onClick={() => handleDelete(user._id)}
                              className="div_delete"
                            >
                              <p>Удалить</p>
                            </div>

                            <div>
                              <div
                                onClick={() => handleEdit(user._id)}
                                className="div_edit"
                              >
                                <p>Редактировать</p>
                              </div>
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
        {/* Модальное окно для добавления сотрудника */}
        <CreateEmployees
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
        />
        {/* Модальное окно для редактирования сотрудника */}
        <UpdateEmployees
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          employeeId={selectedEmployeeId}
        />
      </Sidebar>
    </>
  );
}

export default EmployeesPage;
