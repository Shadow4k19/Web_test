import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
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
interface User {
    id: string;
    username: string;
    password: string;
    role: string;
}

interface Dashboard {
    id: string;
    username: string;
    Feburary: string;
    March: string;
    April: string;
}

interface combinedData{
    id: string;
    username: string;
    password?: string;
    role?: string;
    Feburary?: string;
    March?: string;
    April?: string;
}

const Edit_user : React.FC = () => {
    const { username } = useParams();

    const [combinedData, setCombinedData] = useState<combinedData>({
        id: "",
        username: "",
        password: "",
        role: "",
        Feburary: "",
        March: "",
        April: ""
    });

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            if (combinedData) {
                const response = await axios({
                    method: 'put',
                    url: 'http://localhost/Server/User.php' || 'http://localhost:8080/userapi/user',
                    data: combinedData,
                  });
                if (response.data.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Update Successfuly",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/usermanagement";
                        }
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Update Failed",
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get<{ data: { user: User[]; dashboard: Dashboard[] } }>(`http://localhost/Server/User.php?username=${username}` || `http://localhost:8080/userapi/user/${username}`);
            if (response) {
                const { user = [], dashboard = [] } = response.data.data || {};
                const combinedMap: { [key: string]: combinedData } = {};
                user.forEach((userData) => {
                    combinedMap[`${userData.id}-${userData.username}`] = {
                        id: userData.id,
                        username: userData.username,
                        password: userData.password,
                        role: userData.role,
                    };
                });

                dashboard.forEach((dashboardData) => {
                    const key = `${dashboardData.id}-${dashboardData.username}`;
                    if (combinedMap[key]) {
                        combinedMap[key] = {
                            ...combinedMap[key],
                            Feburary: dashboardData.Feburary,
                            March: dashboardData.March,
                            April: dashboardData.April,
                        };
                    } else {
                        combinedMap[key] = {
                            id: dashboardData.id,
                            username: dashboardData.username,
                            password: '',
                            role: '',
                            Feburary: dashboardData.Feburary,
                            March: dashboardData.March,
                            April: dashboardData.April,
                        };
                    }
                });

                const combinedDataObject = Object.values(combinedMap)[0];
                setCombinedData(combinedDataObject);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed to Get Data",
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Registerstyle>
            <div className="container-login">
                <div className="login-container">
                    <form>
                        <h2 className="text-center">Edit User</h2>
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
                        <div className="div">
                            <label htmlFor="role" className="form-label">Role</label>
                        </div>                            
                        <label>
                            <input
                                type="radio"
                                value="admin"
                                className="form-check-input"
                                checked={combinedData.role === 'admin'}
                                onChange={(e) => setCombinedData({...combinedData, role: e.target.value})}
                            />
                            Admin
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="user"
                                className="form-check-input"
                                checked={combinedData.role === 'user'}
                                onChange={(e) => setCombinedData({...combinedData, role: e.target.value})}
                            />
                            User
                        </label>
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

export default Edit_user;
