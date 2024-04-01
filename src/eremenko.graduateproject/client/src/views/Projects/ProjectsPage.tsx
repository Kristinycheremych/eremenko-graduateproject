/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

function ProjectsPage() {
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProject, setFilteredProject] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/get/projects')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
    //поиск пользователей и фильтр по должности
    const search = data.filter(data => {
      const fullName = `${data.title}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredProject(search);

  }, [data]);

  const handleDelete = (id: any) => {
    axios.delete('http://localhost:3001/deleteProject/' + id)
      .then(res => {
        console.log(res)
        navigate('/projectsPage')
      }).catch(err => console.log(err))
  }

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

        <div className={'div_filter_position'}>
          <select className={'filter_position'}>
            <option value="">Новый</option>
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
            </tr>
          </thead>
          <tbody>
            {
              filteredProject.map((project) => {
                return (
                  <>
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
                      <td>
                        <div className='icon'>
                          <Link to={`/projectsPage/updateProject/${project._id}`}><FiEdit /></Link>
                          <div className={'icon_delete'}>
                            <AiOutlineDelete onClick={() => handleDelete(project._id)} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ProjectsPage
