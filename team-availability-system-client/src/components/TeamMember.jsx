import React from 'react';

const TeamMember = ({ member }) => {
  return (
    <tr key={member._id} className='TableItem'>
    <td>
      {member.userName} ({member.status})
    </td>
  </tr>
  );
};

export default TeamMember;
