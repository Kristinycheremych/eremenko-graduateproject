import React from 'react';

function Divisions() {
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

      <div className='container_settings'>
        <div className='title'>
          <h2>Подразделения</h2>
        </div>
      </div>
    </>
  )
}

export default Divisions
