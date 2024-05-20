import React, { useEffect, useState } from "react";
import 'datatables.net';
import styled from "styled-components";
import axios from "axios";
import DataTable, { createTheme , TableColumn , Alignment} from 'react-data-table-component';
import Swal from "sweetalert2";


createTheme('solarized', {
    text: {
      primary: '#000',
      secondary: '#000',
    },
    background: {
      default: '#C4A1A1',
    },
    context: {
      background: '#cb4b16',
      text: '#000',
    },
    divider: {
      default: '#000',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');

const User_manage = styled.div`
    .container{ 
        padding-top: 100px;
        min-height: 100vh;
        height: auto;
        height: auto;
        color: #fff;
        background-color: #CCBEBE;
        border-radius: 5px;
    }
    h1{
        color: #000;
    }
    .inside-container{
        padding: 50px;
        background-color: #583F3F;
        border-radius: 5px;
    }
    table.dataTable {
        border-collapse: collapse;
        width: 100%;
      }
      
      table.dataTable td,
      table.dataTable th{
        width: 10px;
        border: 1px solid #dddddd;
        padding: 8px;
        vertical-align: middle;
        text-align: center;
      }
      table.dataTable tr:hover {
        background-color: #4B4B4B;
      }
      
    .btn-con{
        justify-content: space-between;
    }
    button{
        margin: 1.1px;
    }
    .dt-search{
        padding-bottom: 7px;
    }
    .add {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding-bottom: 10px;
    }
    .gDXgoE{
        background-color:#C4A1A1;
    }
    .cIAsRk{
        min-width: 130px;
    }
    btn-con-table{
        display: flex;
        gap: 10px;
    }
    .cell{
        padding-left: 0px;
    }
    .jOVtgV{
        padding-left: 0px;
    }
    .input{
        display: flex;
        padding-top: 10px;
        text-align: right;
    }
    .container-table{
        padding-bottom: 10%;
    }
    .btn-success, .btn-danger{
        width: 100px;
    }
    header{
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
    }
    .jGKeEe, .kvDdmV{
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;
    }
    .hqJJCC:disabled{
        fill: rgba(0, 0, 0, .35);
    }
    @media screen and (max-width:1200px){
        .btn-success, .btn-danger{
            width: 80px;
        }
    }
`;


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

const UserComponent: React.FC = () => {
    const [search , setSerch] = useState('');
    const [filteredData, setFilteredData] = useState<combinedData[]>([]);
    const [loading, setLoading] = useState(true);

    const [combinedData, setCombinedData] = useState<combinedData[]>([
        { id: "0", username: "x", password: "x", role: "unknow", Feburary: "0", March: "0", April: "0" }
    ]);

    useEffect(() => {
        fetchData();    
    }, []);

    const handleEdit = (username : any) =>{
        //go to page Edit
        window.location.href = `/edituser/${username}`
    }
    const handleDelete = (id: any) => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this data!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then((result) => {
          if (result.isConfirmed) {
            try{
                const deleted_data = async() =>{
                    const response = await axios({
                        method: 'delete',
                        url: 'http://localhost/Server/User.php',
                        data: {
                            id: id
                        },
                      });
                    console.log(response);
                    if(response.data.status === 200){
                        Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                          ).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    }else{
                        Swal.fire(
                            'Delete Failed!',
                            'You data not Delete',
                            'error',
                        )
                    }
                }
                deleted_data();
            }catch(error){
                console.error(error);
            }
          }
        });
      }
    const handleAdd = () =>{
        window.location.href = "/adduser"
    }
    const fetchData = async () => {
        try {
            const response = await axios.get<{ data: { user: User[]; dashboard: Dashboard[] } }>("http://localhost/Server/User.php");
            const { user = [] , dashboard = [] } = response.data.data || {};
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
            
            const combinedDataArray = Object.values(combinedMap);
            
            setCombinedData(combinedDataArray);
            setFilteredData(combinedDataArray);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        const result = combinedData.filter((item) => {
          return item.username.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredData(result);
      }, [search, combinedData]);
      
    const columns: TableColumn<combinedData>[] = [
        { name: 'ID', selector: (row: combinedData) => row.id, sortable: true ,cell: (row : combinedData) =>
            <div className="cell">{row.id}</div>
        },
        { name: 'Username', selector: (row: combinedData) => row.username, sortable: true ,cell: (row : combinedData) =>
            <div className="cell">{row.username}</div>
        },
        { name: 'Password', selector: (row: combinedData) => row.password || '', sortable: true ,cell: (row : combinedData) =>
            <div className="cell">{row.password}</div>
        },
        { name: 'Role', selector: (row: combinedData) => row.role || '', sortable : true, cell: (row : combinedData) =>
            <div className="cell">{row.role}</div>
        },
        { name: 'February', selector: (row: combinedData) => row.Feburary || '', sortable: true,cell: (row : combinedData) =>
            <div className="cell">{row.Feburary}</div>
        },
        { name: 'March', selector: (row: combinedData) => row.March || '', sortable: true, cell: (row : combinedData) =>
            <div className="cell">{row.March}</div>
        },
        { name: 'April', selector: (row: combinedData) => row.April || '', sortable: true, cell: (row : combinedData) =>
            <div className="cell">{row.April}</div>
        },
        {
            name: 'Edit',
            cell: (row: any) => (
                <div className="btn-con-table">
                    <button className="btn btn-success action-btn" onClick={() => handleEdit(row.username)}>Edit</button>
                </div>
            ),
        },
        {
            name: 'Delete',
            cell: (row: any) =>(
                <div className="btn-con-table">
                    <button className="btn btn-danger action-btn" onClick={() => handleDelete(row.id)}>Delete</button>
                </div>
            )
        },
    ];

    return (
        <User_manage>
            <div className="container">
                <div className="inside-con">
                    <h1>User Management</h1>
                    <div className="add"><button className="btn btn-secondary add" onClick={handleAdd}>Add User</button></div>
                    <div className="container-table">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                        <>
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            highlightOnHover
                            theme="solarized"
                            subHeaderAlign={Alignment.RIGHT}
                            subHeader
                            subHeaderComponent={
                                <div className="input">
                                    <input 
                                    type="text"
                                    placeholder="Search by username" 
                                    className = "form-control"
                                    value={search}
                                    onChange={(e) => setSerch(e.target.value)}
                                    />
                                </div>
                            }
                        />
                        </>
                        )}
                    </div>
                </div>
            </div>
        </User_manage>
    );
}

export default UserComponent;
