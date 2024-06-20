import { useState, useRef, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

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
    }

    .drop-file-preview_item img{
        width: 50px;
        margin-right: 20px;
    }

    .drop-file-preview_item_info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        max-height: 60px;
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
    .container-login{
        padding: 60px 0 20px 0;
    }
`;

const EditContent = () => {
    const { id } = useParams<{ id: string }>();
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
  
    useEffect(() => {
      fetchdata();
    }, []);
  
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost/Server/Content.php?id=${id}` || `http://localhost:8080/contentapi/content/${id}`);
        if (response.data.status === 200) {
          setContent(response.data.data[0].content);
          setTitle(response.data.data[0].title);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
  
    const wrapperRef = useRef<HTMLDivElement | null>(null);
  
    const onDragEnter = () => {
      wrapperRef.current?.classList.add("dragover");
    };
  
    const onDragLeave = () => {
      wrapperRef.current?.classList.remove("dragover");
    };
  
    const onDrop = () => {
      wrapperRef.current?.classList.remove("dragover");
    };
  
    const handleSubmit = async () => {
        try {
          if (!title || !content) {
            Swal.fire({
              icon: "warning",
              text: "Title and content are required",
            });
            return;
          }
    
          let requestData: any = {
            title: title,
            content: content,
            id: id,
          };
    
          if (file) {
            const base64Data = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                const base64Url = reader.result as string;
                resolve(base64Url.split(",")[1]);
              };
              reader.onerror = (error) => reject(error);
            });
            requestData.img = base64Data;
          }
    
          const response = await axios.put("http://localhost/Server/Content.php"||"http://localhost:8080/contentapi/content", requestData, {
            headers :{
                'Content-Type': 'application/json',
            }
          });
          if (response.data.status === 200) {
            Swal.fire({
              icon: "success",
              text: response.data.message,
            }).then(() => {
              window.location.href = "/managecontent";
            });
          } else {
            Swal.fire({
              icon: "error",
              text: response.data.message,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: "An error occurred during submission",
          });
        }
      };
  
      const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const fileName = file.name.toLowerCase();
            const maxSize = 500000; 
    
            if (file.size > maxSize) {
                Swal.fire({
                    icon: "error",
                    text: 'File size exceeds the 500 KB limit.'
                });
                e.target.value = '';
                return;
            }
    
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
  
    return (
      <AddSlidestyle>
        <div className="container-login">
          <div className="login-container">
            <form>
              <h2 className="text-center">Edit Content</h2>
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control input-width"
                value={title}
                required
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                className="form-control input-width"
                value={content}
                required
                placeholder="content"
                onChange={(e) => setContent(e.target.value)}
              />
              <label htmlFor="img" className="form-label">
                Img
              </label>
              <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                <div className="drop-file-input__label">
                  <img src="/upload.jpg" alt="WHERE IS IMG" className="img-upload" />
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
                  <p className="drop-file-preview_title">Ready to upload</p>
                  <div className="drop-file-preview_item">
                    <img src="/blank_file.png" alt="" className="img-title" />
                    <div className="drop-file-preview_item_info">
                      <p>{file.name}</p>
                    </div>
                  </div>
                </div>
              ) : (
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
    );
  };
  
  export default EditContent;