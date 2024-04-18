/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

function EmployeeStatus() {
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployeeStatus, setFilteredEmployeeStatus] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/get/employeeStatus')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
    //поиск пользователей и фильтр по должности
    const search = data.filter(data => {
      const fullName = `${data.title} ${data.description}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredEmployeeStatus(search);

  }, [data]);

  const handleDelete = (id: any) => {
    axios.delete('http://localhost:3001/deleteEmployeeStatus/' + id)
      .then(res => {
        console.log(res)
        navigate('/employeeStatus')
      }).catch(err => console.log(err))
  }

  return (
    <>
      <div className='container'>
        <div className='container_search_filter'>
          <div className='div_input_search'>
            <input
              type='text'
              className='input_search'
              placeholder='Поиск'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className='containet_btn_add'>
            <Link to="./addEmployeeStatus">
              <button className='btn_add'>Добавить</button>
            </Link>
          </div>
        </div>
        <div className='container_settings'>
          <div className='title'>
            <h2>Статус сотрудника</h2>
          </div>

          <div className='table_user_settings'>
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Описание</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredEmployeeStatus.map((employeeStatus, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td className='text_td'>{employeeStatus.title}</td>
                          <td className='text_td'>{employeeStatus.description}</td>
                          <td className='td-icon'>
                            <div className={'icon_edit'}>
                              <Link to={`/employeeStatus/updateEmployeeStatus/${employeeStatus._id}`}><FiEdit /></Link>
                            </div>
                          </td>
                          <td className='td-icon'>
                            <div className={'icon_delete'}>
                              <AiOutlineDelete onClick={() => handleDelete(employeeStatus._id)} />
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
      </div>
    </>
  )
}

export default EmployeeStatus
