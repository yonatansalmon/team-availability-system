import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamMember from './TeamMember';
import StatusUpdateForm from './StatusUpdateForm';

const StatusScreen = () => {
  const [error, setError] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const response = await axios.get('http://localhost:5000/api/get_all_users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
        setError('An error occurred fetching team members. Please try again.');
      }
    }

    fetchTeamMembers();
  }, [currentUser, token]);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await axios.get('http://localhost:5000/api/get_user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setError('An error occurred fetching current user. Please try again.');
      }
    }

    fetchCurrentUser();
  }, [token]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const response = await axios.post(
        'http://localhost:5000/api/update_status',
        { id: currentUser._id, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message === 'Status updated') {
        setCurrentUser({ ...currentUser, status: newStatus });
      }
    } catch (error) {
      console.error('An error occurred while updating the status:', error);
      setError('An error occurred while updating the status. Please try again.');
    }
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMembers = teamMembers
    .filter((member) => (filterStatus === 'All' ? true : member.status === filterStatus))
    .filter((member) => member.userName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='MainContainer'>
      <div className='StatusScreenContainer'>
        <h5 className='GreetingContainer'>
          Hello {currentUser.userName} you are {currentUser.status}
        </h5>
        <StatusUpdateForm currentUser={currentUser} handleStatusChange={handleStatusChange} />
        {error && <h6 className='Error'>{error}</h6>}
        <hr></hr>
        <div className='SearchFilterContainer'>
          <h6>List of employees:</h6>
          <div className='SearchFilter'>
            <input type='text' placeholder='Search by name...' className='SearchInput' value={searchTerm} onChange={handleSearchChange} />
            <select onChange={handleFilterChange}>
              <option value='' disabled>
                Filter by status...
              </option>
              <option value='All'>All</option>
              <option value='Working'>Working</option>
              <option value='Working Remotely'>Working Remotely</option>
              <option value='On Vacation'>On Vacation</option>
              <option value='Business Trip'>Business Trip</option>
            </select>
          </div>
        </div>

        <div>
          <table>
            <tbody>
              {filteredMembers.map((member) => (
                <TeamMember member={member} key={member._id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatusScreen;
