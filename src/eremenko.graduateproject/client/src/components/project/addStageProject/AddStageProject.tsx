import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {style} from '../../../components/ui/StyleSelect';
import {
  ProjectFormData,
  TaskStatuses,
  Project,
  Stage,
} from "../../../views/projects/projectDetails/stagesPage/StageProjectInterface";

const URL = process.env.REACT_APP_URL;

function AddProjectWithEmployee({ isOpen, onClose }: any) {
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

  useEffect(() => {
    fetchTaskStatuses();
    fetchProject();
    fetchStage();
  }, []);

  const fetchTaskStatuses = async () => {
    try {
      const response = await axios.get<TaskStatuses[]>(
        `${URL}/get/taskStatuses`
      );
      setTaskStatuses(response.data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const fetchProject = async () => {
    try {
      const response = await axios.get<Project[]>(
        `${URL}/get/projects`
      );
      setProject(response.data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const fetchStage = async () => {
    try {
      const response = await axios.get<Project[]>(
        `${URL}/get/stage`
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/addTaskStatusProjectStage`,
        projectData
      );
      console.log(response.data.message);
      // Переход на страницу с этапами проекта
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleEmployeeIdChange = (selectedOptions: any) => {
    if (selectedOptions) {
      const selectedTaskStatuses = selectedOptions.map(
        (option: any) => option.value
      );
      setProjectData({ ...projectData, taskStatusesId: selectedTaskStatuses });
    }
  };

  const handleStageChange = (selectedOption: any) => {
    if (selectedOption) {
      setProjectData({ ...projectData, stageId: selectedOption.value });
    } else {
      // Если выбор был очищен, обновляем состояние stageId на пустую строку
      setProjectData({ ...projectData, stageId: "" });
    }
  };

  const handleProjectChange = (selectedOption: any) => {
    if (selectedOption) {
      setProjectData({ ...projectData, projectId: selectedOption.value });
    } else {
      // Если выбор был очищен, обновляем состояние stageId на пустую строку
      setProjectData({ ...projectData, projectId: "" });
    }
  };
  
  return (
    <div>
      <>
        {isOpen && (
          <div className="pade">
            <div className="wrapper">
              <form onSubmit={handleSubmit}>
                <div className="title-add">
                  <h3>Добавление этапа проекта</h3>
                </div>
                <div className="container-data-form">
                  <div className={"input_div"}>
                    <label htmlFor="project">Проект</label>
                    <div className="container_input">
                      <Select
                        options={project.map((project) => ({
                          value: project._id,
                          label: project.title,
                        }))}
                        onChange={handleProjectChange}
                        isClearable
                        className="select_input"
                        placeholder="Выберите проект"
                        isSearchable
                        styles={style}
                        required
                      />
                    </div>
                  </div>
                  <div className={"input_div"}>
                    <label htmlFor="stage">Этап</label>
                    <div className="container_input">
                      <Select
                        options={stage.map((stage) => ({
                          value: stage._id,
                          label: stage.title,
                        }))}
                        onChange={handleStageChange}
                        isClearable
                        className="select_input"
                        placeholder="Выберите этап"
                        isSearchable
                        styles={style}
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
                    <label htmlFor="endDate">Дата завершения</label>
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
                    <label htmlFor="periodExecution">Срок выполнения</label>
                    <div className="container_input">
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
                    <label htmlFor="selectedEmployees">Статусы задач</label>
                    <div className="container_input">
                      <Select
                        options={taskStatuses.map((taskStatuses) => ({
                          value: taskStatuses._id,
                          label: `${taskStatuses.title}`,
                        }))}
                        onChange={handleEmployeeIdChange}
                        // Возможность выбора нескольких участников одновременно
                        isMulti
                        placeholder="Выберите статусы задачи"
                        styles={style}
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
    </div>
  );
}

export default AddProjectWithEmployee;
