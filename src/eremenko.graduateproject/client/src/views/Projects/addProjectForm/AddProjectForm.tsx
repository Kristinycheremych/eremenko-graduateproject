import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddProjectForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");
    const [employees, setEmployees] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [employeesList, setEmployeesList] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/get/projectStatuses')
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/') // Предположим, что здесь эндпоинт для получения сотрудников
            .then(res => {
                setEmployeesList(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmitProjects = async (event: any) => {
        event.preventDefault();
        axios.post('http://localhost:3001/createProject', {
            title,
            description,
            startDate,
            endDate,
            status,
            employees
        })
            .then(res => {
                console.log(res);
                navigate('/projectsPage');
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <div className={'pade'}>
                <div className={'wrapper'}>
                    <form onSubmit={handleSubmitProjects}>
                        <h3>Добавление проекта</h3>
                        <div className={'input_div'}>
                            <label htmlFor="title">Название</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Название"
                                    className={'form_control'}
                                    onChange={(e: any) => setTitle(e.target.value)}
                                    value={title}
                                    required
                                />
                            </div>
                        </div>
                        <div className={'input_div'}>
                            <label htmlFor="description">Описание</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Описание"
                                    className={'form_control'}
                                    onChange={(e: any) => setDescription(e.target.value)}
                                    value={description}
                                    required
                                />
                            </div>
                        </div>
                        <div className={'input_div'}>
                            <label htmlFor="startDate">Дата начала</label>
                            <div>
                                <input
                                    type="date"
                                    className={'form_control'}
                                    onChange={(e: any) => setStartDate(e.target.value)}
                                    value={startDate}
                                    required
                                />
                            </div>
                        </div>
                        <div className={'input_div'}>
                            <label htmlFor="endDate">Планируемая дата окончания</label>
                            <div>
                                <input
                                    type="date"
                                    className={'form_control'}
                                    onChange={(e: any) => setEndDate(e.target.value)}
                                    value={endDate}
                                    required
                                />
                            </div>
                        </div>
                        <div className={'input_div'}>
                            <label htmlFor="status">Статус проекта:</label>
                            <select className={'form_control'} value={status} onChange={(e) => setStatus(e.target.value)} required>
                                <option value="">Выберете статус:</option>
                                {data.map((projectStatuses) => {
                                    return (
                                        <option key={projectStatuses._id} value={projectStatuses._id}>
                                            {projectStatuses.title}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className={'input_div'}>
                            <label htmlFor="employees">Ответственный:</label>
                            <select className={'form_control'} value={employees} onChange={(e) => setEmployees(e.target.value)} required>
                                <option value="">Выберите ответственного:</option>
                                {employeesList.map((employee) => {
                                    return (
                                        <option key={employee._id} value={employee._id}>
                                            {employee.lastName && employee.firstName && employee.middleName ? `${employee.lastName} ${employee.firstName} ${employee.middleName}` : "Недостаточно данных"}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className={'action_buttons'}>
                            <Link to={"/projectsPage"}><button className={'btn_add_cancel'}>Отменить</button></Link>
                            <button className={'btn_add_cancel'}>Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddProjectForm;