import React from 'react';
import './navbarSettingsStyle.css';

function navbarSettings() {
    return (
        <>
            <div className='containerSettings'>
                <div className='div_input_search_settings'>
                    <input
                        type='text'
                        className='input_search_settings'
                        placeholder='Поиск'
                    />
                </div>

                <div className='btn_add_settings'>
                    <button className='add_settings'>Добавить</button>
                </div>
            </div>
        </>
    )
}

export default navbarSettings
