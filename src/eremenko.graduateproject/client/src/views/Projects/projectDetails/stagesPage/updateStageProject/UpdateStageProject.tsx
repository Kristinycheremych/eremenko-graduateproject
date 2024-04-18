/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

interface StageProject {
    _id: string;
    description: string;
    startDate: string;
    endDate: string;
    stageId: {
        _id: string;
        title: string;
    };
    employees: {
        _id: string;
        lastName: string;
        firstName: string;
        middleName: string;
    }[];
}

function UpdateStageProject() {
    const { id } = useParams();
    const { projectId } = useParams<{ projectId: string }>();
    const [description, setDescription] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [stageId, setStageId] = useState<string>("");
    const [employeeId, setEmployeeIds] = useState<string[]>([]);
    const [stageList, setStageList] = useState<any[]>([]);
    const [employeesList, setEmployeesList] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<StageProject>(`http://localhost:3001/get/projects/${projectId}/stageProject/${id}`);
                const stageProjectData = response.data;
                setDescription(stageProjectData.description)
                setStartDate(new Date(stageProjectData.startDate).toISOString().split('T')[0]);
                setEndDate(new Date(stageProjectData.endDate).toISOString().split('T')[0]);
                setStageId(stageProjectData.stageId._id);
                setEmployeeIds(stageProjectData.employees.map(employee => employee._id));
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();

        axios.get('http://localhost:3001/get/stage')
            .then(res => {
                setStageList(res.data);
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:3001/')
            .then(res => {
                setEmployeesList(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    // Фильтрация списка сотрудников по введенному запросу
    const filteredEmployees = employeesList.filter(employee =>
        `${employee.lastName} ${employee.firstName} ${employee.middleName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.put(`http://localhost:3001/update/projects/${projectId}/stageProject/${id}`, {
            description,
            startDate,
            endDate,
            stageId: stageId,
            employees: employeeId
        })
            .then(res => {
                console.log(res);
                navigate(`/projectsPage/projectDetails/${projectId}/stages`);
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className={'pade'}>
                <div className={'wrapper'}>
                    <form onSubmit={handleUpdate}>
                        <div className='title-add'>
                            <h3>Изменение этапа проекта</h3>
                        </div>
                        <div className='container-data-form'>
                            <div className={'input_div'}>
                                <label htmlFor="status">Статус</label>
                                <div>
                                    <select className='form_control' value={stageId}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStageId(e.target.value)}>
                                        <option value={""}>Выберите статус:</option>
                                        {
                                            stageList.map((stageItem) => {
                                                return (
                                                    <option key={stageItem._id} value={stageItem._id}>
                                                        {stageItem.title}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>



                            <div className={'input_div'}>
                                <label htmlFor="startDate">Дата начала</label>
                                <div>
                                    <input
                                        type="date"
                                        className={'form_control'}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
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
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                                        value={endDate}
                                    />
                                </div>
                            </div>

                            <div className={'input_div'}>
                                <label htmlFor="status">Ответственные</label>
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
                                    className='form_control_employees'
                                    multiple // Разрешить множественный выбор
                                    value={employeeId}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEmployeeIds(Array.from(e.target.selectedOptions, option => option.value))}>
                                    {
                                        filteredEmployees.map((employeeItem) => {
                                            return (
                                                <option key={employeeItem._id} value={employeeItem._id}>
                                                    {`${employeeItem.lastName} ${employeeItem.firstName} ${employeeItem.middleName}`}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className={'action_buttons'}>
                            <div className='buttons'>
                                <div>
                                    <Link to={`/projectsPage/projectDetails/${projectId}/stages`}><button className={'button_add_cancel'}>Отменить</button></Link>
                                </div>
                                <div>
                                    <button className={'button_add'}>Изменить</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateStageProject
