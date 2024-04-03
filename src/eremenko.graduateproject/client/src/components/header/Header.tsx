import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { AiFillCaretDown } from "react-icons/ai";
import './styleHeader.css';

interface Project {
    _id: string;
    title: string;
    description: string;
}

function Header() {
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
        <div className='container'>
            <div className="menu">
                <ul>
                    {/* Добавляем пути к другим страницам */}
                    <li><Link to={''}>Документы</Link></li>
                    <li><Link to={`/projectsPage/projectDetails/${projectId}/participants`}>Участники</Link></li>
                    <li><Link to={`/projectsPage/projectDetails/${projectId}/stages`}>Этапы</Link></li>
                    <li><Link to={`/projectsPage/projectDetails/${projectId}/tasks`}>Задачи</Link></li>
                    <li className="submenu">
                        <Link to={''}>Доски <AiFillCaretDown className='iconBoards' /></Link>
                        <ul className="sub-menu">
                            <li><Link to={`/projectsPage/projectDetails/${projectId}/boards/technicalSpecification`}>Техническое задание</Link></li>
                            <li><Link to={`/projectsPage/projectDetails/${projectId}/boards/design`}>Дизайн</Link></li>
                            <li><Link to={`/projectsPage/projectDetails/${projectId}/boards/softwareProductDevelopment`}>Разработка программного продукта</Link></li>
                            <li><Link to={`/projectsPage/projectDetails/${projectId}/boards/integration`}>Внедрение</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className='div_title'>
                <p>{project.title}</p>
            </div>
        </div>
    );
}

export default Header;