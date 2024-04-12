import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddStagePage: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [newStageTitle, setNewStageTitle] = useState<string>('');
    const navigate = useNavigate();

    const handleAddStage = async (event: any) => {
        event.preventDefault();
        axios.post(`http://localhost:3001/projects/${projectId}/stages`,
            {
                title: newStageTitle
            })
            .then(res => {
                console.log(res);
                navigate(`/projectsPage/projectDetails/${projectId}/boards/design`);
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            <div className={'pade'}>
                <div className={'wrapper'}>
                    <form onSubmit={handleAddStage}>
                        <h3>Добавление этапа</h3>
                        <div className={'input_div'}>
                            <label htmlFor="title">Название</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Название"
                                    className={'form_control'}
                                    value={newStageTitle}
                                    onChange={(e) => setNewStageTitle(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={'action_buttons'}>
                            <Link to={`/projectsPage/projectDetails/${projectId}/boards/design`}><button className={'btn_add_cancel'}>Отменить</button></Link>
                            <button className={'btn_add_cancel'}>Добавить</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export default AddStagePage;