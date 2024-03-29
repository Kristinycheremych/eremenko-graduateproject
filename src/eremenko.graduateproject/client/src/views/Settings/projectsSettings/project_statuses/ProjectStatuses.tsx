/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import './projectStatusesStyle.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";

function ProjectStatuses() {
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/get/projectStatuses')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
    //поиск пользователей и фильтр по должности
    const search = data.filter(data => {
      const fullName = `${data.title} ${data.description}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredEmployees(search);

  }, [data]);

  const handleDelete = (id: any) => {
    axios.delete('http://localhost:3001/deleteProjectStatuses/' + id)
      .then(res => {
        console.log(res)
        navigate('/projectStatuses')
      }).catch(err => console.log(err))
  }

  return (
    <>
      <div className='containerSettings'>
        <div className='div_input_search_settings'>
          <input
            type='text'
            className='input_search_settings'
            placeholder='Поиск'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className='btn_add_settings'>
          <Link to="./addProjectStatuses">
            <button className='add_settings'>Добавить</button>
          </Link>
        </div>
      </div>

      <div className='container_settings'>
        <div className='title'>
          <h2>Статусы проекта</h2>
        </div>

        <div className='table_user_settings'>
          <table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Описание</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                filteredEmployees.map((projectStatuses, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td className='text_td'>{projectStatuses.title}</td>
                        <td className='text_td'>{projectStatuses.description}</td>
                        <td>
                          <div className='icon'>
                            <div className={'icon_edit'}>
                              <Link to={`/updateProjectStatuses/${projectStatuses._id}`}><FiEdit /></Link>
                            </div>
                            <div className={'icon_delete'}>
                              <AiOutlineDelete onClick={() => handleDelete(projectStatuses._id)} />
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
      </div>
    </>
  )
}

export default ProjectStatuses