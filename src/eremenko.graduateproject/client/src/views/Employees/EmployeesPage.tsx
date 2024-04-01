import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import './employees.css';

interface User {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  position?: {
    title: string;
  };
  isActive: boolean;
}

function EmployeesPage() {
  const [data, setData] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Функция для фильтрации сотрудников по выбранной должности и поиску по имени, фамилии и отчеству
    const filterEmployees = () => {
      let filteredData = data;

      // Фильтрация по должности
      if (filter !== '') {
        filteredData = filteredData.filter((user) => user.position && user.position.title === filter);
      }

      // Поиск по имени, фамилии и отчеству
      if (searchQuery !== '') {
        filteredData = filteredData.filter((user) => {
          const fullName = `${user.lastName} ${user.firstName} ${user.middleName}`;
          return fullName.toLowerCase().includes(searchQuery.toLowerCase());
        });
      }

      setFilteredEmployees(filteredData);
    };

    filterEmployees();
  }, [data, filter, searchQuery]);

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:3001/deleteuser/${id}`)
      .then((res) => {
        console.log(res);
        // Обновляем данные после удаления сотрудника
        setData(data.filter((user) => user._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className={'container'}>
        <div className={'container_search_filter'}>
          <div className={'div_input_search'}>
            <input
              type="text"
              className={'input_search'}
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={'div_filter_position'}>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={'filter_position'}
            >
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

        <div className="table_user">
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
              {filteredEmployees.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.lastName}</td>
                  <td>{user.firstName}</td>
                  <td>{user.middleName}</td>
                  <td>{user.position ? user.position.title : 'Нет данных'}</td>
                  <td>{user.isActive ? 'Активный' : 'Неактивный'}</td>
                  <td>
                    <div className={'icon_edit'}>
                      <Link to={`/updateEmployees/${user._id}`}>
                        <FiEdit />
                      </Link>
                    </div>

                    <div className={'icon_delete'}>
                      <AiOutlineDelete onClick={() => handleDelete(user._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EmployeesPage;