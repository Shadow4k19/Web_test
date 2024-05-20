import { useState } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import axios from "axios";
import { MouseEvent } from "react";


const Registerstyle = styled.div`
  .login-container{
    width: 420px;
  }
  .input-width{
    width: 380px;
  }
  @media screen and (max-width: 600px){
    .login-container{
        width: 300px;
    }
    .input-width{
        width: 255px;
    }
    .container-login{
        padding-top: 20%;
        padding-bottom: 15%;
    }
  }
  @media screen and (max-width: 900px) and (max-height: 600px){
    .container-login{
        padding-top: 12%;
        padding-bottom: 12%;
    }
  }
`

const Register = () =>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("") 
    const [Feburary, setFeb] = useState(0);
    const [March, setMar] = useState(0);
    const [April, setApril] = useState(0);

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
        if(username && password && Feburary && March && April){
          try{
            const RegisterData = async() =>{
              const data = {
                username: username,
                password: password,
                Feburary: Feburary,
                March: March,
                April: April,
              }
              const response = await axios.post("http://localhost/Server/Register.php" , data);
              console.log(response);
              if(response.data.status === 201){
                Swal.fire({
                  icon: "success",
                  title: "Register successfully"
              }).then((result) =>{
                  if(result.isConfirmed){
                      window.location.href = "/login"
                  }
                  else{
                      Swal.fire({
                          icon: "warning",
                          title: "Warning: Something went worng!" 
                      })
                  }
              })
            }
          }
          RegisterData();
          }catch(error){
            console.error(error);
          }
        }else{
            Swal.fire({
                icon: "error",
                title: "ERROR Something is missing."
            })
        }
    }
    return(
    <Registerstyle>
    <div className="container-login">
  <div className="login-container">
    <form>
      <h2 className="text-center">Register</h2>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            required
            className="form-control input-width"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            required
            className="form-control input-width"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="Feburary">Feburary</label>
          <input
            type="number"
            placeholder="1471"
            required
            className="form-control"
            value={Feburary}
            onChange={(e) => setFeb(parseInt(e.target.value))}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="March">March</label>
          <input
            type="number"
            placeholder="3154"
            required
            className="form-control"
            value={March}
            onChange={(e) => setMar(parseInt(e.target.value))}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="April">April</label>
          <input
            type="number"
            placeholder="4321"
            required
            className="form-control"
            value={April}
            onChange={(e) => setApril(parseInt(e.target.value))}
          />
        </div>
      </div>
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <a href="/login"><p>already have a account</p></a>
        </form>
      </div>
    </div>
    </Registerstyle>
    )
}

export default Register;
