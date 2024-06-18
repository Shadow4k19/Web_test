

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

const AddSlidestyle = styled.div`
    .img-upload {
        width: 260px;
        height: 150px;
        border-radius: 20px;
    }
    .drop-file-input__label p {
        display: flex;
        justify-content: center;
    }
    .drop-file-input {
        position: relative;
        width: 270px;
        height: 200px;
        border: 2px dashed #000;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }
    .drop-file-input input {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .drop-file-input:hover,
    .drop-file-input.dragover {
        opacity: 0.6;
    }
    .drop-file-input_label {
        text-align: center;
        color: #fff;
        font-weight: 600;
        padding: 10px;
    }

    .drop-file-preview p{
        font-weight: 500;
    }

    drop-file-preview_title{
        margin-bottom: 20px;
    }

    .drop-file-preview_item{
        position: relative;
        display: flex;
        margin-bottom: 10px;
        background-color: #fff;
        padding: 15px;
        border-radius: 20px;
        overflow: hidden;
        max-height: 100px;
    }

    .drop-file-preview_item img{
        width: 50px;
        margin-right: 20px;
    }

    .drop-file-preview_item_info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .drop-file-preview_item_del{
        backgriound-color: #fff;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: transalateY(-50%)
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .drop-file-preview_item:hover .drop-file-preview_item_del{
        opacity: 1;
    }
    .drop-file-preview_item_info p{
        padding-top: 15px; 
    }
`;

const EditSlide : React.FC = () =>{
    const { id } = useParams<{ id: string }>();
    const [file, setFile] = useState<File | null>(null);
    const [idx , setIdx] = useState();

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    useEffect (() => {
        fetchdata();
    },[])


    useEffect (() => {
        console.log(idx);
    },[idx])
    const fetchdata = async() =>{
        const response = await axios.get(`http://localhost/Server/Slideshow.php?id=${id}` || `http://localhost:8080/slideshowapi/slideshows/${id}`);
        console.log(response.data);
        if(response.data.status === 200){
            setIdx(response.data.data[0].id);
        }else{
            console.log("error");
        }
    }
    const onDragEnter = () => {
        wrapperRef.current?.classList.add('dragover');
    };

    const onDragLeave = () => {
        wrapperRef.current?.classList.remove('dragover');
    };

    const onDrop = () => {
        wrapperRef.current?.classList.remove('dragover');
    };

    const handleSubmit = async () => {
        console.log("Submitting");
        try {
            if (file && idx) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = async () => {
                    const base64Url: string | ArrayBuffer | null = reader.result;
                    if (typeof base64Url === 'string') {
                        const base64Data = base64Url.split(",")[1];
                        const requestData = {
                            id: idx,
                            url: base64Data,
                        };
                        const response = await axios.put("http://localhost/Server/Slideshow.php"||"http://localhost:8080/slideshowapi/slideshows", requestData, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        console.log(response.data);
                        if (response.status === 200) {
                            Swal.fire({
                                icon: "success",
                                text: response.data.message,
                            }).then(() => {
                                window.location.href = "/manageslideshow";
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                text: response.data.message || "Update failed",
                            });
                        }
                    } else {
                        console.error("Failed to read file as base64.");
                    }
                };
                reader.onerror = error => {
                    console.error('Error occurred while reading file:', error);
                };
            } else {
                Swal.fire({
                    icon: "warning",
                    text: "No file selected",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: `An error occurred during submission: ${error}`,
            });
        }
    };    

    const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const fileName = file.name.toLowerCase();
            if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
                setFile(file);
            } else {
                Swal.fire({
                    icon: "error",
                    text: 'Only PNG, JPG, and JPEG files are allowed.'
                });
                e.target.value = '';
            }
        }
    };    
    return(
        <AddSlidestyle>
        <div className="container-login">
            <div className="login-container">
                <form>
                    <h2 className="text-center">Edit Slide</h2>
                    <label htmlFor="username" className="form-label">Img</label>
                    <div
                        ref={wrapperRef}
                        className="drop-file-input"
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                    >
                        <div className="drop-file-input__label">
                            <img src="/upload.jpg" alt="img not found" className="img-upload" />
                            <p>Drag & Drop img here</p>
                        </div>
                        <input
                            type="file"
                            placeholder="IMG"
                            required
                            className="form-control input-width"
                            onChange={onFileDrop}
                        />
                    </div>
                    {file ? (
                        <div className="drop-file-preview">
                            <p className="drop-file-preview_title">
                                Ready to upload
                            </p>
                            <div className="drop-file-preview_item">
                                <img src="/blank_file.png" alt="" className="img-title"/>
                                <div className="drop-file-preview_item_info">
                                    <p>{file.name}</p>
                                </div>
                            </div>
                        </div>
                    ):(
                        <p>wait for upload</p>
                    )}
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
    </AddSlidestyle>
    )
}

export default EditSlide;
