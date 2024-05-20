import styled from 'styled-components';
import Burger from './Burger';

const Nav = styled.nav`
    width: 100%;
    height: 55px;
    border-bottom: 2px solid #f1f1f1;
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(to right,#953892, #FF02FF);
    position: fixed;
    z-index: 999999;
    .logo {
        padding: 10px;
        color: #fff;
    }
`;

const Navbar = () =>{
    return(
        <div className="background">
            <Nav>
                <div className="logo">
                    MCOT
                </div>
                <Burger />
            </Nav>
        </div>
    )
}

export default Navbar;
