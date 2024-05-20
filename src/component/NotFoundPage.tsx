import styled from "styled-components";

const StyleText = styled.div`
h1,h2{
    color: #000;
}
.container{
    display: flex;
    height: 100vh;
    justify-content: center;
    padding-top: 4%;
    align-items: center;
  }
@media(max-width:768px){
    padding-top: 7%;
}
`;

const NotFound =() =>{
    return(
        <StyleText>
            <div className="container">
                <div>
                    <h1>404 Not Found</h1>
                    <h2>Page Not Found</h2>
                </div>
            </div>
        </StyleText>
    )
}

export default NotFound;