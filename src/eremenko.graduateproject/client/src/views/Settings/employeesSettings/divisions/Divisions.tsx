import React from 'react';

function Divisions() {
  return (
    <>
      <div className='container'>
        <div className='container_search_filter'>
          <div className='div_input_search'>
            <input
              type='text'
              className='input_search'
              placeholder='Поиск'
            />
          </div>

          <div className='containet_btn_add'>
            <button className='btn_add'>Добавить</button>
          </div>
        </div>

        <div className='container_settings'>
          <div className='title'>
            <h2>Подразделения</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Divisions
