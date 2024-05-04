import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

interface TaskStatus {
  _id: string;
  title: string;
}

const AddTaskPage: React.FC = () => {
  const { projectId, stageId, stageProjectId } = useParams<{
    stageProjectId: string;
    projectId: string;
    stageId: string;
  }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [employees, setEmployees] = useState<string[]>([]);
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]); 

  useEffect(() => {
    fetchEmployees();
    fetchTaskStatuses();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>(
        "http://localhost:3001/get/employees"
      );
      setAllEmployees(response.data);
    } catch (error) {
      console.error("Ошибка при получении списка сотрудников:", error);
    }
  };

  const fetchTaskStatuses = async () => {
    try {
      const response = await axios.get<TaskStatus[]>(
        "http://localhost:3001/get/taskStatuses"
      );
      setTaskStatuses(response.data);
    } catch (error) {
      console.error("Ошибка при получении списка статусов задач:", error);
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await axios.post(`http://localhost:3001/addExecutorTask`, {
      title,
      description,
      startDate,
      endDate,
      stageProjectId,
      creatorId,
      taskStatusId: taskStatuses[0]._id, // Передаем ID первого статуса задачи
      employeeId: employees, // передаем массив идентификаторов сотрудников как employeeId
    });
    navigate(
      `/projectsPage/stageDetails/${projectId}/${stageId}/${stageProjectId}`
    );
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
  }
};

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="pade">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="title-add">
              <h3>Добавление задачи</h3>
            </div>
            <div className="container-data-form">
              <div className="input_div">
                <label>Название</label>
                <div>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={"form_control"}
                    placeholder="Введите название"
                  />
                </div>
              </div>
              <div className="input_div">
                <label>Описание</label>
                <div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={"form_control"}
                    placeholder="Введите описание"
                  />
                </div>
              </div>
              <div className="input_div">
                <label>Дата начала</label>
                <div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={"form_control"}
                  />
                </div>
              </div>
              <div className="input_div">
                <label>Дата завершения</label>
                <div>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={"form_control"}
                  />
                </div>
              </div>
              <div className="input_div">
                <label>Создатель</label>
                <div>
                  <select
                    value={creatorId}
                    onChange={(e) => setCreatorId(e.target.value)}
                    className={"form_control"}
                  >
                    <option value="">Выберите создателя</option>
                    {allEmployees.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.firstName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input_div">
                <label>Исполнители</label>
                <div>
                  <select
                    multiple
                    value={employees}
                    onChange={(e) =>
                      setEmployees(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                    className={"form_control"}
                  >
                    {allEmployees.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.firstName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className={"action_buttons"}>
              <div className="buttons">
                <div>
                  <button
                    className={"button_add_cancel"}
                    onClick={handleCancel}
                  >
                    Отменить
                  </button>
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

export default AddTaskPage;
