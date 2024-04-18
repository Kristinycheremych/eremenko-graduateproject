/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

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
            <Link to="./addPosition">
              <button className='btn_add'>Добавить</button>
            </Link>
          </div>
        </div>
        <div className='container_settings'>
          <div className='title'>
            <h2>Должность</h2>
          </div>

          <div className='table_user_settings'>
            <table className='table_position td-position'>
              <thead>
                <tr>
                  <th >Название</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredPosition.map((position, index) => (
                    <tr key={index}>
                      <td >{position.title}</td>
                      <td className='td-icon'>
                        <div className={'icon_edit'}>
                          <Link to={`/position/updatePosition/${position._id}`}><FiEdit /></Link>
                        </div>
                      </td>
                      <td className='td-icon'>
                        <div className={'icon_delete'}>
                          <AiOutlineDelete onClick={() => handleDelete(position._id)} />
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Position;