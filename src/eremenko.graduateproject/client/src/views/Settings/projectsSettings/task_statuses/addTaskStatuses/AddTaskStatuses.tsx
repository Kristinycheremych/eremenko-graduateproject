import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function AddTaskStatuses() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const navigate = useNavigate();

    function handleSubmitStatuses(event:any) {
        event.preventDefault();
        axios.post('http://localhost:3001/createTaskStatuses', { title, description})
        .then(res => {
            console.log(res);
            navigate('/taskStatuses');
        })
        .catch(error => console.log(error));
    }
    return (
        <>
           <div className={'pade'}>
                <div className={'wrapper'}>
                    <form onSubmit={handleSubmitStatuses}>
                        <h3>Добавление статуса задачи</h3>
                        <div className={'input_div'}>
                            <label htmlFor="title">Название</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Название"
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
                                <input
                                    type="text"
                                    placeholder="Описание"
                                    className={'form_control'}
                                    onChange={(e: any) => setDescription(e.target.value)}
                                    value={description}
                                    required
                                />
                            </div>
                        </div>

                        <div className={'action_buttons'}>
                            <Link to={"/taskStatuses"}><button className={'btn_add_cancel'}>Отменить</button></Link>
                            <button className={'btn_add_cancel'}>Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddTaskStatuses
