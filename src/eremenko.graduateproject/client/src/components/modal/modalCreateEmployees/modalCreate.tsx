import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [position, setPosition] = useState('');
    const [isActive, setIsActive] = useState<boolean>(false);

    function handleSubmit(event: any) {
        event.preventDefault();
        axios.post('http://localhost:3001/create', { lastName, firstName, middleName, position, isActive })
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error));
        setLastName('');
        setFirstName('');
        setMiddleName('');
        setPosition('');
        onClose();
    }


    const handleModalClose = (event: any) => {
        event.preventDefault();
        setLastName('');
        setFirstName('');
        setMiddleName('');
        setPosition('');
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
                        <form onSubmit={handleSubmit}>
                            <h3>Добавление пользователя</h3>
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
                                <label htmlFor="position">Должность</label>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Программист"
                                        className={'form_control'}
                                        onChange={(e: any) => setPosition(e.target.value)}
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
                                        onChange={(e) => setIsActive(e.target.value === 'false')}
                                        value={isActive.toString()}
                                        required
                                    />
                                    <label htmlFor="isActive">Активный</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        name="status"
                                        required
                                        onChange={(e) => setIsActive(e.target.value === 'true')}
                                        value={isActive.toString()}
                                    />
                                    <label htmlFor="isActive">Неактивный</label>
                                </div>
                            </div>

                            <div className={'action_buttons'}>
                                <button className={'btn_add_cancel'} onClick={handleModalClose}>Отменить</button>
                                <button className={'btn_add_cancel'}>Добавить</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Modal;