import styled from 'styled-components';
import Burger from './Burger';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Nav = styled.nav`
    width: 100%;
    height: 55px;
    border-bottom: 2px solid #E7E3E3;
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    background: #fff;
    position: fixed;
    z-index: 999999;
    .logo {
        padding: 10px;
        color: #000;
    }
`;

const Navbar : React.FC = () =>{
    const [path, setPath] = useState<string | undefined>(undefined);
    useEffect(() =>{
        const path1 = Cookies.get('path');
        setPath(path1);
    }, [])

    return(
        <div className="background">
            <Nav>
                <div className="logo">
                    Web
                </div>
                <Burger />
            </Nav>
        </div>
    )
}

export default Navbar;
