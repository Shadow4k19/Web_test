import { useState } from "react";
import styled from "styled-components";
import LeftNav from "./LeftNav";

interface StyleBurgerProps {
    open: boolean;
}

const StyleBurger = styled.div<StyleBurgerProps>`
    width: 2rem;
    height: 2rem;
    position: fixed;
    top: 15px;
    right: 20px;
    z-index: 20;
    display: none;
    @media(max-width: 768px){
        display: flex;
        justify-content: space-around;
        flex-flow: column nowrap;
        color: #fff;
    }
    div {
        width: 2rem;
        height: 0.25rem;
        background-color: ${({ open }) => (open ? "#ccc" : "#000")};
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.3s linear;
        color: #fff;
        &:nth-child(1) {
            transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
        }
        &:nth-child(2) {
            transform: ${({ open }) =>
                open ? "translateX(-100%)" : "translateX(0)"};
            opacity: ${({ open }) => (open ? "0" : "1")};
        }
        &:nth-child(3) {
            transform: ${({ open }) =>
                open ? "rotate(-45deg)" : "rotate(0)"};
        }
    }
`;

const Burger : React.FC = () => {
    //burger menu
    const [open, setOpen] = useState(false);

    return (
        <div>
            <StyleBurger open={open} onClick={() => setOpen(!open)}>
                <div />
                <div />
                <div />
            </StyleBurger>
            <LeftNav open={open} />
        </div>
    );
};

export default Burger;
