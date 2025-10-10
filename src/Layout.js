import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    let title;
    let name = 'Roman Purgstaller';

    switch (location.pathname) {
      case '/projects':
        title = 'Projects';
        break;
      case '/picks':
        title = 'Picks';
        break;
      case '/bookshelf':
        title = 'Bookshelf';
        break;
      case '/about':
        title = 'About';
        break;
    }

    if (title === undefined) {
      document.title = name;
    } else {
      document.title = `${title} - ${name}`;
    }
  }, [location]);

  return <>{children}</>;
};

export default Layout;