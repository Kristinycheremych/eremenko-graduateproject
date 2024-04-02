import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import './style.css';

interface Project {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: {
    title: string;
  };
  employees: {
    lastName: string;
    firstName: string;
    middleName: string;
  }[];
}

function ProjectsPage() {
  const [data, setData] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filteredProject, setFilteredProject] = useState<Project[]>([]);

  useEffect(() => {
    axios.get<Project[]>('http://localhost:3001/get/projects')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // Функция для фильтрации проектов по статусу
    const filterProjects = () => {
      let filteredData = data;

      // Фильтрация по статусу
      if (filterStatus !== '') {
        filteredData = filteredData.filter((project) => project.status.title === filterStatus);
      }

      // Поиск по названию проекта
      if (searchQuery !== '') {
        filteredData = filteredData.filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }

      setFilteredProject(filteredData);
    };

    filterProjects();
  }, [data, filterStatus, searchQuery]);

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3001/deleteProject/${id}`)
      .then(res => {
        console.log(res);
        // Обновляем данные проектов после удаления
        setData(data.filter(project => project._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className={'container_search_filter'}>
        <div className={'div_input_search'}>
          <input
            type='text'
            className={'input_search'}
            placeholder='Поиск'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={'div_filter_project'}>
          <select
            className={'filter_project'}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Все</option>
            <option value="Новый">Новый</option>
            <option value="В ожидании">В ожидании</option>
            <option value="В работе">В работе</option>
            <option value="Выполнено">Выполнено</option>
            <option value="Отменено">Отменено</option>
          </select>
        </div>

        <div className={'btn_add_users'}>
          <Link to="./addProjectForm">
            <button className={'add_user'}>Добавить</button>
          </Link>
        </div>
      </div>
      <div className='table_user_settings'>
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Описание</th>
              <th>Дата начала</th>
              <th>Дата окончания</th>
              <th>Статус</th>
              <th>Ответственный</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              filteredProject.map((project) => {
                return (
                  <tr key={project._id}>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                    <td>{new Date(project.startDate).toLocaleDateString()}</td> {/* Вывод даты начала без времени */}
                    <td>{new Date(project.endDate).toLocaleDateString()}</td> {/* Вывод даты окончания без времени */}
                    <td>{project.status.title}</td>
                    <td>
                      {project.employees.map((employee: any) => {
                        return `${employee.lastName} ${employee.firstName} ${employee.middleName}`;
                      }).join(', ')}
                    </td>
                    <td className='link_table_progect'><Link to={`/projectsPage/projectDetails/${project._id}`}>Подробнее...</Link></td>
                    <td>
                      <div className='icon'>
                        <Link to={`/projectsPage/updateProject/${project._id}`} className={'icon_edit'}><FiEdit /></Link>
                        <div className={'icon_delete'}>
                          <AiOutlineDelete onClick={() => handleDelete(project._id)} />
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div >
    </>
  )
}

export default ProjectsPage;