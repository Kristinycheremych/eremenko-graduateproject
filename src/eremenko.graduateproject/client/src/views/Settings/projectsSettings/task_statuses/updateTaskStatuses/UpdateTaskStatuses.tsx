import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateTaskStatuses() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/getTaskStatuses/" + id);
                console.log(response);
                setTitle(response.data.title);
                setDescription(response.data.description)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [id])

    const handleUpdate = (event: any) => {
        event.preventDefault()
        axios.put('http://localhost:3001/updateTaskStatuses/' + id, { title, description })
            .then(res => {
                console.log(res);
                navigate('/taskStatuses')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className={'pade'}>
                <div className={'wrapper'}>
                    <form onSubmit={handleUpdate}>
                        <h3>Изменение статуса задачи</h3>

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
                            <button className={'btn_add_cancel'}>Изменить</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateTaskStatuses
