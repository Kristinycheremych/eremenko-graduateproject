import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

interface TaskStatus {
    title: string;
    stageProjectId: string;
}

const AddTaskStatus: React.FC = () => {
    const { stageId, projectId } = useParams<{ stageId: string, projectId: string }>();
    const [title, setTitle] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!stageId) {
            console.error('ID этапа не определен');
            return;
        }

        const newStatus: TaskStatus = { title, stageProjectId: stageId };

        axios.post<TaskStatus>(`http://localhost:3001/create/taskStatuses/${stageId}`, newStatus)
            .then(() => {
                setTitle('');
                navigate(`/projectsPage/projects/${projectId}/stageDetails/${stageId}`);
            })
            .catch((error) => {
                console.error('Ошибка при добавлении статуса задачи:', error);
                alert('Произошла ошибка при добавлении статуса задачи');
            });
    };

    return (
        <>
            <div className='pade'>
                <div className='wrapper'>
                    <form onSubmit={handleSubmit}>
                        <h3>Добавление статуса задачи</h3>
                        <div className='input_div'>
                            <label htmlFor="title">Название:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={'form_control'}
                                required
                            />
                        </div>
                        <div className={'action_buttons'}>
                            <Link to={`/projectsPage/projects/${projectId}/stageDetails/${stageId}`}><button className={'btn_add_cancel'}>Отменить</button></Link>
                            <button type="submit" className={'btn_add_cancel'}>Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddTaskStatus;