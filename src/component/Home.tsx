import { useEffect, useState } from "react";
import styled from "styled-components";
import SlideData from "./Slide_data";
import Cookies from "js-cookie";

const HomeCon = styled.div`
.container-home{
    padding-top: 7%;
    width: 100%;
    margin: 0;
    padding: 0;
    padding-top: 50px;
    overflow-x: hidden;
  }
  
  .slider-container {
    display: flex;
    width: 100%;
    background-color: #f7afe6;
    margin-bottom: 60px;
  }
  .card-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 20px;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    display: grid;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
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
    font-size: 28px;
    margin-bottom: 8px;
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
  
  .about-container{
    display: flex;
    justify-content: center;
    width:100%;
  }
  .about-container img{
    display: flex;
  }
  .card-con{
    display: flex;
    align-items: flex-start;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    flex-wrap: wrap;
    width: 720px;
    margin-bottom: 30px;
  }
  .section {
    position: relative;
    padding-top: 60px;
    margin-top: -60px;
  }
  .section2 {
    position: relative;
    padding-top: 60px;
    margin-top: -60px;
  }
  .sub, .head{
    margin: 0 0 10px 0;
  }
  .sub{
    padding: 0 0 0 30px;
  }
  .head{
    padding: 0 0 0 20px;
  }
  .text-con{
    padding: 0 0 10px 20px ;
  }
  .contact-us-con{
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .content-container{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
  }
  @media screen and (max-width: 1600px){
    .card-container{
      grid-template-columns: repeat(3, auto);
    }
  }
  @media screen and (max-width: 1000px){
    .card-container{
      grid-template-columns: repeat(2, auto);
    }
  }
  @media (max-width: 768px) {
    .card-con {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .content-container{
      align-items: center;
    }
    
    .head, .sub,{
      padding: 0 0 0 0;
    }
    .text-con{
      padding: 10px 0 0 20px;
    }
    img-con{
      margin: 0 0 0 0 ;
    }
  }
  @media screen and (max-width: 600px){
    .card-container{
      grid-template-columns: repeat(1, auto);
    }
  }
`
const Home = () => {
    const [loginstatus , setLoginStatus] = useState(false);
    useEffect(() =>{
      const check_Login = Cookies.get("isLoggedIn");
      if(check_Login){
        setLoginStatus(true);
      }
    },[])
    return (
        <HomeCon>
            <div className="container-home">
                <div id = "home" className="slider-container section">
                    <SlideData />
                </div>
                <div id = "about" className="about-container section2">
                <div className="card-con">
                    <div className="img-con">
                      <img src="https://img.freepik.com/free-photo/business-financial-concept-with-magnifying-glass-question-mark-yellow-background-flat-lay_176474-6555.jpg" alt="" style={{borderRadius: "5px", width: "250px", height: "300px"}}/>
                    </div>
                    <div className="content-container">
                      <div className="text-con" style={{marginRight: "20px"}}>
                        <h1><u>About Us</u></h1>
                      </div>
                      <h5 className="head">Name:</h5>
                      <h6 className="sub">Unknown</h6>
                      <h5 className="head">Information:</h5>
                      <h6 className="sub">Don't have information about this guy who made this website.</h6>
                    </div>
                  </div>
                </div>
                <div id = "contact" className="contact-us-con section2">
                <div className="card-con">
                    <div className="content-container">
                      <div className="text-con">
                        <h1><u>Contact us</u></h1>
                      </div>
                      <h5 className="head">Tel:</h5>
                      <h6 className="sub">094-999-1234</h6>
                      <h5 className="head">Address:</h5>
                      <h6 className="sub">Somewhere in the universe</h6>
                    </div>
                    <div className="img-con">
                      <img src="https://img.freepik.com/free-photo/business-financial-concept-with-magnifying-glass-question-mark-yellow-background-flat-lay_176474-6555.jpg" alt="" style={{borderRadius: "5px", width: "250px", height: "300px"}}/>
                    </div>
                  </div>
                </div>
                <div id = "content" className="card-container section">
                    <div className="card">
                        <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvoepvuPOUAdZrY-BKITIPcAjDxnVIgkXskA&usqp=CAU" 
                            alt = ""/>
                        <div className="card-content">
                            <h3>Tic Tac To Game</h3>
                            <p>Tic Tac To Game</p>
                            <a href="/Tictacto" className="btn">Go Page</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src = "https://embed-ssl.wistia.com/deliveries/70d6f4e10e2badb5ef394f00c17ad2bc1c14f6e7.jpg" 
                            alt = ""/>
                        <div className="card-content">
                            <h3>Sorting</h3>
                            <p>Sorting</p>
                            <a href="/Sorting" className="btn">Go Page</a>
                        </div>
                    </div>
                    <div className="card">
                         <img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQThD0ONdOv7djwPaR2Sjp9eWc3p6Z0HAHRCg&usqp=CAU"
                            alt = ""/>
                        <div className="card-content">
                            <h3>MineSweeper</h3>
                            <p>Game MineSweeper</p>
                            <a href="/MineSweeper" className="btn">Go Page</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src = "https://images.klipfolio.com/website/public/5a275fee-d42b-4f31-91f6-8148d4d729af/executive%20dashboard.png" 
                            alt = ""/>
                        <div className="card-content">
                            <h3>Dashboard</h3>
                            <p>Dashboard</p>
                            {loginstatus ?(<a href="/Dashboard" className="btn">Go Page</a>):(<a href="/login" className="btn">Go Page</a>)}
                        </div>
                    </div>
                    <div className="card">
                        <img src = "https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1" 
                            alt = ""/>
                        <div className="card-content">
                            <h3>Card5</h3>
                            <p>Don't Have</p>
                            <a href="/NotFound" className="btn">Go Page</a>
                        </div>
                    </div>
                    <div className="card">
                        <img src = "https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1" 
                            alt = ""/>
                        <div className="card-content">
                            <h3>Card6</h3>
                            <p>Don't Have</p>
                            <a href="/NotFound" className="btn">Go Page</a>
                        </div>
                    </div>
                </div>
            </div>
        </HomeCon>
    );
};

export default Home;
