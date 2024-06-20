import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface Content {
    id: number;
    title: string;
    content: string;
    content2: string;
    content3: string;
    content4: string;
    img: string;
}


const NewsStyle = styled.div`
    .section {
        min-height: 100vh;
        height: auto;
        padding: 20px;
        background-color: #f5f5f5;
    }
    .container {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        overflow: hidden;
        background-color: #ffffff;
        border-radius: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        color: #333;
        margin-top: 70px;
    }
    .img-con img {
        width: 100%;
        border-radius: 20px;
    }
    .inside-con {
        margin-top: 20px;
    }
    .title-con {
        margin: 20px;
    }
    h2 {
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        color: #444;
        text-align: center;
    }
    .content-con {
        margin: 20px;
        width: auto;
    }
    h6 {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.75;
        word-break: break-word;
        letter-spacing: 0.25px;
        text-align: left;
    }
    p {
        text-indent: 4rem;
        line-height: 1.75;
        margin-bottom: 1.5rem;
        font-size: 16px;
        text-align: justify;
    }
    @media screen and (max-width : 768px){
        p {
            text-align : center;
        }
    }
`;

const NewsPage: React.FC = () => {
    const [data, setData] = useState<Content | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetchdata();
    }, [id]);

    useEffect (() => {
        console.log(error);
    },[error])

    const fetchdata = async () => {
        try {
            const response = await fetch(`http://localhost/Server/Content.php?id=${id}`, {
                method: 'GET',
            });
            const responseData = await response.json();
            if (responseData.status === 200) {
                setData(responseData.data[0]);
                setLoading(false);
            } else {
                setError("Failed to fetch data");
            }
        } catch (e) {
            console.error(e);
            setError("error to fetch");
        };
    }
    return (
        <NewsStyle>
            <div className="section">
                <div className="container">
                    <div className="content">
                        {!loading ? (
                            data && (
                                <>
                                    <div className="inside-con">
                                        <div className="img-con">
                                            <img src={"http://localhost/Server/"+data.img} alt={data.title} className="" />
                                        </div>
                                        <div className="title-con">
                                            <h2>{data.title}</h2>
                                        </div>
                                        <div className="content-con">
                                            <p>{data.content}</p>
                                            <p>{data.content2}</p>
                                            <p>{data.content3}</p>
                                            <p>{data.content4}</p>
                                        </div>
                                    </div>
                                </>
                            )
                        ) : (
                            <div className="container-loading">
                                <span className="loader"></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </NewsStyle>
    );
};

export default NewsPage;
