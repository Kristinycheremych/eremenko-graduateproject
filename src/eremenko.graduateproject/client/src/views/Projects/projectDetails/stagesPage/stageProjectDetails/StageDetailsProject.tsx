import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../../../../../components/header/Header";
import { MdArrowBackIos } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
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

interface TaskStatus {
  _id: string;
  title: string;
}

interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

interface StageProject {
  _id: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  taskStatusId: TaskStatus;
  stageProjectId: StageProject;
  creatorId: Employee;
}

interface ExecutorTask {
  _id: string;
  taskId: Task;
  startDate: string;
  endDate: string;
  employeeId: Employee[];
}

const StageDetailsPage: React.FC = () => {
  const { projectId, stageId, stageProjectId } = useParams<{
    stageProjectId: string;
    projectId: string;
    stageId: string;
  }>();
  const [stage, setStage] = useState<StageFormData | null>(null);
  const [tasks, setTasks] = useState<ExecutorTask[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ExecutorTask | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    if (stageProjectId) {
      fetchStageDetails(stageProjectId);
      fetchTasks();
    }
  }, [stageProjectId]);

  const fetchStageDetails = async (stageProjectId: string) => {
    try {
      const response = await axios.get<StageFormData[]>(
        `http://localhost:3001/get/taskStatusProjectStage`
      );
      const filteredData = response.data.find(
        (project) => project.stageProjectId._id === stageProjectId
      );
      if (filteredData) {
        setStage(filteredData);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get<ExecutorTask[]>(
        `http://localhost:3001/get/executorTask`
      );
      // Фильтрация задач по stageProjectId
      const filteredTasks = response.data.filter(
        (task) => task.taskId.stageProjectId._id === stageProjectId
      );
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Ошибка при получении задач для этапа:", error);
    }
  };

  const deleteTask = async () => {
    if (window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      try {
        if (selectedTask) {
          await axios.delete(
            `http://localhost:3001/delete/executorTask/${selectedTask._id}`
          );
          // После удаления задачи обновляем список задач
          fetchTasks();
          // Закрываем боковую панель
          closeSidebar();
        }
      } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
      }
    }
  };

  const moveTask = async (taskId: string, newStatusId: string) => {
    try {
      await axios.put(`http://localhost:3001/update/task/${taskId}`, {
        taskStatusId: newStatusId,
      });

      // После перемещения задачи обновляем список задач
      fetchTasks();
      // Закрываем боковую панель
      closeSidebar();
    } catch (error) {
      console.error("Ошибка при перемещении задачи:", error);
    }
  };

  // Функция для обновления выбранного статуса
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  // Фильтрация задач по выбранному статусу
  const filteredTasks = selectedStatus
    ? tasks.filter((task) => task.taskId.taskStatusId._id === selectedStatus)
    : tasks;

  const openModal = (task: ExecutorTask) => {
    setSelectedTask(task);
    setSidebarOpen(true);
  };

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
        <div className="sidebar_heading">
          <h2>Информация о задаче</h2>
          <div className="icon_placeholder">
            <MdOutlineClose className="closebtn" onClick={closeSidebar}/>
          </div>
        </div>
        <div className="sidebar_content">
          {selectedTask && (
            <>
              <div className="sidebar_content_item">
                <h4>Название:</h4>
                <ul>
                  <li>
                    <p>{selectedTask.taskId.title}</p>
                  </li>
                </ul>
              </div>
              <div className="sidebar_content_item">
                <h4>Описание:</h4>
                <ul>
                  <li>
                    <p>{selectedTask.taskId.description}</p>
                  </li>
                </ul>
              </div>
              <div className="sidebar_content_item">
                <h4>Дата начала:</h4>
                <ul>
                  <li>
                    <p>
                      {new Date(selectedTask.startDate).toLocaleDateString()}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="sidebar_content_item">
                <h4>Дата окончания:</h4>
                <ul>
                  <li>
                    <p>{new Date(selectedTask.endDate).toLocaleDateString()}</p>
                  </li>
                </ul>
              </div>
              <div className="sidebar_content_item">
                <h4>Создатель:</h4>
                <ul>
                  <li>
                    <p>{`${selectedTask.taskId.creatorId.lastName} ${selectedTask.taskId.creatorId.firstName} ${selectedTask.taskId.creatorId.middleName}`}</p>
                  </li>
                </ul>
              </div>
              <div className="sidebar_content_item">
                <h4>Участники:</h4>
                <ul>
                  <li>
                    <p>
                      {selectedTask.employeeId.map((employee, index) => (
                        <p key={index}>
                          {`${employee.lastName} ${employee.firstName} ${employee.middleName}`}
                        </p>
                      ))}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="containerTaskActions">
                <p>
                  <h4>Переместить задачу:</h4>
                </p>
                <select
                  className="selectTask"
                  onChange={(e) =>
                    selectedTask && moveTask(selectedTask._id, e.target.value)
                  }
                >
                  <option value="" className="selectTask">
                    Выберите статус
                  </option>
                  {stage.taskStatusesId.map((status) => (
                    <option key={status._id} value={status._id}>
                      {status.title}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
        <div className="sidebar_footer">
          <div className="containetDeletedTask">
            <button className="deletedTask" onClick={deleteTask}>
              Удалить задачу
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={"container_search_filter"}>
          <div className={"div_input_search"}>
            <input type="text" className={"input_search"} placeholder="Поиск" />
          </div>
          <div className={"div_filter"}>
            <select
              className={"filter"}
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="">Все</option>
              {stage.taskStatusesId.map((status) => (
                <option key={status._id} value={status._id}>
                  {status.title}
                </option>
              ))}
            </select>
          </div>
          <div className={"containet_btn_add"}>
            <Link
              to={`/projectsPage/stageDetails/${projectId}/${stageId}/${stageProjectId}/addTask`}
            >
              <button className={"btn_add"}>+ Добавить задачу</button>
            </Link>
          </div>
        </div>
        {/* <div>
          <p>Описание: {stage.stageProjectId.stageId.description}</p>
        </div> */}
        <div className="stages">
          {stage.taskStatusesId.map((status) => {
            // Фильтруем задачи по текущему статусу
            const tasksForStatus = filteredTasks.filter(
              (task) => task.taskId.taskStatusId._id === status._id
            );

            return (
              <div key={status._id} className={"stage"}>
                <div className="titleStatusStage">
                  <p>{status.title}</p>
                </div>
                <div className="tasks">
                  {tasksForStatus.map((executorTask) => (
                    <div key={executorTask._id} className="task">
                      <div className="task_content">
                        <div className="heading">
                          <p className="title-task">
                            {executorTask.taskId.title}
                          </p>
                          <div className="BsThreeDots">
                            <BsThreeDots
                              onClick={() => openModal(executorTask)}
                            />
                          </div>
                        </div>
                        <div className="div-task-description">
                          <p className="description description-task">
                            {executorTask.taskId.description}
                          </p>
                        </div>
                        <div className="date_task">
                          <p>
                            {`${new Date(
                              executorTask.startDate
                            ).toLocaleDateString()} -
                             ${new Date(
                               executorTask.endDate
                             ).toLocaleDateString()}`}
                          </p>
                        </div>
                        {/* <div>
                          <p>Создатель задачи:</p>
                          <p>{`${
                            executorTask.taskId.creatorId.lastName
                          } ${executorTask.taskId.creatorId.firstName.charAt(
                            0
                          )}. ${executorTask.taskId.creatorId.middleName.charAt(
                            0
                          )}.`}</p>
                        </div> */}
                        <div>
                          <div>
                            <div className="avatar-container">
                              {executorTask.employeeId.length > 0 ? (
                                executorTask.employeeId
                                  .slice(0, 3)
                                  .map((employee: Employee, index) => (
                                    <div key={index} className="avatar">
                                      <div className="avatar-letter">
                                        {employee.firstName.charAt(0)}
                                        {employee.middleName
                                          ? employee.middleName.charAt(0)
                                          : ""}
                                      </div>
                                    </div>
                                  ))
                              ) : (
                                <span>Нет данных</span>
                              )}
                              {executorTask.employeeId.length > 3 && (
                                <span>
                                  <div className="avatar">
                                    {" "}
                                    <span>
                                      +{executorTask.employeeId.length - 3}
                                    </span>
                                  </div>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StageDetailsPage;
