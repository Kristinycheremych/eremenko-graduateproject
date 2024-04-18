import React, { useEffect } from 'react';
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function CreateEmployees() {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [position, setPosition] = useState("");
    const [dataPosition, setDataPosition] = useState<any[]>([]);
    const [isActive, setIsActive] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/get/position')
            .then(res => {
                setDataPosition(res.data);
            })
            .catch(err => console.log(err));
    }, []);


    const handleSubmitPosition = async (event: any) => {
        event.preventDefault();
        axios.post('http://localhost:3001/create', {
            lastName,
            firstName,
            middleName,
            position,
            isActive
        })
            .then(res => {
                console.log(res);
                navigate('/employeesPage');
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <div className={'pade'}>
                <div className={'wrapper'}>
                    <form onSubmit={handleSubmitPosition}>
                        <div className='title-add'>
                            <h3>Добавление пользователя</h3>
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
                                        required
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
                                        required
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
                                        required
                                    />
                                </div>
                            </div>
                            <div className={'input_div'}>
                                <label htmlFor="status" >Должность</label>
                                <div>
                                    <select className={'form_control'} value={position} onChange={(e) => setPosition(e.target.value)} required>
                                        <option value="">Выберете должность:</option>
                                        {dataPosition.map((position) => {
                                            return (
                                                <option key={position._id} value={position._id}>
                                                    {position.title}
                                                </option>
                                            )
                                        })}
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
                                    onChange={(e) => setIsActive(e.target.value === 'false')}
                                    value={isActive.toString()}
                                    className='input-radio'
                                    required
                                />
                                <label htmlFor="isActive" className='label-status'>Активный</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="status"
                                    required
                                    onChange={(e) => setIsActive(e.target.value === 'true')}
                                    value={isActive.toString()}
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
                                    <button className={'button_add'}>Добавить</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateEmployees