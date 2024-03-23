/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
// import icondeleted from '../../images/Union.svg';
// import iconedit from '../../images/edit-01.svg';
import './employees.css';

function EmployeesPage() {
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));

    //поиск пользователей и фильтр по должности
    const search = data.filter(data => {
      const fullName = `${data.lastName} ${data.firstName} ${data.middleName}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase()) && data.position.toLowerCase().includes(filter.toLowerCase());
    });
    setFilteredEmployees(search);

  }, [data])


  const handleDelete = (id: any) => {
    axios.delete('http://localhost:3001/deleteuser/' + id)
      .then(res => {
        console.log(res)
        navigate('/employeesPage')
      }).catch(err => console.log(err))
  }
  return (

    <>
      <div className={'container'}>
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
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className={'filter_position'}>
              <option value="">Все</option>
              <option value="Программист">Программист</option>
              <option value="Дизайнер">Дизайнер</option>
            </select>
          </div>

          <div className={'btn_add_users'}>
            <Link to="/createEmployees">
              <button className={'add_user'}>Добавить</button>
            </Link>
          </div>
        </div>

        <div className={'table_user'}>
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Должность</th>
                <th>Статус</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                filteredEmployees.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.lastName}</td>
                      <td>{user.firstName}</td>
                      <td>{user.middleName}</td>
                      <td>{user.position}</td>
                      <td>{user.isActive ? 'Активный' : 'Неактивный'}</td>
                      <td>
                        <div className={'icon_edit'}>
                          <Link to={`/updateEmployees/${user._id}`}><FiEdit /></Link>
                        </div>

                        <div className={'icon_delete'}>
                          <AiOutlineDelete onClick={() => handleDelete(user._id)}/>
                        </div>
                      </td>
                    </tr>
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

export default EmployeesPage
