import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from '../../../../../components/header/Header';
import { RiDeleteBin6Line } from "react-icons/ri";
import './styleStageDetailsProgect.css'

interface StageDetails {
    _id: string;
    stageId: {
        title: string;
    };
    description: string;
    startDate: string;
    endDate: string;
}

interface TaskStatus {
    _id: string;
    title: string;
    description: string;
}

function StageDetailsProject() {
    const { stageId } = useParams<{ stageId: string }>();
    const { projectId } = useParams<{ projectId: string }>();

    const [stageDetails, setStageDetails] = useState<StageDetails | null>(null);
    const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);

    useEffect(() => {
        const fetchStageDetails = async () => {
            try {
                const response = await axios.get<StageDetails>(`http://localhost:3001/get/stageDetails/${stageId}`);
                setStageDetails(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке подробностей об этапе:', error);
            }
        };

        fetchStageDetails();
    }, [stageId]);

    useEffect(() => {
        const fetchTaskStatuses = async () => {
            try {
                const response = await axios.get<TaskStatus[]>(`http://localhost:3001/get/taskStatuses/${stageId}`);
                setTaskStatuses(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке статусов задач:', error);
            }
        };

        fetchTaskStatuses();
    }, [stageId]);

    const handleDeleteStatus = async (statusId: string) => {
        try {
            await axios.delete(`http://localhost:3001/delete/taskStatuses/${statusId}`);
            // После удаления обновляем список статусов задач
            const updatedTaskStatuses = taskStatuses.filter(status => status._id !== statusId);
            setTaskStatuses(updatedTaskStatuses);
        } catch (error) {
            console.error('Ошибка при удалении статуса задачи:', error);
        }
    };

    if (!stageDetails) {
        return <p>Загрузка...</p>;
    }

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
                        <Link to={`/projectsPage/projects/${projectId}/stageDetails/${stageId}/addTaskStatus`}>
                            <button className={'btn_add'}>Добавить статус <br />задачи</button>
                        </Link>
                    </div>
                </div>

                <div>
                    <div className='detailStage'>
                        <h3>Подробности об этапе:</h3>
                        <p>{stageDetails.stageId ? stageDetails.stageId.title : 'Нет данных'}</p>
                    </div>

                    <div className='stages'>
                        {taskStatuses && taskStatuses.map((status) => (
                            <div key={status._id} className={'stage'}>
                                <div className='titleStatusStage'>
                                    <p>{status.title}</p>
                                    <RiDeleteBin6Line className='deletedStage' onClick={() => handleDeleteStatus(status._id)} />
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