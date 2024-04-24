import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]); // Массив выбранных сотрудников

  const [employeesList, setEmployeesList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // Запрос для поиска сотрудников
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/get/projectStatuses")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get/employees")
      .then((res) => {
        setEmployeesList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmitProjects = async (event: any) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/createProject", {
        title,
        description,
        startDate,
        endDate,
        status,
        employees: selectedEmployees, // Массив выбранных сотрудников для отправки на сервер
      })
      .then((res) => {
        console.log(res);
        navigate("/projectsPage");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={"pade"}>
        <div className={"wrapper"}>
          <form onSubmit={handleSubmitProjects}>
            <div className="title-add">
              <h3>Добавление проекта</h3>
            </div>
            <div className="container-data-form">
              <div className={"input_div"}>
                <label htmlFor="title">Название</label>
                <div>
                  <input
                    type="text"
                    placeholder="Введите название"
                    className={"form_control"}
                    onChange={(e: any) => setTitle(e.target.value)}
                    value={title}
                    required
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="description">Описание</label>
                <div>
                  <textarea
                    placeholder="Ввведите описание"
                    className={"form_control"}
                    onChange={(e: any) => setDescription(e.target.value)}
                    value={description}
                    required
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="startDate">Дата начала</label>
                <div>
                  <input
                    type="date"
                    className={"form_control"}
                    onChange={(e: any) => setStartDate(e.target.value)}
                    value={startDate}
                    required
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="endDate">Планируемая дата окончания</label>
                <div>
                  <input
                    type="date"
                    className={"form_control"}
                    onChange={(e: any) => setEndDate(e.target.value)}
                    value={endDate}
                    required
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="status">Статус проекта:</label>
                <div>
                  <select
                    className={"form_control"}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="">Выберете статус:</option>
                    {data.map((projectStatuses) => {
                      return (
                        <option
                          key={projectStatuses._id}
                          value={projectStatuses._id}
                        >
                          {projectStatuses.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Выбор ответственного сотрудника */}
              <div className={"input_div"}>
                <label htmlFor="selectedEmployees">Ответственные:</label>
                {/* Поиск сотрудников */}
                <div className={"input_div"}>
                  <input
                    type="text"
                    className={"form_control"}
                    placeholder="Поиск по ФИО"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className={"form_control_employees"}
                  multiple
                  value={selectedEmployees}
                  onChange={(e) =>
                    setSelectedEmployees(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                  required
                >
                  {employeesList
                    .filter((employee) =>
                      `${employee.lastName} ${employee.firstName} ${employee.middleName}`
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {`${employee.lastName} ${employee.firstName} ${employee.middleName}`}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className={"action_buttons"}>
              <div className="buttons">
                <div>
                  <Link to={"/projectsPage"}>
                    <button className={"button_add_cancel"}>Отменить</button>
                  </Link>
                </div>
                <div>
                  <button className={"button_add"}>Добавить</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProjectForm;