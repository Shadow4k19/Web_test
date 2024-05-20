import styled from "styled-components";

const FooterContainer = styled.footer`
    display: flex;
    justify-content: center;
    height: 150px;
    background-color: #680451;
    width: 100%;
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; /* Allow content to wrap onto multiple lines */
`;

const Letter = styled.h1`
    color: #fff;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.2);
    }
    
    @media screen and (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <ContentContainer>
                {['未','知','の','神'].map((letter, index) => (
                    <Letter key={index}>{letter}</Letter>
                ))}
            </ContentContainer>
        </FooterContainer>
    );
};

export default Footer;
