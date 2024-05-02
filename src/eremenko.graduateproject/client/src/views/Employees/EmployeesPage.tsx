import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdArrowBackIos } from "react-icons/md";
import "./employees.css";

interface User {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  serviceNumber: number;
  position: {
    title: string;
  };
  employeeStatus: {
    title: string;
  };
  gender: String;
  divisions: {
    code: number;
    title: string;
  };
}

interface EmployeeStatusColors {
  [employeeStatus: string]: string;
}

function EmployeesPage() {
  const [data, setData] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [filteredEmployees, setFilteredEmployees] = useState<User[]>([]);

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
      .get("http://localhost:3001/get/employees")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Функция для фильтрации сотрудников по выбранной должности и поиску по имени, фамилии и отчеству
    const filterEmployees = () => {
      let filteredData = data;

      // Фильтрация по должности
      if (filter !== "") {
        filteredData = filteredData.filter(
          (user) => user.position && user.position.title === filter
        );
      }

      // Поиск по имени, фамилии и отчеству
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
    axios
      .delete(`http://localhost:3001/delete/employees/${id}`)
      .then((res) => {
        console.log(res);
        // Обновляем данные после удаления сотрудника
        setData(data.filter((user) => user._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
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
            <Link to="/employeesPage/createEmployees">
              <button className={"btn_add"}>Добавить</button>
            </Link>
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
                  <td>{user.position ? user.position.title : "Нет данных"}</td>
                  <td>
                    {user.divisions ? user.divisions.title : "Нет данных"}
                  </td>
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
                      {user.employeeStatus
                        ? user.employeeStatus.title
                        : "Нет данных"}
                    </p>
                  </td>
                  <td className="td-icon">
                    <div className={"icon_edit"}>
                      <Link to={`/employeesPage/updateEmployees/${user._id}`}>
                        <FiEdit />
                      </Link>
                    </div>
                  </td>
                  <td className="td-icon">
                    <div className={"icon_delete"}>
                      <AiOutlineDelete onClick={() => handleDelete(user._id)} />
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

export default EmployeesPage;
