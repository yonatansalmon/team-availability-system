import React from 'react';

const StatusUpdateForm = ({ currentUser, handleStatusChange }) => {
  return (
    <div className='UpdateStatusContainer'>
      <h6>Update My Current Status</h6>
      <select onChange={handleStatusChange} value={currentUser.status}>
        <option value='Working'>Working</option>
        <option value='Working Remotely'>Working Remotely</option>
        <option value='On Vacation'>On Vacation</option>
        <option value='Business Trip'>Business Trip</option>
      </select>
    </div>
  );
};

export default StatusUpdateForm;
