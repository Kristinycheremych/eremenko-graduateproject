import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Project {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: {
    _id: string;
    title: string;
  };
  employees: {
    _id: string;
    lastName: string;
    firstName: string;
    middleName: string;
  }[];
}

function UpdateProject() {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [statusId, setStatusId] = useState<string>("");
  const [employeeIds, setEmployeeIds] = useState<string[]>([]); // Массив выбранных сотрудников
  const [statusList, setStatusList] = useState<any[]>([]);
  const [employeesList, setEmployeesList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Запрос для поиска сотрудников
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Project>(
          `http://localhost:3001/employeeProject/${id}`
        );
        const projectData = response.data;
        setTitle(projectData.title);
        setDescription(projectData.description);
        setStartDate(
          new Date(projectData.startDate).toISOString().split("T")[0]
        );
        setEndDate(new Date(projectData.endDate).toISOString().split("T")[0]);
        setStatusId(projectData.status._id);
        setEmployeeIds(projectData.employees.map((employee) => employee._id)); // Устанавливаем значения employeeIds
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    axios
      .get("http://localhost:3001/get/projectStatuses")
      .then((res) => {
        setStatusList(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3001/get/employees")
      .then((res) => {
        setEmployeesList(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Фильтрация списка сотрудников по введенному запросу
  const filteredEmployees = employeesList.filter((employee) =>
    `${employee.lastName} ${employee.firstName} ${employee.middleName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/updateProject/${id}`, {
        title,
        description,
        startDate,
        endDate,
        status: statusId,
        employees: employeeIds, // Используйте массив выбранных сотрудников для отправки на сервер
      })
      .then((res) => {
        console.log(res);
        navigate("/projectsPage");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={"pade"}>
        <div className={"wrapper"}>
          <form onSubmit={handleUpdate}>
            <div className="title-add">
              <h3>Изменение проекта</h3>
            </div>

            <div className="container-data-form">
              <div className={"input_div"}>
                <label htmlFor="title">Название</label>
                <div>
                  <input
                    type="text"
                    placeholder="Введите название"
                    className={"form_control"}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="description">Описание</label>
                <div>
                  <textarea
                    placeholder="Введите описание"
                    className={"form_control"}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>
              </div>
              <div className={"input_div"}>
                <label htmlFor="startDate">Дата начала</label>
                <div>
                  <input
                    type="date"
                    className={"form_control"}
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                  />
                </div>
              </div>

              <div className={"input_div"}>
                <label htmlFor="endDate">Планируемая дата окончания</label>
                <div>
                  <input
                    type="date"
                    className={"form_control"}
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                  />
                </div>
              </div>

              <div className={"input_div"}>
                <label htmlFor="status">Статус</label>
                <div>
                  <select
                    className="form_control"
                    value={statusId}
                    onChange={(e) => setStatusId(e.target.value)}
                  >
                    <option value={""}>Выберите статус:</option>
                    {statusList.map((statusItem) => {
                      return (
                        <option key={statusItem._id} value={statusItem._id}>
                          {statusItem.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className={"input_div"}>
                <label htmlFor="status">Ответственные</label>
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
                <div>
                  <select
                    className="form_control_employees"
                    multiple // Разрешить множественный выбор
                    value={employeeIds}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setEmployeeIds(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                  >
                    {filteredEmployees.map((employeeItem) => {
                      return (
                        <option key={employeeItem._id} value={employeeItem._id}>
                          {`${employeeItem.lastName} ${employeeItem.firstName} ${employeeItem.middleName}`}
                        </option>
                      );
                    })}
                  </select>
                </div>
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
                  <button className={"button_add"}>Изменить</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProject;
