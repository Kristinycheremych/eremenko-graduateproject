import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../../../../../components/header/Header";
import { MdArrowBackIos } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./style.css";

interface Project {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface Stage {
  _id: string;
  title: string;
  description: string;
}

interface StageProject {
  _id: string;
  periodExecution: string;
  startDate: string;
  endDate: string;
  projectId: Project;
  stageId: Stage;
}

interface StageFormData {
  _id: string;
  stageProjectId: StageProject;
  taskStatusesId: TaskStatus[];
}
// Задачи
interface TaskStatus {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  taskStatusId: string;
}

const StageDetailsPage: React.FC = () => {
  const { projectId, stageId, stageProjectId } = useParams<{
    stageProjectId: string;
    projectId: string;
    stageId: string;
  }>();
  const [stage, setStage] = useState<StageFormData | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false); // Состояние для открытия и закрытия боковой панели
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Состояние для выбранной задачи

  useEffect(() => {
    if (stageProjectId) {
      fetchStageDetails(stageProjectId);
      fetchTasks(stageProjectId);
    }
  }, [stageProjectId]);

  const fetchStageDetails = async (stageProjectId: string) => {
    try {
      const response = await axios.get<StageFormData[]>(
        `http://localhost:3001/get/taskStatusProjectStage`
      );
      const filteredData = response.data.find(
        (project) => project.stageProjectId.stageId._id === stageProjectId
      );
      if (filteredData) {
        setStage(filteredData);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const fetchTasks = async (stageProjectId: string) => {
    try {
      const response = await axios.get<Task[]>(
        `http://localhost:3001/get/tasks/${stageProjectId}`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
    }
  };

  // Функция для открытия модального окна с информацией о задаче
  const openModal = (task: Task) => {
    setSelectedTask(task);
    setSidebarOpen(true); // Открываем боковую панель
    setSidebarOpen(true);
  };
  // Функция для закрытия боковой панели
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (!stage) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="header">
        <div className="divArrowBackIos">
          <MdArrowBackIos className="MdArrowBackIos" />
        </div>
        <p>Подробности об этапе - {stage.stageProjectId.stageId.title}</p>
      </div>
      <Header />
      <div className={`lateral-panel ${sidebarOpen ? "open" : ""}`}>
        <IoIosCloseCircleOutline className="closebtn" onClick={closeSidebar} />
        <div className="sidebar-content">
          {selectedTask && (
            <div>
              <p className="info-task">Информация о задаче</p>
              <p>
                <h5>Название:</h5>
                {selectedTask.title}
              </p>
              <p>
                <h5>Описание:</h5>
                {selectedTask.description}
              </p>

              {/* Добавление элементов управления перемещением задачи */}
              <div className="containerTaskActions">
                <p>
                  <h5>Переместить задачу:</h5>
                </p>
                <select className="selectTask">
                  <option value="" className="selectTask">
                    Выберите статус
                  </option>
                </select>
              </div>
              {/* Удаление задачи */}
              <div className="containetDeletedTask">
                <button className="deletedTask">Удалить задачу</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <div className={"container_search_filter"}>
          <div className={"div_input_search"}>
            <input type="text" className={"input_search"} placeholder="Поиск" />
          </div>
          <div className={"div_filter"}>
            <select className={"filter"}>
              <option value="">Все</option>
            </select>
          </div>
          <div className={"containet_btn_add"}>
            <Link
              to={`/projectsPage/stageDetails/${projectId}/${stageId}/${stageProjectId}/addTask`}
            >
              <button className={"btn_add"}>Добавить задачу</button>
            </Link>
          </div>
        </div>
        <div>
          <p>Описание: {stage.stageProjectId.stageId.description}</p>
        </div>
        <div className="stages">
          {stage.taskStatusesId.map((status) => (
            <div key={status._id} className={"stage"}>
              <div className="titleStatusStage">
                <p>{status.title}</p>
              </div>
              <div className="tasks">
                {tasks
                  .filter((task) => task.taskStatusId === status._id)
                  .map((task) => (
                    <div key={task._id} className="task">
                      <div className="task_content">
                        <div className="heading">
                          <p className="title-task">{task.title}</p>
                          <div className="BsThreeDots">
                            <BsThreeDots onClick={() => openModal(task)} />
                          </div>
                        </div>
                        <div className="div-task-description">
                          <p className="description description-task">
                            {task.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StageDetailsPage;
