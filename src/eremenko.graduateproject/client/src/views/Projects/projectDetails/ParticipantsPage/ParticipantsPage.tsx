import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import Header from '../../../../components/header/Header';

interface Employee {
    _id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    isActive: boolean;
    position: Position;
}

interface Position {
    _id: string;
    title: string;
}

interface Project {
    _id: string;
    title: string;
    description: string;
    employees: Employee[];
}

function ParticipantsPage() {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState(""); //Состояние для строки поиска
    const [selectedPosition, setSelectedPosition] = useState<string>(""); // Состояние для выбранной должности

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

    const handleDeleteEmployee = (employeeId: string) => {
        axios.delete(`http://localhost:3001/deleteEmployee/${projectId}/${employeeId}`)
            .then(response => {
                // Обновляем список сотрудников после удаления
                setProject(prevProject => {
                    if (prevProject) {
                        const updatedEmployees = prevProject.employees.filter(employee => employee._id !== employeeId);
                        return { ...prevProject, employees: updatedEmployees };
                    }
                    return prevProject;
                });
            })
            .catch(error => {
                console.error('Ошибка при удалении сотрудника:', error);
            });
    };

    //Реализация логики поиска
    const filteredEmployees = project.employees.filter((employee) =>
        `${employee.lastName} ${employee.firstName} ${employee.middleName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Фильтрация по выбранной должности
    const filteredByPosition = selectedPosition
        ? filteredEmployees.filter(employee => employee.position.title.toLowerCase() === selectedPosition.toLowerCase())
        : filteredEmployees;

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
                            value={searchQuery} // Привязка строки поиска к состоянию
                            onChange={(e) => setSearchQuery(e.target.value)} // Обработчик изменения строки поиска
                        />
                    </div>

                    <div className={'div_filter_position'}>
                        <select
                            className={'filter_position'}
                            value={selectedPosition}
                            onChange={(e) => setSelectedPosition(e.target.value)}>
                            <option value="">Все</option>
                            <option value="Программист">Программист</option>
                            <option value="Дизайнер">Дизайнер</option>
                        </select>
                    </div>
                </div>

                <div className="table_user">
                    <table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Фамилия</th>
                                <th>Имя</th>
                                <th>Отчество</th>
                                <th>Должность</th>
                                <th>Статус</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredByPosition.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.middleName}</td>
                                    <td>{user.position ? user.position.title : 'Нет данных'}</td>
                                    <td>
                                        <div className={user.isActive ? 'active-status' : 'inactive-status'}>
                                            {user.isActive ? 'Активный' : 'Неактивный'}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={'icon_delete'} onClick={() => handleDeleteEmployee(user._id)}>
                                            <AiOutlineDelete />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ParticipantsPage;