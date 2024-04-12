import React from 'react';
import Header from '../../../../../components/header/Header';
import { Link } from 'react-router-dom';

function TechnicalSpecification() {
    return (
        <>
            <Header />
            <div className='container'>
                <div className={'container_search_filter'}>
                    <div className={'div_input_search'}>
                        <input
                            type="text"
                            className={'input_search'}
                            placeholder="Поиск"
                        />
                    </div>

                    <div className={'containet_btn_add'}>
                        <Link to={''}>
                            <button className={'btn_add'}>Добавить</button>
                        </Link>
                    </div>

                </div>
                <div><p>Техническое задание</p></div>
            </div>
        </>
    )
}

export default TechnicalSpecification
