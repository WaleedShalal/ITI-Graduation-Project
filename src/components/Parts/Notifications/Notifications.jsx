import React from 'react';
import NotificationMsg from './NotificationMsg/NotificationMsg';
import './Notifications.scss';

function Notifications() {
  return (
    <div className='notification__window  py-3 px-3'>
      <div className='window__header d-flex  align-items-baseline px-1'>
        <i className='fa__item far fa-bell'></i>
        <h6 className='ps-2 text-capitalize fw-bold'>notification</h6>
      </div>
      <div className='window__body'>
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
      </div>
    </div>
  );
}

export default Notifications;
