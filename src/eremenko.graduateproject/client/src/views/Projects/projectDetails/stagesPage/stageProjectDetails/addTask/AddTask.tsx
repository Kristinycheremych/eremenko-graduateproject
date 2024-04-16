import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

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
}

const AddTaskPage: React.FC = () => {
    const { stageId, projectId } = useParams<{ stageId: string, projectId: string }>();

    const [newTaskDescription, setNewTaskDescription] = useState<string>('');
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]); // Массив выбранных сотрудников
    const [searchQuery, setSearchQuery] = useState(""); // Запрос для поиска сотрудников
    const [employeesList, setEmployeesList] = useState<any[]>([]);


    const navigate = useNavigate();

    const [stageDetails, setStageDetails] = useState<StageDetails | null>(null);
    const [taskStatuses, setTaskStatuses] = useState<TaskStatus[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                setEmployeesList(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stageResponse = await axios.get<StageDetails>(`http://localhost:3001/get/stageDetails/${stageId}`);
                setStageDetails(stageResponse.data);

                const statusResponse = await axios.get<TaskStatus[]>(`http://localhost:3001/get/taskStatuses/${stageId}`);
                setTaskStatuses(statusResponse.data);

                if (statusResponse.data.length > 0) {
                    setSelectedStatus(statusResponse.data[0]._id);
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchData();
    }, [stageId]);

    const handleAddTask = async () => {
        try {
            const newTaskData = { title, description, stageProjectId: stageId, employees:selectedEmployees };
            await axios.post(`http://localhost:3001/tasks/${selectedStatus}`, newTaskData);
            navigate(`/projectsPage/projectDetails/${projectId}/stages/stageDetails/${stageId}`);
        } catch (error) {
            console.error('Ошибка при добавлении задачи:', error);
        }
    };

    return (
        <>
            <div className='pade'>
                <div className='wrapper'>
                    <h2>Добавить задачу</h2>
                    <div className='addTaskForm'>
                        <div className={'input_div'}>
                            <label>Название задачи:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={'form_control'}
                                required
                            />
                        </div>
                        <div className={'input_div'}>
                            <label>Описание задачи:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={'form_control'}
                                required
                            ></textarea>
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
                    </div>
                    <div className={'action_buttons'}>
                        <Link to={`/projectsPage/projectDetails/${projectId}/stages/stageDetails/${stageId}`}><button className={'btn_add_cancel'}>Отменить</button></Link>
                        <button className={'btn_add_cancel'} onClick={handleAddTask}>Добавить</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTaskPage;