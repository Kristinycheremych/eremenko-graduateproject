import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from '../../../../../components/header/Header';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";

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

    const handleTaskMove = (taskId: string, sourceStageId: string, targetStageId: string) => {
        axios.post(`http://localhost:3001/projects/${projectId}/integrationStage/${sourceStageId}/tasks/${taskId}/move/${targetStageId}`)
            .then(res => {
                fetchStages();
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Header />
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
                        <div className='stageContent'>
                            <p>{stage.title}</p>

                            <div className='icon_stage'>
                                <Link to={`/projectsPage/projectDetails/${projectId}/editStagePage/${stage._id}`}>
                                    <MdOutlineModeEditOutline />
                                </Link>
                                <RiDeleteBin6Line onClick={() => handleDeleteStage(stage._id)} className='deletedStage' />
                            </div>
                        </div>
                        <div className='divTask'>
                            {stage.tasks.map((task: Task) => (
                                <div key={task._id} className='task'>
                                    <div className='taskContent'>
                                        <p><h5>Название:</h5>{task.title}</p>
                                        <p><h5>Описание:</h5>{task.description}</p>
                                        <p><h5>Создатель:</h5>{task.employees.map((employee: any) => {
                                            return `${employee.lastName} ${employee.firstName} ${employee.middleName}`;
                                        }).join(', ')}</p>
                                        <div className='containerTaskActions'>
                                            <select onChange={(e) => handleTaskMove(task._id, stage._id, e.target.value)} className='selectTask'>
                                                <option value="" className='selectTask'>Переместить задачу</option>
                                                {stages.map((targetStage: Stage) => (
                                                    <option key={targetStage._id} value={targetStage._id}>{targetStage.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='containetDeletedTask'>
                                            <button onClick={() => handleDeleteTask(stage._id, task._id)} className='deletedTask'>Удалить задачу</button>
                                        </div>
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