import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function AddPosition(){
    const [title, setTitle] = useState();
    const navigate = useNavigate();

    function handleSubmitPosition(event: any) {
        event.preventDefault();
        axios.post('http://localhost:3001/createPositions', { title })
            .then(res => {
                console.log(res);
                navigate('/position');
            })
            .catch(error => console.log(error));
    }
    return (
        <>
            <div className={'pade'}>
                <div className={'wrapper'}>
                    <form onSubmit={handleSubmitPosition}>
                        <h3>Добавление статуса сотрудника</h3>
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

                        <div className={'action_buttons'}>
                            <Link to={"/position"}><button className={'btn_add_cancel'}>Отменить</button></Link>
                            <button className={'btn_add_cancel'}>Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddPosition
