import React from 'react'
import Header from '../../../../../components/header/Header'
import { Link } from 'react-router-dom'

const DesignPage = () => {
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

                    <div className={'btn_add_users'}>
                        <Link to={''}>
                            <button className={'add_user'}>Добавить</button>
                        </Link>
                    </div>

                </div>
                <div><p>Дизайн</p></div>
            </div>
        </>
    )
}

export default DesignPage
