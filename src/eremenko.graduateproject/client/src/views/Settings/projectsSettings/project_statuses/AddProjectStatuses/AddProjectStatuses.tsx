import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function AddProjectStatuses() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const navigate = useNavigate();

    function handleSubmitStatuses(event: any) {
        event.preventDefault();
        axios.post('http://localhost:3001/createProjectStatuses', { title, description })
            .then(res => {
                console.log(res);
                navigate('/projectStatuses');
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <div className={'pade'}>
                <div className={'wrapper'}>
                    <form onSubmit={handleSubmitStatuses}>
                        <div className='title-add'>
                            <h3>Добавление статуса проекта</h3>
                        </div>
                        <div className='container-data-form'>
                            <div className={'input_div'}>
                                <label htmlFor="title">Название</label>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Введите название"
                                        className={'form_control'}
                                        onChange={(e: any) => setTitle(e.target.value)}
                                        value={title}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={'input_div'}>
                                <label htmlFor="description">Описание</label>
                                <div>
                                    <textarea
                                        placeholder="Введите описание"
                                        className={'form_control'}
                                        onChange={(e: any) => setDescription(e.target.value)}
                                        value={description}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={'action_buttons'}>
                            <div className='buttons'>
                                <div>
                                    <Link to={"/projectStatuses"}><button className={'button_add_cancel'}>Отменить</button></Link>
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

export default AddProjectStatuses