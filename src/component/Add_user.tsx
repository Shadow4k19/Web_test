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

interface combinedData{
    username: string;
    password: string;
    role: string;
    Feburary: string;
    March: string;
    April: string;
}

const Add_user : React.FC = () => {

    const [combinedData, setCombinedData] = useState<combinedData>({
        username: "",
        password: "",
        role: "",
        Feburary: "",
        March: "",
        April: ""
    });

    const handleSubmit : React.MouseEventHandler<HTMLButtonElement> = async(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if(combinedData){
                const response = await axios.post("http://localhost/Server/User.php"||"http://localhost:8080/userapi/user", combinedData);
                console.log(response.data);
                if (response.data.status === 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Add Successfuly",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/usermanagement";
                        }
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: response.data.message,
                    })
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Registerstyle>
            <div className="container-login">
                <div className="login-container">
                    <form>
                        <h2 className="text-center">Add User</h2>
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            className="form-control input-width"
                            value={combinedData.username}
                            onChange={(e) => setCombinedData({ ...combinedData, username: e.target.value })}
                        />
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="form-control input-width"
                            value={combinedData.password || ''}
                            onChange={(e) => setCombinedData({ ...combinedData, password: e.target.value })}
                        />
                        <label htmlFor="role" className="form-label">Role</label>
                        <input
                            type="text"
                            placeholder="Role"
                            required
                            className="form-control input-width"
                            value={combinedData.role || ''}
                            onChange={(e) => setCombinedData({ ...combinedData, role: e.target.value })}
                        />
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="Feburary">February</label>
                                <input
                                    type="text"
                                    placeholder="1471"
                                    required
                                    className="form-control"
                                    value={combinedData.Feburary || ''}
                                    onChange={(e) => setCombinedData({ ...combinedData, Feburary: e.target.value })}
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="March">March</label>
                                <input
                                    type="text"
                                    placeholder="3154"
                                    required
                                    className="form-control"
                                    value={combinedData.March || ''}
                                    onChange={(e) => setCombinedData({ ...combinedData, March: e.target.value })}
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="April">April</label>
                                <input
                                    type="text"
                                    placeholder="4321"
                                    required
                                    className="form-control"
                                    value={combinedData.April || ''}
                                    onChange={(e) => setCombinedData({ ...combinedData, April: e.target.value })}
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
                    </form>
                </div>
            </div>
        </Registerstyle>
    )
}

export default Add_user;
