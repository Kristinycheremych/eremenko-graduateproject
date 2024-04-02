import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './projectDetailsStyle.css';
import { AiFillCaretDown } from "react-icons/ai";

interface Project {
    _id: string;
    title: string;
    description: string;
}

function ProjectDetails() {
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
                    <li><Link to={''}>Документы</Link></li>
                    <li><Link to={''}>Участники</Link></li>
                    <li><Link to={''}>Этапы</Link></li>
                    <li><Link to={''}>Задачи</Link></li>
                    <li className="submenu">
                        <Link to={''}>Доски <AiFillCaretDown className='iconBoards'/></Link>
                        <ul className="sub-menu">
                            <li><Link to={''}>Техническое задание</Link></li>
                            <li><Link to={''}>Дизайн</Link></li>
                            <li><Link to={''}>Разработка программного продукта</Link></li>
                            <li><Link to={''}>Внедрение</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className='div_title'>
                <p>{project.title}</p>
            </div>
            <div className='div_description'>
                <p className='heading_description'>Описание</p>
                <p className='text_description'>{project.description}</p>
            </div>
        </div>
    );
}

export default ProjectDetails;