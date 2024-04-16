import React, { useEffect } from 'react';
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function AddStageProject() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [stageProject, setStageProject] = useState("");
    const [stageList, setStageList] = useState<any[]>([]); //Список этапов
    const { projectId } = useParams<{ projectId: string }>();
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    const [employeesList, setEmployeesList] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState(""); // Запрос для поиска сотрудников
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/get/stage')
            .then(res => {
                setStageList(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                setEmployeesList(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmitStatus = async (event: any) => {
        event.preventDefault();
        axios.post(`http://localhost:3001/create/projects/${projectId}/stageProject`, {
            startDate,
            endDate,
            stageId: stageProject, // используем stageId вместо stageProject
            employees: selectedEmployees
        })
            .then(res => {
                console.log(res);
                navigate(`/projectsPage/projectDetails/${projectId}/stages`);
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <div className={'pade'}>
                <div className={'wrapper'}>
                    <form onSubmit={handleSubmitStatus}>
                        <h3>Добавление этапа проекта</h3>

                        <div className={'input_div'}>
                            <label htmlFor="status">Статус проекта:</label>
                            <select className={'form_control'} value={stageProject} onChange={(e) => setStageProject(e.target.value)} required>
                                <option value="">Выберете статус:</option>
                                {stageList.map((stage) => {
                                    return (
                                        <option key={stage._id} value={stage._id}>
                                            {stage.title}
                                        </option>
                                    )
                                })}
                            </select>
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
                            <Link to={`/projectsPage/projectDetails/${projectId}/stages`}>
                                <button className={'btn_add_cancel'}>Отменить</button>
                            </Link>
                            <button className={'btn_add_cancel'}>Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddStageProject
