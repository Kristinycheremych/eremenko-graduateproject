/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import './style.css';

interface Position {
  _id: string;
  title: string;
}

function Position() {
  const [data, setData] = useState<Position[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPosition, setFilteredPosition] = useState<Position[]>([]);

  useEffect(() => {
    axios.get<Position[]>('http://localhost:3001/get/position')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // Поиск пользователей и фильтр по должности
    const search = data.filter(position => {
      return position.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredPosition(search);
  }, [data, searchQuery]);

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:3001/deletePositions/${id}`)
      .then(res => {
        console.log(res)
        // Обновляем данные после удаления
        setData(prevData => prevData.filter(item => item._id !== id));
        setFilteredPosition(prevFilteredPosition => prevFilteredPosition.filter(item => item._id !== id));
      })
      .catch(err => console.log(err))
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
          <Link to="./addPosition">
            <button className='add_settings'>Добавить</button>
          </Link>
        </div>
      </div>
      <div className='container_settings'>
        <div className='title'>
          <h2>Должность</h2>
        </div>

        <div className='table_user_settings'>
          <table className='table_position'>
            <thead>
              <tr>
                <th>Название</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                filteredPosition.map((position, index) => (
                  <tr key={index}>
                    <td>{position.title}</td>
                    <td>
                      <div className='icon'>
                        <div className={'icon_edit'}>
                          <Link to={`/position/updatePosition/${position._id}`}><FiEdit /></Link>
                        </div>
                        <div className={'icon_delete'}>
                          <AiOutlineDelete onClick={() => handleDelete(position._id)} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Position;