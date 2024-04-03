import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../../components/header/Header';

interface Project {
    _id: string;
    title: string;
    description: string;
}

function StagesPage() {
    const { projectId } = useParams<{ projectId: string }>();
    const [project, setProject] = useState<Project | null>(null);

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

                    <div className={'btn_add_users'}>
                        <Link to={''}>
                            <button className={'add_user'}>Добавить</button>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default StagesPage
