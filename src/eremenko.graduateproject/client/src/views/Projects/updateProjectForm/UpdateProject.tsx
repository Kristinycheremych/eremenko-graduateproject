import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateProject() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");
    const [employees, setEmployees] = useState("");
    const [statusList, setStatusList] = useState<any[]>([]); // Массив статусов проектов
    const [employeesList, setEmployeesList] = useState<any[]>([]); // Массив статусов проектов

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/getProjects/" + id);
                console.log(response);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setStartDate(response.data.startDate);
                setEndDate(response.data.endDate);
                setStatus(response.data.status.title); // Получаем название статуса проекта
                setEmployees(response.data.employees.lastName);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
        // Получаем список статусов проектов
        axios.get('http://localhost:3001/get/projectStatuses')
            .then(res => {
                setStatusList(res.data);
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:3001/')
            .then(res => {
                setEmployeesList(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleUpdate = (event: any) => {
        event.preventDefault();
        axios.put('http://localhost:3001/updateProject/' + id, { title, description, startDate, endDate, status, employees })
            .then(res => {
                console.log(res);
                navigate('/projectsPage');
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <div className={'pade'}>
                <div className={'wrapper'}>
                    <form onSubmit={handleUpdate}>
                        <h3>Изменение проекта</h3>

                        <div className={'input_div'}>
                            <label htmlFor="title">Название</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Название"
                                    className={'form_control'}
                                    onChange={(e: any) => setTitle(e.target.value)}
                                    value={title}
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
                                />
                            </div>
                        </div>

                        <div className={'input_div'}>
                            <label htmlFor="status">Статус</label>
                            <select className='form_control' value={status}
                                onChange={(e) => setStatus(e.target.value)}>
                                <option value={""}>Выберите статус:</option>
                                {
                                    statusList.map((statusItem) => {
                                        return (
                                            <option key={statusItem._id} value={statusItem.title}>
                                                {statusItem.title}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className={'input_div'}>
                            <label htmlFor="status">Статус</label>
                            <select className='form_control' value={employees}
                                onChange={(e) => setEmployees(e.target.value)}>
                                <option value={""}>Выберите ответсвенного:</option>
                                {
                                    employeesList.map((employeesItem) => {
                                        return (
                                            <option key={employeesItem._id} value={employeesItem._id}>
                                                 {employeesItem.lastName && employeesItem.firstName && employeesItem.middleName ? `${employeesItem.lastName} ${employeesItem.firstName} ${employeesItem.middleName}` : "Недостаточно данных"}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className={'action_buttons'}>
                            <Link to={"/projectsPage"}><button className={'btn_add_cancel'}>Отменить</button></Link>
                            <button className={'btn_add_cancel'}>Изменить</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProject
