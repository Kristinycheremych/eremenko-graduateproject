/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import './style.css';

function Position() {
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosition, setFilteredPosition] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/get/position')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
    //поиск пользователей и фильтр по должности
    const search = data.filter(data => {
      const fullName = `${data.title}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredPosition(search);

  }, [data]);

  const handleDelete = (id: any) => {
    axios.delete('http://localhost:3001/deletePositions/' + id)
      .then(res => {
        console.log(res)
        navigate('/position')
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
                filteredPosition.map((position, index) => {
                  return (
                    <>
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

export default Position
