import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface TaskStatuses {
  _id: string;
  title: string;
}

interface Project {
  _id: string;
  title: string;
}

interface Stage {
  _id: string;
  title: string;
}

interface ProjectFormData {
  _id: string;
  periodExecution: string;
  startDate: string;
  endDate: string;
  projectId: string;
  stageId: string;
  taskStatusesId: string[];
}

const AddProjectWithEmployee: React.FC = () => {
  const [projectData, setProjectData] = useState<ProjectFormData>({
    _id: "",
    periodExecution: "",
    startDate: "",
    endDate: "",
    projectId: "",
    stageId: "",
    taskStatusesId: [],
  });

  const [taskStatuses, setTaskStatuses] = useState<TaskStatuses[]>([]);
  const [project, setProject] = useState<Project[]>([]);
  const [stage, setStage] = useState<Stage[]>([]);
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    fetchTaskStatuses();
    fetchProject();
    fetchStage();
  }, []);

  const fetchTaskStatuses = async () => {
    try {
      const response = await axios.get<TaskStatuses[]>(
        "http://localhost:3001/get/taskStatuses"
      );
      setTaskStatuses(response.data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const fetchProject = async () => {
    try {
      const response = await axios.get<Project[]>(
        "http://localhost:3001/get/projects"
      );
      setProject(response.data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const fetchStage = async () => {
    try {
      const response = await axios.get<Project[]>(
        "http://localhost:3001/get/stage"
      );
      setStage(response.data);
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

  const handleEmployeeIdChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    const selectedTaskStatuses = selectedOptions.map((id) => String(id));
    setProjectData({ ...projectData, taskStatusesId: selectedTaskStatuses });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/addTaskStatusProjectStage",
        projectData
      );
      console.log(response.data.message);
      // Переход на страницу с этапами проекта
      navigate(`/projectsPage/stageDetails/${projectId}/${projectData.projectId}/stages`);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleCancel = () => {
    // Переход на предыдущую страницу
    navigate(-1);
  };

  return (
    <div className="pade">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="title-add">
            <h3>Добавление этапа проекта</h3>
          </div>
          <div className="container-data-form">
            <div className="input_div">
              <label htmlFor="status">Проект</label>
              <div>
                <select
                  name="projectId"
                  value={projectData.projectId}
                  onChange={handleChange}
                  className={"form_control"}
                  required
                >
                  <option value="">Выберите проект</option>
                  {project.map((status) => (
                    <option key={status._id} value={status._id}>
                      {status.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input_div">
              <label htmlFor="stage">Этап</label>
              <div>
                <select
                  name="stageId"
                  value={projectData.stageId}
                  onChange={handleChange}
                  className={"form_control"}
                  required
                >
                  <option value="">Выберите этап</option>
                  {stage.map((stage) => (
                    <option key={stage._id} value={stage._id}>
                      {stage.title}
                    </option>
                  ))}
                </select>
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
              <label htmlFor="endDate">Дата завершения</label>
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
              <label htmlFor="periodExecution">Срок выполнения</label>
              <div>
                <input
                  type="date"
                  name="periodExecution"
                  value={projectData.periodExecution}
                  onChange={handleChange}
                  className={"form_control"}
                  required
                />
              </div>
            </div>
            <div className="input_div">
              <label htmlFor="taskStatusesId">Статус задачи</label>
              <select
                name="taskStatusesId"
                value={projectData.taskStatusesId}
                className={"form_control_employees"}
                onChange={handleEmployeeIdChange}
                multiple
                required
              >
                {taskStatuses.map((taskStatuses) => (
                  <option key={taskStatuses._id} value={taskStatuses._id}>
                    {taskStatuses.title}
                  </option>
                ))}
              </select>
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
  );
};

export default AddProjectWithEmployee;