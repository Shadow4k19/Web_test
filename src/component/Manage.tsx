import styled from "styled-components";


const ManageStyle = styled.div`
.section{
    height: auto;
    min-height: 100vh;
    padding: 120px 0 0 0;
}

.containerm{
    justifly-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
}
.manage-user-container{
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-gap: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #f9f9f9;
    margin-bottom: 30px;
    border: 2px solid #CFCBD0;
    border-radius: 5px;    
    padding: 7%;
}
  .card {
    width: 280px;
    max-width: 325px;
    background-color: #f0f0f0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .card:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }
  
  .card img {
    width: 100%;
    height: 200px;
  }
  
  .card-content {
    text-align: left;
    padding: 16px;
    max-width: 290px;
  }
  
  .card-content h3 {
    display: flex;
    font-size: 28px;
    margin-bottom: 8px;
    justify-content: center;
    align-items: center;
  }
  
  .card-content p {
    color: #666;
    font-size: 15px;
    line-height: 1.3;
  }
  
  .card-content .btn {
    display: inline-block;
    padding: 8px 16px;
    background-color: #333;
    text-decoration: none;
    border-radius: 4px;
    margin-top: 16px;
    color: #fff;
    width: 100%;
  }
  
  .card-content .btn:hover {
    transform: scale(0.95);
    transition: transform 0.3s ease-in-out;
  }
  .Title-text{
    font-size: 72px;
  }
  .text-con{
    text-align: center;
    margin-bottom: 20px;
    position: absolute;
    top: 70px;
    background-color: #FFEEA9;
    border: 2px solid #CFCBD0;
    border-radius: 5px;
    padding: 0 10px 0 0px;
    }

  .parent{
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 1000px){
    .manage-user-container{
      grid-template-columns: repeat(2, auto);
      padding: 12%;
    }
  }
  @media screen and (max-width: 768px){
    .manage-user-container{
        padding: 10% 5% 5% 5%;
    }
  } 
  @media screen and (max-width: 600px){
    .manage-user-container{
      grid-template-columns: repeat(1, auto);
      padding: 17%;
    }
  }
`;
const Manage : React.FC = () =>{

    return(
        <ManageStyle>
        <div className="section">
            <div className="containerm">
              <div className="parent">
                  <div className="text-con">
                      <h1 className="Title-text">Management</h1>
                  </div>
                </div>
                <div className="manage-user-container">
                    <div className="card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3z84CDh73AvrjclKR9lX2DnTXNL1hCjkrBg&s" 
                            alt="" />
                        <div className="card-content">
                            <h3>Manage User</h3>
                            <a href="/usermanagement" className="btn">Go Page</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3z84CDh73AvrjclKR9lX2DnTXNL1hCjkrBg&s" 
                            alt="" />
                        <div className="card-content">
                            <h3>Manage SlideShow</h3>
                            <a href="/manageslideshow" className="btn">Go page</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3z84CDh73AvrjclKR9lX2DnTXNL1hCjkrBg&s" 
                            alt="" />
                        <div className="card-content">
                            <h3>Manage Content</h3>
                            <a href="/managecontent" className="btn">Go page</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </ManageStyle>
    )

}

export default Manage;

