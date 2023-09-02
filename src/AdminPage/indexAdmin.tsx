import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function IndexAdmin() {
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchUserCount() {
      try {
        const response = await axios.get('https://localhost:7194/api/accounts/countUsers'); // Adjust the endpoint URL

        if (response.status === 200) {
          // Access the UserCount property from the response data
          const { userCount } = response.data;
          setUserCount(userCount);
          console.log(response.data)
        } else {
          throw new Error('Failed to fetch user count');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserCount();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Box for User Count */}
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
        <h3>User Count</h3>
        {userCount !== null ? (
          <p>Total Users: {userCount}</p>
        ) : (
          <p>Loading user count...</p>
        )}
      </div>
  
      {/* Box for Admins Count */}
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
        <h3>Admins Count</h3>
        <p>Total Admins: 2</p>
      </div>
    </div>
  );
  
  
  
}
