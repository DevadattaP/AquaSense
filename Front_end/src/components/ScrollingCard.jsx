import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/ScrollingCard.css'; // Import CSS file for animations

const ScrollingCard = () => {
  const [data, setData] = useState(null);
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/notifications/LIVE');
      setData(response.data.response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const scrollContent = () => {
      if (scrollContainerRef.current && !isHovered) {
        const container = scrollContainerRef.current;
        container.scrollTop += 1; // Adjust the scrolling speed (increase/decrease this value for speed)

        // Reset to the top once content has scrolled to the bottom
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
          container.scrollTop = 0;
        }
      }
    };

    const scrollInterval = setInterval(scrollContent, 30); // Adjust the interval (lower value = faster scroll)

    return () => clearInterval(scrollInterval);
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="rounded-xl z-20 m-4 p-4 shadow-md relative justify-center overflow-hidden bg-indigo-100 border border-indigo-200"
      style={{ width: '283px', height: '337px', overflow: 'hidden', position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      <div
        className='flex-1 flex-wrap relative bg-white rounded-xl'
        ref={scrollContainerRef}
        style={{ width: '100%', height: '249px', overflow: 'hidden', position: 'relative' }}
      >
        {/* Content to be scrolled */}
        {data &&
          data.map((product, index) => (
              <div key={index} className="text-center mb-4">
                <div style={{ width: '250px' }}>
                  <h1 className="text-xl font-bold">{product.title}</h1>
                </div>
                <div className='text-grey-500' style={{ width: '250px' }}>
                  <p className="w-full">{product.description}</p>
                </div>
              </div>
            ))}
      </div>

      <div className=' p-2 text-center font-bold text-xl mb-3 z-10' style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
        Notifications
      </div>
    </div>
  );
};

export default ScrollingCard;
