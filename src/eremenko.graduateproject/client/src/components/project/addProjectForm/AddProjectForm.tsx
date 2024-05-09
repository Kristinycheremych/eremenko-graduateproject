import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import { ProjectFormData, Employee, ProjectStatus } from "../../../views/projects/ProjectInterfaces";
import {style} from '../../../components/ui/StyleSelect';

const URL = process.env.REACT_APP_URL;

function AddProjectWithEmployee({ isOpen, onClose }: any) {
  const [projectData, setProjectData] = useState<ProjectFormData>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    statusProjectId: "",
    supervisorId: "",
    employeeId: [],
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projectStatuses, setProjectStatuses] = useState<ProjectStatus[]>([]);

  useEffect(() => {
    fetchEmployees();
    fetchProjectStatuses();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>(
        `${URL}/get/employees`
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const fetchProjectStatuses = async () => {
    try {
      const response = await axios.get<ProjectStatus[]>(
        `${URL}/get/projectStatuses`
      );
      setProjectStatuses(response.data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleStatusChange = (selectedOption: any) => {
    if (selectedOption) {
      const statusProjectId = selectedOption.value;
      setProjectData({ ...projectData, statusProjectId });
    }
  };

  const handleSupervisorChange = (selectedOption: any) => {
    if (selectedOption) {
      const supervisorId = selectedOption.value;
      setProjectData({ ...projectData, supervisorId });
    }
  };

  const handleEmployeeIdChange = (selectedOptions: any) => {
    if (selectedOptions) {
      const employeeIds = selectedOptions.map((option: any) => option.value);
      setProjectData({ ...projectData, employeeId: employeeIds });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/addProjectWithEmployee`,
        projectData
      );
      window.location.reload();
      onClose();
      console.log(response.data.message);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="pade">
          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              <div className="title-add">
                <h3>Добавление проекта</h3>
              </div>
              <div className="container-data-form">
                <div className="input_div">
                  <label htmlFor="title">Название</label>
                  <div className="container_input">
                    <input
                      type="text"
                      name="title"
                      value={projectData.title}
                      onChange={handleChange}
                      placeholder="Введите название"
                      className={"form_control"}
                      required
                    />
                  </div>
                </div>
                <div className="input_div">
                  <label htmlFor="description">Описание</label>
                  <div className="container_input">
                    <input
                      type="text"
                      name="description"
                      value={projectData.description}
                      onChange={handleChange}
                      placeholder="Введите описание"
                      className={"form_control"}
                      required
                    />
                  </div>
                </div>

                <div className="input_div">
                  <label htmlFor="startDate">Дата начала</label>
                  <div className="container_input">
                    <input
                      type="date"
                      name="startDate"
                      value={projectData.startDate}
                      onChange={handleChange}
                      className={"form_control"}
                      required
                    />
                  </div>
                </div>
                <div className="input_div">
                  <label htmlFor="endDate">Планируемая дата окончания</label>
                  <div className="container_input">
                    <input
                      type="date"
                      name="endDate"
                      value={projectData.endDate}
                      onChange={handleChange}
                      className={"form_control"}
                      required
                    />
                  </div>
                </div>
                <div className="input_div">
                  <label htmlFor="status">Статус проекта</label>
                  <div className="container_input">
                    <Select
                      // Опции для выбора, сформированные из отфильтрованного списка сотрудников
                      options={projectStatuses.map((status) => ({
                        value: status._id,
                        label: `${status.title}`,
                      }))}
                      // Функция обратного вызова, вызываемая при изменении выбранного куратора
                      onChange={handleStatusChange}
                      // Возможность очистить выбранное значение
                      isClearable
                      // Возможность поиска куратора по имени
                      isSearchable
                      placeholder="Выберите статус проекта"
                      styles={style}
                      required
                    />
                  </div>
                </div>
                <div className="input_div">
                  <label htmlFor="selectedEmployees">Куратор</label>
                  <div className="container_input">
                    <Select
                      // Опции для выбора, сформированные из отфильтрованного списка сотрудников
                      options={employees.map((employee) => ({
                        value: employee._id,
                        label: `${employee.lastName} ${employee.firstName} ${employee.middleName}`,
                      }))}
                      // Функция обратного вызова, вызываемая при изменении выбранного куратора
                      onChange={handleSupervisorChange}
                      // Возможность очистить выбранное значение
                      isClearable
                      // Возможность поиска куратора по имени
                      isSearchable
                      placeholder="Выберите куратора"
                      styles={style}
                      required
                    />
                  </div>
                </div>
                <div className="input_div">
                  <label htmlFor="selectedEmployees">Участники</label>
                  <div className="container_input">
                    <Select
                      // Опции для выбора, сформированные из списка всех сотрудников
                      options={employees.map((employee) => ({
                        value: employee._id,
                        label: `${employee.lastName} ${employee.firstName} ${employee.middleName}`,
                      }))}
                      // Функция обратного вызова, вызываемая при изменении выбранных участников
                      onChange={handleEmployeeIdChange}
                      // Возможность выбора нескольких участников одновременно
                      isMulti
                      placeholder="Выберите участников"
                      styles={style}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={"action_buttons"}>
                <div className="buttons">
                  <div>
                    <Link to={"/projectsPage"}>
                      <button className={"button_add_cancel"} onClick={onClose}>
                        Отменить
                      </button>
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
      )}
    </>
  );
}

export default AddProjectWithEmployee;
