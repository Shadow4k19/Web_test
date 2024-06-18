import React, { useEffect, useState } from "react";
import 'datatables.net';
import styled from "styled-components";
import DataTable, { createTheme , TableColumn , Alignment} from 'react-data-table-component';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";

interface tabledata {
    id : number;
    img : string;
    title : string;
    content : string;
}

const Slide_manage = styled.div`
    .section{
        min-height: 100vh;
        height: auto;
        padding: 100px;
    }
    .container{ 
        color: #fff;
        background-color: #CCBEBE;
        border-radius: 5px;
        //width: 50%;
        //border: 2px solid #000;
    }
    h1{
        color: #000;
    }
    .inside-con{
        padding: 30px 0 0 0;
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
        padding-bottom: 5%;
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
    .text-con{
        text-align: center;
        margin-bottom: 20px;
        position: absolute;
        top: 13%;
        background-color: #CCBEBE;
        //border: 2px solid #000;
        border-radius: 5px;
        padding: 0 10px;
    }
    p{
        margin: 2% 0 0 0;
    }
    
    .cell{
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .cell-content{
        text-align: center;
        height : 90px;
        overflow-y: auto;
    }

    .img-table{
        width: 120px;
        height: 100px;
        border-radius: 17px;
        padding: 15px 0 15px 0;
    }
    @media screen and (max-width:1200px){
        .btn-success, .btn-danger{
            width: 80px;
        }
    }
    @media screen and (max-width: 1080px){
        .img-table{
            width: 90px;
            height: 90px;
        }
    }
    @media screen and (max-width: 768px){
        .text-con{
            width: 120px;
        }
        .text-title{
            font-size: 20px;
        }
        .jGKeEe{
            overflow-x: auto;
        }
    }
`;
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
const ManageContent : React.FC = () =>{
    const [loading , setLoading] = useState(true);
    const [search , setSerch] = useState("");

    const [data, setData] = useState<tabledata[]>([])
    useEffect (() => {
        fetchdata();
    },[])


    const fetchdata = async() =>{
        try{
            const response = await axios.get("http://localhost/Server/Content.php" || "http://localhost:8080/contentapi/content");
            console.log(response.data);
            if(response){
                setData(response.data.data);
                setLoading(false);
            }else{
                console.log("DATA ERROR");
            }
        }catch(error){
            console.log(error);
        }
    }
    const handleAdd = () =>{
        window.location.href = "/managecontent/add";
    }
    const handleEdit = ( id : number) =>{
        window.location.href = `/managecontent/edit/${id}`
    }

    const handleDelete = async( id : number) =>{
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this data!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            });
            
            if (result.isConfirmed) {
                try {
                    const response = await fetch("http://localhost/Server/Content.php" ||'http://localhost:8080/contentapi/content', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id:id }),
                    });
                    const responseData = await response.json()
                    if (responseData.status === 200) {
                        await Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        );
                        window.location.reload();
                    } else {
                        Swal.fire(
                            'Delete Failed!',
                            'Your data was not deleted.',
                            'error'
                        );
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire(
                        'Error!',
                        'There was an error deleting your data.',
                        'error'
                    );
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire(
                'Error!',
                'There was an error processing your request.',
                'error'
            );
        }
    }
    const columns: TableColumn<tabledata>[] = [
        { name: 'ID', selector: (row: tabledata) => row.id, sortable: true, cell: (row : tabledata) =>
            <div className="cell">{row.id}</div>
        },
        {name: 'Title', selector: (row: tabledata) => row.title, sortable: false, cell: (row : tabledata) =>
            <div className="cell">{row.title}</div>
        },
        {name: 'Img', selector: (row: tabledata) => row.img, sortable: false, cell: (row : tabledata) =>
            <div className="cell"><Link to = {"http://localhost/Server/"+row.img}><img src={"http://localhost/Server/"+row.img} className="img-table" /></Link></div>
        },
        {name: 'Content', selector: (row: tabledata) => row.content, sortable: false, cell: (row : tabledata) =>
            <div className="cell-content">{row.content}</div>
        },
        {
            name: 'Edit',
            cell: (row: any) => (
                <div className="btn-con-table">
                    <button className="btn btn-success action-btn" onClick={() => handleEdit(row.id)}>Edit</button>
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
    ]
    return(
        <Slide_manage>
            <div className="section">
                <div className="container">
                    <div className="inside-con">
                        <div className="text-con">
                            <h1 className="text-title">Content Management</h1>
                        </div>
                        {!loading ? (<div className="add"><button className="btn btn-secondary add" onClick={handleAdd}>Add Content</button></div>
                        ):null}
                        <div className="container-table">
                            {loading ? (
                                <div className="container-loading">
                                    <span className="loader"></span>
                                </div>
                            ) : (
                            <>
                            <DataTable
                                columns={columns}
                                data={data}
                                pagination
                                highlightOnHover
                                theme="solarized"
                                subHeaderAlign={Alignment.RIGHT}
                                subHeader
                                subHeaderComponent={
                                    <div className="input">
                                        <input 
                                        type="text"
                                        placeholder="Search by url" 
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
            </div>
        </Slide_manage>
    );
}

export default ManageContent;