import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const AddTaskPage: React.FC = () => {
    const { projectId, stageId } = useParams<{ projectId: string; stageId: string }>();
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [newTaskDescription, setNewTaskDescription] = useState<string>('');
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]); // Массив выбранных сотрудников
    const [searchQuery, setSearchQuery] = useState(""); // Запрос для поиска сотрудников
    const [employeesList, setEmployeesList] = useState<any[]>([]);

    const handleAddTask = async () => {
        try {
            await axios.post(`http://localhost:3001/projects/${projectId}/designStages/${stageId}/tasks`,
                {
                    title: newTaskTitle,
                    description: newTaskDescription,
                    employees: selectedEmployees
                });
            // После добавления задачи перенаправляем пользователя обратно на страницу этапа
            window.location.href = `/projectsPage/projectDetails/${projectId}/boards/design`;
        } catch (error) {
            console.error('Ошибка при добавлении задачи:', error);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                setEmployeesList(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>

            <div className={'pade'}>
                <div className={'wrapper'}>
                    <form onSubmit={handleAddTask}>
                        <h3>Добавление задачи</h3>
                        <div className={'input_div'}>
                            <label htmlFor="title">Название</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Название"
                                    className={'form_control'}
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className={'input_div'}>
                            <label htmlFor="title">Описание</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Описание"
                                    className={'form_control'}
                                    value={newTaskDescription}
                                    onChange={(e) => setNewTaskDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {/* Выбор ответственного сотрудника */}
                        <div className={'input_div'}>
                            <label htmlFor="selectedEmployees">Ответственные:</label>
                            {/* Поиск сотрудников */}
                            <div className={'input_div'}>
                                <input
                                    type="text"
                                    className={'form_control'}
                                    placeholder="Поиск по ФИО"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select
                                className={'form_control_employees'}
                                multiple
                                value={selectedEmployees}
                                onChange={(e) => setSelectedEmployees(Array.from(e.target.selectedOptions, option => option.value))}
                                required
                            >
                                {employeesList
                                    .filter(employee =>
                                        `${employee.lastName} ${employee.firstName} ${employee.middleName}`
                                            .toLowerCase()
                                            .includes(searchQuery.toLowerCase())
                                    )
                                    .map((employee) => (
                                        <option key={employee._id} value={employee._id}>
                                            {`${employee.lastName} ${employee.firstName} ${employee.middleName}`}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={'action_buttons'}>
                            <Link to={`/projectsPage/projectDetails/${projectId}/boards/design`}><button className={'btn_add_cancel'}>Отменить</button></Link>
                            <button className={'btn_add_cancel'}>Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default AddTaskPage;