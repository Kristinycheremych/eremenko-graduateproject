/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

interface Stage {
    _id: string;
    title: string;
    description: string;
}


function StagePage() {
    const [data, setData] = useState<Stage[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredStage, setFilteredStage] = useState<Stage[]>([]);

    useEffect(() => {
        axios.get<Stage[]>('http://localhost:3001/get/stage')
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        // Поиск пользователей и фильтр по должности
        const search = data.filter(stage => {
            return stage.title.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredStage(search);
    }, [data, searchQuery]);

    const handleDelete = (id: string) => {
        axios.delete(`http://localhost:3001/delete/stage/${id}`)
            .then(res => {
                console.log(res)
                // Обновляем данные после удаления
                setData(prevData => prevData.filter(item => item._id !== id));
                setFilteredStage(prevFilteredStage => prevFilteredStage.filter(item => item._id !== id));
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
                    <Link to="./addStage">
                        <button className='add_settings'>Добавить</button>
                    </Link>
                </div>
            </div>
            <div className='container_settings'>
                <div className='title'>
                    <h2>Этапы</h2>
                </div>

                <div className='table_user_settings'>
                    <table className='table_position'>
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
                                filteredStage.map((stage, index) => (
                                    <tr key={index}>
                                        <td>{stage.title}</td>
                                        <td>{stage.description}</td>
                                        <td>
                                            <div className={'icon_edit'}>
                                                <Link to={`/stagePage/updateStage/${stage._id}`}><FiEdit /></Link>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={'icon_delete'}>
                                                <AiOutlineDelete onClick={() => handleDelete(stage._id)} />
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

export default StagePage
