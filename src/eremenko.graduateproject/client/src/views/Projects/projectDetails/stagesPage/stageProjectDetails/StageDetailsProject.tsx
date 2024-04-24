/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../../../../../components/header/Header";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import "./style.css";

interface StageDetails {
  _id: string;
  stageId: {
    title: string;
    description: string;
  };
  startDate: string;
  endDate: string;
}

interface TaskStatus {
  _id: string;
  title: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  employees: Employee[];
  taskStatusId: string;
}

interface Employee {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

function StageDetailsProject() {
  const { stageId, projectId } = useParams<{
    stageId: string;
    projectId: string;
  }>();
  const [stageDetails, setStageDetails] = useState<StageDetails | null>(null);
  const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);
  const [tasksByStatus, setTasksByStatus] = useState<{ [key: string]: Task[] }>(
    {}
  );
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const stageResponse = await axios.get<StageDetails>(
          `http://localhost:3001/get/projects/${projectId}/stageProject/${stageId}`
        );
        setStageDetails(stageResponse.data);

        const statusResponse = await axios.get<TaskStatus[]>(
          `http://localhost:3001/get/taskStatuses/${stageId}`
        );
        setTaskStatuses(statusResponse.data);

        statusResponse.data.forEach((status) => {
          fetchTasksByStatus(status._id);
        });
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchData();
  }, [stageId]);

  const fetchTasksByStatus = async (taskStatusId: string) => {
    try {
      const response = await axios.get<Task[]>(
        `http://localhost:3001/tasks/${taskStatusId}`
      );
      setTasksByStatus((prevTasks) => ({
        ...prevTasks,
        [taskStatusId]: response.data,
      }));
    } catch (error) {
      console.error(
        "Ошибка при загрузке задач для конкретного статуса:",
        error
      );
    }
  };

  const handleDeleteStatus = async (statusId: string) => {
    // Запрос подтверждения удаления
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить этот статус задачи?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3001/delete/taskStatuses/${statusId}`
      );
      const updatedTaskStatuses = taskStatuses.filter(
        (status) => status._id !== statusId
      );
      setTaskStatuses(updatedTaskStatuses);
      setTasksByStatus((prevState) => {
        const newState = { ...prevState };
        delete newState[statusId];
        return newState;
      });
    } catch (error) {
      console.error("Ошибка при удалении статуса задачи:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${taskId}`);
      // После удаления задачи обновляем список задач
      const updatedTasks = { ...tasksByStatus };
      Object.keys(updatedTasks).forEach((key) => {
        updatedTasks[key] = updatedTasks[key].filter(
          (task) => task._id !== taskId
        );
      });
      setTasksByStatus(updatedTasks);
      // Если выбрана задача, и она удалена, закрываем боковую панель
      if (selectedTask && selectedTask._id === taskId) {
        setSelectedTask(null);
        setSidebarOpen(false);
      }
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  // Функция для открытия модального окна с информацией о задаче
  const openModal = (task: Task) => {
    setSelectedTask(task);
    setSidebarOpen(true);
  };

  // Функция для закрытия боковой панели
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleMoveTask = async (taskId: string, newTaskStatusId: string) => {
    try {
      if (!selectedTask) {
        console.error("Не выбрана задача для перемещения");
        return;
      }

      const response = await axios.post(
        `http://localhost:3001/tasks/${taskId}/move/${newTaskStatusId}`
      );
      const updatedTask = response.data;

      // Обновляем список задач
      const updatedTasks = { ...tasksByStatus };
      const oldStatusId = selectedTask.taskStatusId;
      const newStatusId = newTaskStatusId;
      if (oldStatusId && newStatusId) {
        // Удаляем задачу из предыдущего статуса
        updatedTasks[oldStatusId] = updatedTasks[oldStatusId].filter(
          (task) => task._id !== taskId
        );
        // Добавляем задачу в новый статус
        updatedTasks[newStatusId] = [...updatedTasks[newStatusId], updatedTask];
      }
      setTasksByStatus(updatedTasks);

      // Обновляем selectedTask
      setSelectedTask(updatedTask);
    } catch (error) {
      console.error("Ошибка при перемещении задачи:", error);
    }
  };

  if (!stageDetails) {
    return <p>Загрузка...</p>;
  }

  return (
    <>
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
              <p>
                <h5>Ответственный(ые):</h5>
                {selectedTask.employees
                  .map((employee: Employee) => {
                    return `${employee.lastName} ${employee.firstName} ${employee.middleName}`;
                  })
                  .join(", ")}
              </p>
              {/* Добавление элементов управления перемещением задачи */}
              <div className="containerTaskActions">
                <p>
                  <h5>Переместить задачу:</h5>
                </p>
                <select
                  onChange={(e) =>
                    handleMoveTask(selectedTask._id, e.target.value)
                  }
                  className="selectTask"
                >
                  <option value="" className="selectTask">
                    Выберите статус
                  </option>
                  {taskStatuses.map((status) => (
                    <option key={status._id} value={status._id}>
                      {status.title}
                    </option>
                  ))}
                </select>
              </div>
              {/* Удаление задачи */}
              <div className="containetDeletedTask">
                <button
                  onClick={() => handleDeleteTask(selectedTask._id)}
                  className="deletedTask"
                >
                  Удалить задачу
                </button>
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
            <select
              className={"filter"}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Все</option>
              {taskStatuses.map((status) => (
                <option key={status._id} value={status._id}>
                  {status.title}
                </option>
              ))}
            </select>
          </div>

          <div className={"containet_btn_add"}>
            <Link
              to={`/projectsPage/projects/${projectId}/stageDetails/${stageId}/addTaskStatus`}
            >
              <button className={"btn_add"}>
                Добавить статус
                <br />
                задачи
              </button>
            </Link>
          </div>
        </div>

        <div>
          <div className="detailStage">
            <h3>Подробности об этапе:</h3>
            <p>
              {stageDetails.stageId ? stageDetails.stageId.title : "Нет данных"}
            </p>
          </div>
          <div>
            <p>
              <h5>Описание: </h5>
              {stageDetails.stageId.description}
            </p>
          </div>

          <div className="btn-add-task">
            <Link
              to={`/projectsPage/projects/${projectId}/stageDetails/${stageId}/addTask`}
            >
              <div className="containet_btn_add_task">
                <button className={"btn_add_task"}>Добавить задачу</button>
              </div>
            </Link>
          </div>

          <div className="stages">
            {taskStatuses &&
              taskStatuses.map((status) => (
                <div key={status._id} className={"stage"}>
                  <div className="titleStatusStage">
                    <p>{status.title}</p>
                    <div className="div-deleted">
                      <AiOutlineDelete
                        className="deletedStage"
                        onClick={() => handleDeleteStatus(status._id)}
                      />
                    </div>
                  </div>
                  <div className="divTask">
                    {tasksByStatus[status._id]?.map((task) => (
                      <div className="task">
                        {(!filterStatus || filterStatus === status._id) && ( 
                          <div key={task._id} className="taskContent">
                            <div className="structure">
                              <div className="heading">
                                <p className="title-task">{task.title}</p>
                                <div className="BsThreeDots">
                                  <BsThreeDots
                                    onClick={() => openModal(task)}
                                  />
                                </div>
                              </div>
                              <div className="div-task-description">
                                <p className="description description-task">
                                  {task.description}
                                </p>
                              </div>
                              <div className="avatar-container">
                                {task.employees.length > 0 ? (
                                  task.employees
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
                                {task.employees.length > 3 && (
                                  <span>
                                    <div className="avatar">
                                      +{task.employees.length - 3}
                                    </div>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StageDetailsProject;
