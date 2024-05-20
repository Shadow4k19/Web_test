import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import Cookie from 'js-cookie'
import axios from "axios";
import styled from "styled-components";
import { MouseEvent } from "react";


const LoginStyle = styled.div`
  aherf{
    width: 180px;
  }
  p{
    width: 180px;
  }
`

const Login =()=>{
    const [username , setUser] = useState("");
    const [pass, setPass] = useState("");

    useEffect(() => {
      if(Cookie.get('isLoggedIn')){
        Cookie.remove('isLoggedIn');
        Cookie.remove('username');
        Cookie.remove('role');
      }    
    }, []);    

    const checklogin: React.MouseEventHandler<HTMLButtonElement> = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try{
        if(username && pass){
          const data ={
            username: username,
            password: pass,
          };
          const Senddata = async() =>{
            const response = await axios.post('http://localhost/Server/Login.php', data, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
              if(response.data.status === 200){
                Cookie.set('username', username);
                Cookie.set('role', response.data.role)
                Cookie.set('isLoggedIn', 'true', { expires: 120 / (24 * 60) });
                Swal.fire({
                  icon : "success",
                  title: "Login successfuly",
              }).then((result) => {
                  if (result.isConfirmed) {
                      window.location.href = "/";
                  }
              });
            }else{
              Swal.fire({
                icon: "error",
                title: response.data.message,
            })
            }
          }
          Senddata()
        }else{
            Swal.fire({
                icon: "warning",
                title:"Please Fill all the Detail.",
            })
        }
      }catch(error){
        console.error(error);
      }
    }
    return(
      <LoginStyle>
        <div className="container-login">
      <div className="login-container">
        <form>
          <h4 className="text-center mb-4">Login</h4>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <a href="/register" className="aherf">
            <p>Don't have a account</p>
          </a>
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={checklogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </LoginStyle> 
    )
}

export default Login;