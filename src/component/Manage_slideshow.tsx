import React, { useEffect, useState } from "react";
import 'datatables.net';
import styled from "styled-components";
import DataTable, { createTheme , TableColumn , Alignment} from 'react-data-table-component';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";


interface tabledata{
    id: number;
    url: string; 
}

interface Style {
    load : string;
}

const Slide_manage = styled.div<Style>`
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
        height : ${({ load }) => (load ==='true' ? '30rem' : 'auto')};
        align-content: center;  
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
        top: 70px;
        background-color: #CCBEBE;
        //border: 2px solid #000;
        border-radius: 5px;
        padding: 0 10px;
    }
    p{
        margin: 2% 0 0 0;
    }
    .cell{
        overflow: hidden;
    }
    .czxzHh{
        justify-content: center;
        overflow: hidden;
    }
    .kgJvFo{
        justify-content: center;
        padding: 0 0 0 2px;
        overflow: hidden;
    }
    .img-table{
        width: 190px;
        height: 100px;
        border-radius: 20px;
        padding: 15px;
    }

    .cell-id{
        padding : 0 0 0 30px;
    }

    .jfRBrS{
        background-color :  #CCBEBE;
    }

    .dbBgUh:disabled{
        fill : rgb(0 0 0 / 48%);
    }
    @media screen and (max-width:1200px){
        .btn-success, .btn-danger{
            width: 80px;
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
const ManageSlideshow : React.FC = () =>{

    const [loading , setLoading] = useState(true);
    const [filterdata, setFilteredata] = useState<tabledata[]>();
    const [search , setSerch] = useState("");

    const [data, setData] = useState<tabledata[]>()

    useEffect (() => {
        fetchdata();
    },[])

    useEffect(() => {
        const result = data?.filter((item) => {
          return item.id.toString().includes(search);
        });
        setFilteredata(result);
      }, [search]);

    const fetchdata = async() =>{
        try{
            const responsedata = await axios.get("http://localhost/Server/Slideshow.php" || "http://localhost:8080/slideshowapi/slideshows");
            if(responsedata){
                setData(responsedata.data.data);
                setFilteredata(responsedata.data.data);
                setLoading(false);
            }else{
                setLoading(true);
            }
        }catch(error){
            console.log(error);
        }
    } 

    const handleAdd = () =>{
        window.location.href = `/manageslideshow/add`;
    }
    const handleEdit = ( id : number) =>{
        window.location.href = `/manageslideshow/edit/${id}`;
    }

    const handleDelete = async (id: number) => {
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
                    const response = await axios.delete('http://localhost/Server/Slideshow.php' || 'http://localhost:8080/slideshowapi/slideshows', {
                        data: { id: id },
                    });
                    if (response.data.status === 200) {
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
    };
    
    const columns: TableColumn<tabledata>[] = [
        { name: 'ID', selector: (row: tabledata) => row.id, sortable: true, cell: (row : tabledata) =>
            <div className="cell-id">{row.id}</div>
        },
        {name: 'Img', selector: (row: tabledata) => row.url, sortable: false, cell: (row : tabledata) =>
            <div className="cell"><Link to = {"http://localhost/Server/"+row.url}><img src={`http://localhost/Server/${row.url}`} className="img-table"/></Link></div>
        },
        {
            name: 'Action',
            cell: (row: any) => (
                <div className="btn-con-table">
                    <button className="btn btn-success action-btn" onClick={() => handleEdit(row.id)}>Edit</button>
                    <button className="btn btn-danger action-btn" onClick={() => handleDelete(row.id)}>Delete</button>
                </div>
            ),
        },
    ]
    return(
        <Slide_manage load = {loading.toString()} >
            <div className="section">
                <div className="container">
                    <div className="inside-con">
                        <div className="text-con">
                            <h1 className="text-title">Slide Show Management</h1>
                        </div>
                        {!loading ? (<div className="add"><button className="btn btn-secondary add" onClick={handleAdd}>Add Slide</button></div>
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
                                data={filterdata || []}
                                pagination
                                highlightOnHover
                                theme="solarized"
                                subHeaderAlign={Alignment.RIGHT}
                                subHeader
                                subHeaderComponent={
                                    <div className="input">
                                        <input 
                                        type="number"
                                        placeholder="Search by id" 
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

export default ManageSlideshow;