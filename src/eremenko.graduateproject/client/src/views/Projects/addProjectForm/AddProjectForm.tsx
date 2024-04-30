import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

interface ProjectStatus {
  _id: string;
  title: string;
}

interface ProjectFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  statusProjectId: string;
  supervisorId: string;
  employeeId: string[];
}

const AddProjectWithEmployee: React.FC = () => {
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
  const [supervisorSearchQuery, setSupervisorSearchQuery] = useState<string>("");
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
    fetchProjectStatuses();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get<Employee[]>(
        "http://localhost:3001/get/employees"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const fetchProjectStatuses = async () => {
    try {
      const response = await axios.get<ProjectStatus[]>(
        "http://localhost:3001/get/projectStatuses"
      );
      setProjectStatuses(response.data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    const selectedEmployeeIds = selectedOptions.map((id) => String(id));
    setProjectData({ ...projectData, employeeId: selectedEmployeeIds });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/addProjectWithEmployee",
        projectData
      );
      navigate("/projectsPage");
      console.log(response.data.message);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const filteredSupervisors = employees.filter((employee) =>
    `${employee.lastName} ${employee.firstName} ${employee.middleName}`
      .toLowerCase()
      .includes(supervisorSearchQuery.toLowerCase())
  );

  const filteredEmployees = employees.filter((employee) =>
    `${employee.lastName} ${employee.firstName} ${employee.middleName}`
      .toLowerCase()
      .includes(employeeSearchQuery.toLowerCase())
  );


  return (
    <div className="pade">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="title-add">
            <h3>Добавление проекта</h3>
          </div>
          <div className="container-data-form">
            <div className="input_div">
              <label htmlFor="title">Название</label>
              <div>
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
              <div>
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
              <div>
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
              <div>
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
              <div>
                <select
                  name="statusProjectId"
                  value={projectData.statusProjectId}
                  onChange={handleChange}
                  className={"form_control"}
                  required
                >
                  <option value="">Выберите статус проекта</option>
                  {projectStatuses.map((status) => (
                    <option key={status._id} value={status._id}>
                      {status.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input_div">
              <label htmlFor="selectedEmployees">Куратор</label>
              <div className={"input_div"}>
                <input
                  type="text"
                  className={"form_control"}
                  placeholder="Поиск по ФИО"
                  value={supervisorSearchQuery}
                  onChange={(e) => setSupervisorSearchQuery(e.target.value)}
                />
              </div>
              <select
                name="supervisorId"
                className={"form_control_employees"}
                value={projectData.supervisorId}
                onChange={handleChange}
                required
              >
                <option value="">Выберите куратора проекта</option>
                {filteredSupervisors.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.lastName} {employee.firstName}{" "}
                    {employee.middleName}
                  </option>
                ))}
              </select>
            </div>
            <div className="input_div">
              <label htmlFor="selectedEmployees">Участники</label>
              <div className={"input_div"}>
                <input
                  type="text"
                  className={"form_control"}
                  placeholder="Поиск по ФИО"
                  value={employeeSearchQuery}
                  onChange={(e) => setEmployeeSearchQuery(e.target.value)}
                />
              </div>
              <select
                name="employeeId"
                value={projectData.employeeId}
                className={"form_control_employees"}
                onChange={handleEmployeeIdChange}
                multiple
                required
              >
                {filteredEmployees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.lastName} {employee.firstName}{" "}
                    {employee.middleName}
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
  );
};

export default AddProjectWithEmployee;
