import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function IndexAdmin() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [adminsCount, setAdminsCount] = useState<number | null>(null);

  // Initialize the count for animation
  const [animatedCount, setAnimatedCount] = useState(0);
  const [animatedAdminsCount, setAnimatedAdminsCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await axios.get('https://localhost:7194/api/accounts/countUsers'); // Adjust the endpoint URL

        if (userResponse.status === 200) {
          const { userCount } = userResponse.data;
          setUserCount(userCount);

          // Set the final count and start the animation for user count
          setAnimatedCount(userCount);
          animateCount(userCount, setAnimatedCount);

          console.log(userResponse.data);
        } else {
          throw new Error('Failed to fetch user count');
        }
      } catch (error) {
        console.error(error);
      }

      // Set the static admin count (replace with your desired value)
      const staticAdminsCount = 2;
      setAdminsCount(staticAdminsCount);

      // Set the final count and start the animation for admins count
      setAnimatedAdminsCount(staticAdminsCount);
      animateCount(staticAdminsCount, setAnimatedAdminsCount);
    }

    fetchData();
  }, []);

  // Function to animate the count
  const animateCount = (endCount: number, setAnimatedCountFn: (count: number) => void) => {
    let start = 0;
    const increment = endCount > start ? 1 : -1;

    const animationInterval = setInterval(() => {
      if (start !== endCount) {
        start += increment;
        setAnimatedCountFn(start);
      } else {
        clearInterval(animationInterval);
      }
    }, 300); // Change the interval as needed for your desired animation speed
  };

  return (
    
    <div className='Everything' style={{ background: 'linear-gradient(to right, #0A213E, #295985)', marginLeft: '-8.6%', marginRight: '-8.6%', paddingTop: '5%', paddingBottom: '15%' }}>
        <h1 style={{color:'white', textAlign:'center', marginBottom:'2REM', fontSize:'50px'}}>BMM Statistics</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Box for User Count */}
        <div style={{ width: '250px', textAlign: 'center', height: '130px', margin: '5px', border: '1px solid #ccc', padding: '10px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h5 style={{ color: '#F96230', fontSize:'25px' }}>Customers</h5>
          <h3 style={{ color: '#F96230', fontSize:'40px' }}>{animatedCount}</h3> {/* Display the animated count */}
        </div>

        {/* Box for Admins Count */}
        <div style={{ width: '250px', textAlign: 'center', height: '130px', margin: '5px', border: '1px solid #ccc', padding: '10px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h5 style={{ color: '#F96230', fontSize:'25px' }}>Admins</h5>
          <h3 style={{ color: '#F96230', fontSize:'40px' }}>{animatedAdminsCount}</h3> {/* Display the animated admins count */}
        </div>
      </div>
    </div>
  );
}
