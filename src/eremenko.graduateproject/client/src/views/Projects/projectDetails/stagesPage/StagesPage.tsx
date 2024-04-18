/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import Header from '../../../../components/header/Header';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';

interface Project {
    _id: string;
    title: string;
    description: string;
}

interface Employee {
    _id: string;
    lastName: string;
    firstName: string;
    middleName: string;
}

interface Stage {
    _id: string;
    startDate: string;
    endDate: string;
    stageId: {
        title: string;
        description: string;
    };
    employees: Employee[];
}

function StagesPage() {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [stages, setStages] = useState<Stage[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        fetchStages();
    }, []);

    async function fetchStages() {
        try {
            const response: AxiosResponse<Stage[]> = await axios.get(`http://localhost:3001/get/projects/${projectId}/stageProject`);
            setStages(response.data);
        } catch (error) {
            console.error('Ошибка извлечения этапов:', error);
        }
    }

    useEffect(() => {
        axios.get<Project>(`http://localhost:3001/getProjects/${projectId}`)
            .then(response => {
                setProject(response.data);
            })
            .catch(error => {
                console.error('Ошибка при загрузке проекта:', error);
            });
    }, [projectId]);

    if (!project) {
        return <p>Загрузка...</p>;
    }

    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:3001/delete/projects/${projectId}/stageProject/${id}`)
            .then(res => {
                console.log(res);
                // Обновляем данные проектов после удаления
                setStages(stages.filter(stageProject => stageProject._id !== id));
            })
            .catch(err => console.log(err));
    };

    const filteredStages = stages.filter(stage => {
        // Если поисковой запрос пуст, отображаем все этапы
        if (!searchQuery.trim()) {
            return true;
        }
        // Фильтрация по stageId
        return stage.stageId.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className={'containet_btn_add'}>
                        <Link to={`/projectsPage/projects/${projectId}/addStageProject`}>
                            <button className={'btn_add'}>Добавить</button>
                        </Link>
                    </div>
                </div>
                <div className="table_user">
                    <table>
                        <thead>
                            <tr>
                                <th>Этап</th>
                                <th>Описание</th>
                                <th>Дата начала</th>
                                <th>Планируемая дата окончания</th>
                                <th>Ответственный</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStages.map(stage => (
                                <tr key={stage._id}>
                                    <td>{stage.stageId ? stage.stageId.title : 'Нет данных'}</td>
                                    
                                    <td><p className='taskDescription'>{stage.stageId.description}</p></td>
                                    <td>{new Date(stage.startDate).toLocaleDateString()}</td> {/* Вывод даты начала без времени */}
                                    <td>{new Date(stage.endDate).toLocaleDateString()}</td> {/* Вывод даты окончания без времени */}
                                    <td>
                                        {stage.employees.map((employee: any) => {
                                            return `${employee.lastName} ${employee.firstName} ${employee.middleName}`;
                                        }).join(', ')}
                                    </td>
                                    <td>
                                        <Link to={`/projectsPage/projectDetails/${projectId}/stages/stageDetails/${stage._id}`}>
                                            Подробнее...
                                        </Link>
                                    </td>
                                    <td className='td-icon'>
                                        <div className={'icon_edit'}>
                                            <Link to={`/projectsPage/projects/${projectId}/addStageProject/${stage._id}`}>
                                                <FiEdit />
                                            </Link>
                                        </div>
                                    </td>
                                    <td className='td-icon'>
                                        <div className={'icon_delete'}>
                                            <AiOutlineDelete onClick={() => handleDelete(stage._id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default StagesPage;