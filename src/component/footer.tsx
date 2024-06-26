import styled from "styled-components";

const FooterContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 90px;
    background-color: #FFBF78;
    width: 100%;
`;

const ContentContainer = styled.div`
    .container{
        display: grid;
        height: 100%;
        width: 100%;
        place-items: center;
    }
    .wrapper {
        display: inline-flex;
    }
    .wrapper .icon {
        margin: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        z-index: 2;
        cursor: pointer;
    }
    .wrapper .icon span {
        position: relative;
        z-index: 2;
        height: 40px;
        width: 40px;

        background: #fff;
        text-align: center;
        border-radius: 50%;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    }
    .wrapper .icon span i {
        font-size: 25px;
        line-height: 40px;
    }

    .wrapper .icon .tooltip {
        position: absolute;
        top: 0px;
        background: #fff;
        font-size: 20px;
        padding: 10px 18px;
        border-radius: 25px;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
        opacity: 0;
        pointer-events: none;
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    .wrapper .icon:hover .tooltip {
        top: -55px;
        opacity: 1;
        pointer-events: auto;
    }
    .wrapper .icon .tooltip:before {
        position: absolute;
        content: "";
        height: 15px;
        width: 15px;
        background: #fff;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
    }
    .wrapper .icon:hover span,
    .wrapper .icon:hover .tooltip {
        text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.4);
    }

    .wrapper .facebook:hover span,
    .wrapper .facebook:hover .tooltip,
    .wrapper .facebook:hover .tooltip:before {
        background: #3B5999;
        color: #fff;
    }

    .wrapper .twitter:hover span,
    .wrapper .twitter:hover .tooltip,
    .wrapper .twitter:hover .tooltip:before {
        background: #46C1F6;
        color: #fff;
    }

    .wrapper .instagram:hover span,
    .wrapper .instagram:hover .tooltip,
    .wrapper .instagram:hover .tooltip:before {
        background: #e1306c;
        color: #fff;
    }

    .wrapper .github:hover span,
    .wrapper .github:hover .tooltip,
    .wrapper .github:hover .tooltip:before {
        background: #333;
        color: #fff;
    }

    .wrapper .youtube:hover span,
    .wrapper .youtube:hover .tooltip,
    .wrapper .youtube:hover .tooltip:before {
        background: #DE463B;
        color: #fff;
    }
        
    @media screen and (max-width : 768px){
        .wrapper .icon {
            margin : 0 10px;
        }
    }
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <ContentContainer>
                <div className="container">
                    <div className="wrapper">
                        <div className="icon facebook">
                            <div className="tooltip">Facebook</div>
                            <span><i className="fab fa-facebook-f"></i></span>
                        </div>
                        <div className="icon twitter">
                            <div className="tooltip">Twitter</div>
                            <span><i className="fab fa-twitter"></i></span>
                        </div>
                        <div className="icon instagram">
                            <div className="tooltip">Instagram</div>
                            <span><i className="fab fa-instagram"></i></span>
                        </div>
                        <div className="icon github">
                            <div className="tooltip">Github</div>
                            <span><i className="fab fa-github"></i></span>
                        </div>
                        <div className="icon youtube">
                            <div className="tooltip">Youtube</div>
                            <span><i className="fab fa-youtube"></i></span>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </FooterContainer>
    );
};

export default Footer;
