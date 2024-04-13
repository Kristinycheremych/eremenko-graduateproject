/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from '../../../../../components/header/Header';
import { RiDeleteBin6Line } from "react-icons/ri";
// import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";


interface Stage {
    _id: string;
    title: string;
    tasks: Task[];
}

interface Employee {
    _id: string;
    lastName: string;
    firstName: string;
    middleName: string;
}

interface Task {
    _id: string;
    title: string;
    description: string;
    employees: Employee[];
}

const IntegrationPage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [stages, setStages] = useState<Stage[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Состояние для выбранной задачи
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false); // Состояние для открытия и закрытия боковой панели


    useEffect(() => {
        fetchStages();
    }, []);

    const fetchStages = () => {
        axios.get<Stage[]>(`http://localhost:3001/projects/${projectId}/integrationStage`)
            .then(res => {
                setStages(res.data);
            })
            .catch(err => console.log(err));
    };

    // Функция для открытия модального окна с информацией о задаче
    const openModal = (task: Task) => {
        setSelectedTask(task);
        setSidebarOpen(true); // Открываем боковую панель
    };

    // Функция для закрытия боковой панели
    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const handleDeleteStage = (stageId: string) => {
        axios.delete(`http://localhost:3001/projects/${projectId}/integrationStage/${stageId}`)
            .then(res => {
                fetchStages();
            })
            .catch(err => console.log(err));
    };

    const handleDeleteTask = (stageId: string, taskId: string) => {
        axios.delete(`http://localhost:3001/projects/${projectId}/integrationStage/${stageId}/tasks/${taskId}`)
            .then(res => {
                fetchStages();
            })
            .catch(err => console.log(err));
    };

    // Функция для перемещения задачи
    const handleTaskMove = (task: Task, targetStageId: string) => {
        if (!task || !targetStageId) {
            console.error("Invalid arguments for task move");
            return;
        }
        const sourceStageId = stages.find(stage => stage.tasks.some(t => t._id === task._id))!._id;
        axios.post(`http://localhost:3001/projects/${projectId}/integrationStage/${sourceStageId}/tasks/${task._id}/move/${targetStageId}`)
            .then(res => {
                fetchStages();
            })
            .catch(err => console.log(err));
    };
    return (
        <>
            <Header />
            <div className={`lateral-panel ${sidebarOpen ? 'open' : ''}`}>
                <IoIosCloseCircleOutline className="closebtn" onClick={closeSidebar} />
                <div className="sidebar-content">
                    {selectedTask && (
                        <div>
                            <p className='info-task'>Информация о задаче</p>
                            <p><h5>Название:</h5>{selectedTask.title}</p>
                            <p><h5>Описание:</h5>{selectedTask.description}</p>
                            <p><h5>Создатель:</h5>{selectedTask.employees.map((employee: Employee) => {
                                return `${employee.lastName} ${employee.firstName} ${employee.middleName}`;
                            }).join(', ')}</p>
                            {/* Добавление элементов управления перемещением задачи */}
                            <div className='containerTaskActions'>
                                <p><h5>Переместить задачу:</h5></p>
                                <select onChange={(e) => handleTaskMove(selectedTask, e.target.value)} className='selectTask'>
                                    <option value="" className='selectTask'>Выберите этап</option>
                                    {stages.map((targetStage: Stage) => (
                                        <option key={targetStage._id} value={targetStage._id}>{targetStage.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='containetDeletedTask'>
                                <button onClick={() => {
                                    const stageId = stages.find(stage => stage.tasks.some(task => task._id === selectedTask._id))!._id;
                                    handleDeleteTask(stageId, selectedTask._id);
                                    setStages(prevStages => prevStages.map(stage => ({
                                        ...stage,
                                        tasks: stage.tasks.filter(task => task._id !== selectedTask._id)
                                    })));
                                    setSelectedTask(null);
                                }} className='deletedTask'>Удалить задачу</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='container'>
                <div className={'container_search_filter'}>
                    <div className={'div_input_search'}>
                        <input
                            type="text"
                            className={'input_search'}
                            placeholder="Поиск"
                        />
                    </div>

                    <div className={'containet_btn_add'}>
                        <Link to={`/projectsPage/projectDetails/${projectId}/addIntegrationPage`}>
                            <button className={'btn_add_stage'}>Добавить статус</button>
                        </Link>
                    </div>
                </div>
                <div><p>Внедрение</p></div>
            </div>
            <div className='containet_btn_add_task'>
                {stages.length > 0 && (
                    <Link to={`/projectsPage/projectDetails/${projectId}/addTaskIntegrationPage/${stages[0]._id}`}>
                        <button className={'btn_add_task'}>Добавить задачу</button>
                    </Link>
                )}
            </div>
            <div className={'stages'}>
                {stages.map((stage) => (
                    <div key={stage._id} className={'stage'}>

                        <div className='titleStatusStage'><p>{stage.title}</p>
                            <RiDeleteBin6Line onClick={() => handleDeleteStage(stage._id)} className='deletedStage' />
                        </div>

                        <div className='divTask'>
                            {stage.tasks.map((task: Task) => (
                                <div key={task._id} className='task' onClick={() => openModal(task)}>
                                    <div className='taskContent'>
                                        <p><h5>Название:</h5>{task.title}</p>
                                        <p className='taskDescription'><h5>Описание:</h5>{task.description}</p>
                                        <p><h5>Создатель:</h5>{task.employees.map((employee: any) => {
                                            return `${employee.lastName} ${employee.firstName} ${employee.middleName}`;
                                        }).join(', ')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default IntegrationPage;