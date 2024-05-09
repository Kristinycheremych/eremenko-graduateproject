import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../../../../components/header/Header";
import { MdArrowBackIos } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import "./style.css";
import {
  TaskStatusesStageProject,
  ExecutorTask,
  Employee,
} from "./TaskInterface";
import AddTask from "../../../../../components/project/addStageProject/addTask/AddTask";

const StageDetailsPage: React.FC = () => {
  const { stageProjectId } = useParams<{
    stageProjectId: string;
  }>();
  const [stage, setStage] = useState<TaskStatusesStageProject | null>(null);
  const [tasks, setTasks] = useState<ExecutorTask[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ExecutorTask | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Добавляем состояние для модального окна

  useEffect(() => {
    if (stageProjectId) {
      fetchStageDetails(stageProjectId);
      fetchTasks();
    }
  }, [stageProjectId]);

  const fetchStageDetails = async (stageProjectId: string) => {
    try {
      const response = await axios.get<TaskStatusesStageProject[]>(
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
  // для модального окна
  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!stage) {
    return <p>Загрузка...</p>;
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
            <MdOutlineClose className="closebtn" onClick={closeSidebar} />
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
              <div>
                <p>
                  <h4>Переместить задачу:</h4>
                </p>
                <select
                  className="select_task"
                  onChange={(e) =>
                    selectedTask && moveTask(selectedTask._id, e.target.value)
                  }
                >
                  <option value="">Выберите статус</option>
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
          <div className="containet_deleted_task">
            <button className="deleted_task" onClick={deleteTask}>
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
            <button className={"btn_add"} onClick={handleAdd}>
              + Добавить задачу
            </button>
          </div>
        </div>
        <div className="stages">
          {stage.taskStatusesId.map((status) => {
            // Фильтруем задачи по текущему статусу
            const tasksForStatus = filteredTasks.filter(
              (task) => task.taskId.taskStatusId._id === status._id
            );
            return (
              <div key={status._id} className={"stage"}>
                <div className="title_status_stage">
                  <p>{status.title}</p>
                </div>
                <div className="container_task_content">
                  {tasksForStatus.map((executorTask) => (
                    <div key={executorTask._id} className="container_task">
                      <div className="task_content">
                        <div className="task_content_item">
                          <h4 className="task_content_item_title">
                            {executorTask.taskId.title}
                          </h4>
                          <div className="task_content_icon">
                            <BsThreeDots
                              onClick={() => openModal(executorTask)}
                            />
                          </div>
                        </div>
                        <div className="task_content_description">
                          <p>{executorTask.taskId.description}</p>
                        </div>
                        <div className="task_content_date">
                          <p>
                            {`${new Date(
                              executorTask.startDate
                            ).toLocaleDateString()} -
                             ${new Date(
                               executorTask.endDate
                             ).toLocaleDateString()}`}
                          </p>
                        </div>
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
      {/* Добавляем модальное окно */}
      <AddTask isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default StageDetailsPage;
