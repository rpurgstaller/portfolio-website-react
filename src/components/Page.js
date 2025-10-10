import React, { useEffect } from 'react';

const MyComponent = () => {
  useEffect(() => {
    const prefix = 'MyApp - ';
    const tabTitle = 'Dashboard'; // You can make this dynamic
    document.title = `${prefix}${tabTitle}`;
  }, []);

  return <div>Welcome to the Dashboard</div>;
};

export default MyComponent;
