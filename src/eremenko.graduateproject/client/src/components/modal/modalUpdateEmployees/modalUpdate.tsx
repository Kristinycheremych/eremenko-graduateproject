import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {

    const { id } = useParams();
    const [lastName, setLastName] = useState();
    const [firstName, setFirstName] = useState();
    const [middleName, setMiddleName] = useState();
    const [position, setPosition] = useState();
    const [isActive, setIsActive] = useState<boolean>(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/get/" + id);
                console.log(response);
                setLastName(response.data.lastName);
                setFirstName(response.data.firstName);
                setMiddleName(response.data.middleName);
                setPosition(response.data.position);
                setIsActive(response.data.isActive);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [id]);

    const handleUpdate = (event: any) => {
        event.preventDefault()
        axios.put('http://localhost:3001/update/' + id, { lastName, firstName, middleName, position, isActive })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))
    }

    const handleModalClose = () => {
        onClose();
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-container">
            <div className="modal-content">
                <div className={'pade'}>
                    <div className={'wrapper'}>
                        <form onSubmit={handleUpdate}>
                            <h3>Изменение пользователя</h3>

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
                                        placeholder="Кристина"
                                        className={'form_control'}
                                        onChange={(e: any) => setMiddleName(e.target.value)}
                                        value={middleName}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={'input_div'}>
                                <label htmlFor="position">Должность</label>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Программист"
                                        className={'form_control'} onChange={(e: any) => setPosition(e.target.value)}
                                        value={position}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={'input_div'}>
                                <label htmlFor="status">Статус</label>

                                <div>
                                    <input
                                        type="radio"
                                        name="status"
                                        checked={isActive}
                                        onChange={() => setIsActive(!isActive)}
                                        required
                                    />
                                    <label htmlFor="isActive">Активный</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="status"
                                        required
                                        checked={!isActive}
                                        onChange={() => setIsActive(!isActive)}
                                    />
                                    <label htmlFor="isActive">Неактивный</label>
                                </div>
                            </div>

                            <div className={'action_buttons'}>
                               <button className={'btn_add_cancel'} onClick={handleModalClose}>Отменить</button>
                                <button className={'btn_add_cancel'}>Изменить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;