import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
interface StyleProps{
    open : boolean;
}

const Ul = styled.ul<StyleProps>`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  z-index: 19;
  container-btn{
    padding-left: 18px;
    padding-top: 20px;
  }
    li {
      color: #fff;
      padding: 10px;
      position: relative;
      display: inline-block;
    }

    li:hover{
      cursor: pointer;
    }
    li::after{
      padding-top: 1px;
      content: '';
      position: absolute;
      height: 4px;
      left: 0;
      bottom: 0;
      width: 0;
      background: #fff;
      transition: width .2s;
    }
    li:hover::after{
      display: center;
      width: 100%;
    }
    ul{
      padding: 0 0 0 0;
    }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #B040EC;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      padding-top: 30px;
      color: #fff;
    }
    li:hover{
      cursor: pointer;
    }
    .container-btn{
      padding-top: 100%;
    }
  }
  @media screen and (max-width: 768px) and (max-height: 600px){
    .container-btn{
      padding-top: 40%;
    }
  }

`;

const LeftNav = ({ open = false } : any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [path1, setPath] = useState("");

  useEffect(() => {
    const loggedIn = Cookies.get('isLoggedIn');
    const userRole = Cookies.get('role');
    const path = Cookies.get('path');

    if (loggedIn && userRole) {
      setIsLoggedIn(loggedIn === 'true');
      setRole(userRole);
    }
    if(path){
      setPath(path);
    }
  }, []);

  const LinkTo = (path : string) :void =>{
    if(path === "/" && path1 === "/"){
      window.location.href = "#home";
    }else{
      window.location.href = path;
    }
  }

  const HandleLogout = () =>{
    if(Cookies.get('isLoggedIn')){
      Cookies.remove('isLoggedIn');
      Cookies.remove('username');
      Cookies.remove('role');
      window.location.href = "/";
    }    
  }

  return (
    <Ul open={open}>
      <ul>
        <li onClick={()=> LinkTo("/")}>Home</li>
      </ul>
      {path1 === "/" ? (
        <>
          <ul>
            <li onClick={() => LinkTo("#about")}>About Us</li>
          </ul>
          <ul>
            <li onClick={() => LinkTo("#contact")}>Contact Us</li>
          </ul>
          <ul>
            <li onClick={() => LinkTo("#content")}>Content</li>
          </ul>
        </>
      ) : null}
      {role === "admin" ?<ul><li onClick={() => LinkTo("/usermanagement")}>Manage user</li></ul>: null}
      <div className="container-btn">
        {isLoggedIn ?  <button className="btn btn-danger" onClick={HandleLogout} >Logout</button>: <button className="btn btn-danger" onClick={() => LinkTo("/login")}>Sign In</button>}
      </div>
    </Ul>
  )
}

export default LeftNav