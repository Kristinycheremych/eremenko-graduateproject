import React from 'react';
import NavbarSettings from '../../../../components/navbarSettings/navbarSettings';
import './taskStatusesStyle.css';

const TaskStatuses = () => {
  return (
    <>
      <NavbarSettings />
      <div className='container_settings'>
        <div className='title'>
          <h2>Статусы задач</h2>
        </div>
      </div>
    </>
  )
}

export default TaskStatuses
