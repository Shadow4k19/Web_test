import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface StyleProps {
  open: boolean;
}

interface LeftNavProps {
  open?: boolean;
}

const Ul = styled.ul<StyleProps>`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  z-index: 19;
  .container-btn {
    padding-left: 18px;
    padding-top: 5px;
  }
  li {
    color: #000;
    padding: 10px;
    position: relative;
    display: inline-block;
  }
  li:hover {
    cursor: pointer;
  }
  li::after {
    padding-top: 1px;
    content: '';
    position: absolute;
    height: 4px;
    left: 0;
    bottom: 0;
    width: 0;
    background: #F5D7FF;
    transition: width 0.2s;
  }
  li:hover::after {
    display: center;
    width: 100%;
  }
  ul {
    padding: 0;
  }
    
  .btn-danger{
    background-color : #2A629A;
    border-radius : 15px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #FFA62F;
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    overflow : auto;
    li {
      padding-top: 30px;
      color: #fff;
    }
    li:hover {
      cursor: pointer;
    }
    .container-btn {
      padding-top: 70%;
    }
  }
  @media screen and (max-width: 768px) and (max-height: 600px) {
    .container-btn {
      padding-top: 40%;
    }
  }
`;

const LeftNav: React.FC<LeftNavProps> = ({ open = false }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [path1, setPath] = useState('');

  useEffect(() => {
    const updateStateFromCookies = () => {
      const loggedIn = Cookies.get('isLoggedIn');
      const userRole = Cookies.get('role');
      const path = Cookies.get('path');

      setIsLoggedIn(loggedIn === 'true');
      setRole(userRole || '');
      setPath(path || '');
    };

    updateStateFromCookies();

    window.addEventListener('cookieChange', updateStateFromCookies);

    return () => {
      window.removeEventListener('cookieChange', updateStateFromCookies);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      Cookies.set('path', path);
      setPath(path);
    };

    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange();

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const LinkTo = (path: string): void => {
    if (path === '/' && path1 === '/') {
      window.location.href = '#home';
    } else {
      window.location.href = path;
    }
  };

  const HandleLogout = () => {
    if (Cookies.get('isLoggedIn')) {
      Cookies.remove('isLoggedIn');
      Cookies.remove('username');
      Cookies.remove('role');
      window.location.href = '/';
    }
  };
  return (
    <Ul open={open}>
      <ul>
        <li onClick={() => LinkTo('/')}>Home</li>
      </ul>
      {path1 === '/' ? (
        <>
          <ul>
            <li onClick={() => LinkTo('#time')}>Time</li>
          </ul>
          <ul>
            <li onClick={() => LinkTo('#about')}>About Us</li>
          </ul>
          <ul>
            <li onClick={() => LinkTo('#content')}>Content</li>
          </ul>
        </>
      ) : null}
      {isLoggedIn ? (
        <>
        <ul>
          <li onClick={() => LinkTo('/dashboard')}>Dashboard</li>
        </ul>  
          {role === 'admin' ? (
            <ul>
              <li onClick={() => LinkTo('/systemmanagement')}>Management</li>
            </ul>
          ) : null}
          </>
      ) : null}
      <div className="container-btn">
        {isLoggedIn ? (
          <button className="btn btn-danger" onClick={HandleLogout}>
            Logout
          </button>
        ) : (
          <button className="btn btn-danger" onClick={() => LinkTo('/login')}>
            Sign In
          </button>
        )}
      </div>
    </Ul>
  );
};

export default LeftNav;
