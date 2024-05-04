import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { HiEllipsisHorizontal } from "react-icons/hi2";
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
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

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
    const filterEmployees = () => {
      let filteredData = data;

      if (filter !== "") {
        filteredData = filteredData.filter(
          (user) => user.position && user.position.title === filter
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
        .delete(`http://localhost:3001/delete/employees/${id}`)
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
                          <div className="div_edit">
                            <Link
                              to={`/employeesPage/updateEmployees/${user._id}`}
                            >
                              <p>Редактировать</p>
                            </Link>
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
    </>
  );
}

export default EmployeesPage;
