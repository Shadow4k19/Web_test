import styled from "styled-components";
import SlideData from "./Slide_data";
import Carddata from "./CardData";
import Footer from "./footer";
import Digital_Clock from "./Digital_Clock";

const HomeCon = styled.div`
  .container-home {
    padding-top: 7%;
    width: 100%;
    margin: 0;
    padding: 0;
    padding-top: 50px;
    overflow: hidden;
    background-color: #FEFFD2;
  }

  .slider-container {
    display: flex;
    width: 100%;
    background-color: #FFBF78;
  }

  .card-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-columns: repeat(3, auto);
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
    max-width: 270px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .card-content .content-p {
    max-height: 20px;
    overflow: hidden;
  }

  .card-content h3 {
    font-size: 26px;
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
    border-radius: 20px;
    margin-top: 16px;
    color: #fff;
    width: 100%;
  }

  .card-content .btn:hover {
    transform: scale(0.95);
    transition: transform 0.3s ease-in-out;
  }

  .about-container {
    display: flex;
    justify-content: center;
    width: 100%;
    animation: appear 1s ease-in-out;
  }

  .about-container img {
    display: flex;
  }

  .card-con {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
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
    margin-top: -80px;
  }

  .section3{
    position : relative;
    padding : 40px 0 0 0;
    margin : -40px 0 0 0;
  }

  .sub,
  .head {
    margin: 0 0 10px 0;
  }

  .sub {
    padding: 0 0 0 30px;
  }

  .head {
    padding: 0 0 0 20px;
  }

  .text-con {
    display: flex;
    justify-content: center;
    background-color: #FFBF78;
    transform: skewX(10deg);
    padding: 20px;
    margin: 20px 0 20px 40px;
    color: #fff;
    border-radius: 10px;
  }

  .time-con {
    display: flex;
    justify-content: center;
    justify-content: space-around
    width: 100%;
    margin : 0 0 0px 0;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
  }
  
  @keyframes appear-s{
    from{
      opacity: 0;
      transform: translateY(-100px);
    }
    to{
      opacity: 1;
      transform: translateY(0px);
    }
  }
  @keyframes appear-mid {
    from {
      opacity: 0;
      transform: translateX(-100px);
    }
    to {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  @keyframes appear-r{
    from{
      opacity: 0;
      transform: translateX(100px);
    }
    to{
      opacity: 1;
      transform: translateX(0px);
    }
  }

  @keyframes appear-b{
    from{
      opacity: 0;
      transform: translateY(100px);
    }
      to{
        opacity: 1;
        transform: translateY(0px);
      }
  }

  .block-s{
    animation: appear-s 1s ease-in-out;
  }
  .block-middle {
    animation: appear-mid 1s ease-in-out;
  }
  .block-middle-r{
    animation: appear-r 1s ease-in-out;
  }
  .block-b{
    animation: appear-b 1s ease-in-out;
  }
  
  .icon{
    padding : 0 5px 0 5px;
  }
  @media screen and (max-width: 1000px) {
    .card-container {
      grid-template-columns: repeat(2, auto);
    }
  }

  @media (max-width: 768px) {
    .card-con {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .content-container {
      align-items: center;
    }

    .head,
    .sub,
    {
      padding: 0 0 0 0;
    }
    .text-con {
      margin: 20px 0 20px 0;
      padding: 10px 20px 10px 20px;
    }
    img-con {
      margin: 0 0 0 0;
    }
  }

  @media screen and (max-width: 600px) {
    .card-container {
      grid-template-columns: repeat(1, auto);
    }
  }
`;

const Home = () => {
  return (
    <HomeCon>
      <div className="container-home">
        <div id="home" className="slider-container section block block-s">
          <SlideData />
        </div>
        <div id="time" className="time-con section2 block block-middle-r">
          <div className="card-con expand">
            <Digital_Clock />
          </div>
        </div>
        <div id="about" className="about-container section3 block block-middle">
          <div className="card-con">
            <div className="img-con">
              <img
                src="https://img.freepik.com/free-photo/business-financial-concept-with-magnifying-glass-question-mark-yellow-background-flat-lay_176474-6555.jpg"
                alt=""
                style={{ borderRadius: "5px", width: "250px", height: "300px" }}
              />
            </div>
            <div className="content-container">
              <div className="text-con">
                <h1 className="title">
                  <u>About Us</u>
                  <i className="fa fa-address-book icon"></i>
                </h1>
              </div>
              <h5 className="head"><i className="fa fa-user-circle icon"></i>Name:</h5>
              <h6 className="sub">Unknown</h6>
              <h5 className="head"><i className="fa fa-address-card icon"></i>Information:</h5>
              <h6 className="sub">
                Don't have information about this guy who made this website.
              </h6>
            </div>
          </div>
        </div>
        <div id="content" className="card-container section3 block block-b">
          <Carddata />
        </div>
        <Footer />
      </div>
    </HomeCon>
  );
};

export default Home;
