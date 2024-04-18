import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

interface Position {
    _id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    isActive: boolean;
    position: {
        _id: string;
        title: string;
    };
}

function UpdateEmployees() {
    const { id } = useParams();
    const [lastName, setLastName] = useState<string>();
    const [firstName, setFirstName] = useState<string>();
    const [middleName, setMiddleName] = useState<string>();
    const [isActive, setIsActive] = useState<boolean>(true);
    const [positionId, setPositionId] = useState<string>();
    const [positionList, setPositionList] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Position>("http://localhost:3001/get/" + id);
                console.log(response);
                setLastName(response.data.lastName);
                setFirstName(response.data.firstName);
                setMiddleName(response.data.middleName);
                setPositionId(response.data.position._id);
                setIsActive(response.data.isActive);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();

        axios.get('http://localhost:3001/get/position')
            .then(res => {
                setPositionList(res.data);
            })
            .catch(err => console.log(err));

    }, [id])

    const navigate = useNavigate()

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        axios.put(`http://localhost:3001/update/${id}`, { lastName, firstName, middleName, position: positionId, isActive })
            .then(res => {
                console.log(res);
                navigate('/employeesPage')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className={'pade'}>
                <div className={'wrapper'}>
                    <form onSubmit={handleUpdate}>
                        <div className='title-add'>
                            <h3>Изменение пользователя</h3>
                        </div>

                        <div className='container-data-form'>
                            <div className={'input_div'}>
                                <label htmlFor="lastName">Фамилия</label>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Еременко"
                                        className={'form_control'}
                                        onChange={(e: any) => setLastName(e.target.value)}
                                        value={lastName}
                                    />
                                </div>
                            </div>
                            <div className={'input_div'}>
                                <label htmlFor="firstName">Имя</label>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Кристина"
                                        className={'form_control'}
                                        onChange={(e: any) => setFirstName(e.target.value)}
                                        value={firstName}
                                    />
                                </div>
                            </div>


                            <div className={'input_div'}>
                                <label htmlFor="middleName">Отчество</label>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Юрьевна"
                                        className={'form_control'}
                                        onChange={(e: any) => setMiddleName(e.target.value)}
                                        value={middleName}
                                    />
                                </div>
                            </div>
                            <div className={'input_div'}>
                                <label htmlFor="status">Должность</label>
                                <div>
                                    <select className='form_control' value={positionId}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPositionId(e.target.value)}>
                                        <option value={""}>Выберите должность:</option>
                                        {
                                            positionList.map((positionItem) => {
                                                return (
                                                    <option key={positionItem._id} value={positionItem._id}>
                                                        {positionItem.title}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={'input_div cont-status'}>
                            <label htmlFor="status">Статус</label>

                            <div>
                                <input
                                    type="radio"
                                    name="status"
                                    checked={isActive}
                                    onChange={() => setIsActive(!isActive)}
                                />
                                <label htmlFor="isActive" className='label-status'>Активный</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="status"
                                    checked={!isActive}
                                    onChange={() => setIsActive(!isActive)}
                                />
                                <label htmlFor="isActive" className='label-status'>Неактивный</label>
                            </div>
                        </div>

                        <div className={'action_buttons'}>
                            <div className='buttons'>
                                <div>
                                    <Link to={"/employeesPage"}><button className={'button_add_cancel'}>Отменить</button></Link>
                                </div>
                                <div>
                                    <button className={'button_add'}>Изменить</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateEmployees
