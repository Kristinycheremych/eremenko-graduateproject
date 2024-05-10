import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { Employee, TaskStatus } from "../../../../views/projects/projectDetails/stagesPage/stageProjectDetails/TaskInterface";
import { style } from "../../../../components/ui/StyleSelect";

const URL = process.env.REACT_APP_URL;

function AddTaskPage({ isOpen, onClose }: any) {
  const { stageProjectId } = useParams<{
    stageProjectId: string;
  }>();
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
        `${URL}/get/employees`
      );
      setAllEmployees(response.data);
    } catch (error) {
      console.error("Ошибка при получении списка сотрудников:", error);
    }
  };

  const fetchTaskStatuses = async () => {
    try {
      const response = await axios.get<TaskStatus[]>(
        `${URL}/get/taskStatuses`
      );
      setTaskStatuses(response.data);
    } catch (error) {
      console.error("Ошибка при получении списка статусов задач:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/addExecutorTask`, {
        title,
        description,
        startDate,
        endDate,
        stageProjectId,
        creatorId,
        taskStatusId: taskStatuses[0]._id, // Передаем ID первого статуса задачи
        employeeId: employees, // передаем массив идентификаторов сотрудников как employeeId
      });
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };

  const handleEmployeeIdChange = (selectedOptions: any) => {
    if (selectedOptions) {
      const employeeIds = selectedOptions.map((option: any) => option.value);
      setEmployees(employeeIds);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="pade">
          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              <div className="title-add">
                <h3>Добавление задачи</h3>
              </div>
              <div className="container-data-form">
                <div className="input_div">
                  <label>Название</label>
                  <div className="container_input">
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
                  <div className="container_input">
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
                  <div className="container_input">
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
                  <div className="container_input">
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
                  <div className="container_input">
                    <Select
                      options={allEmployees.map((employee) => ({
                        value: employee._id,
                        label: `${employee.lastName} ${employee.firstName} ${employee.middleName}`,
                      }))}
                      onChange={(selectedOption: any) =>
                        setCreatorId(selectedOption.value)
                      }
                      isClearable
                      isSearchable
                      placeholder="Выберите создателя"
                      styles={style}
                      required
                    />
                  </div>
                </div>
                <div className="input_div">
                  <label htmlFor="selectedEmployees">Исполнители</label>
                  <div className="container_input">
                    <Select
                      options={allEmployees.map((employee) => ({
                        value: employee._id,
                        label: `${employee.lastName} ${employee.firstName} ${employee.middleName}`,
                      }))}
                      onChange={handleEmployeeIdChange}
                      isMulti
                      styles={style}
                      placeholder="Выберите исполнителей"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={"action_buttons"}>
                <div className="buttons">
                  <div>
                    <button
                      className={"button_add_cancel"}
                      onClick={onClose}
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
      )}
    </>
  );
}

export default AddTaskPage;
