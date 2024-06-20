import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface Content {
    id: number;
    title: string;
    content: string;
    img: string;
}


const NewsStyle = styled.div`
    .section{
        min-height: 100vh;
        height: auto;
    }
    .container{
        width: 100%;
        overflow: hidden;
        background-color: #C3BCBC;
        border-radius: 20px;
        color: #000;
        margin: 70px 0 0 0;
    }
    .img-con img{
        width: 32rem;
        border-radius: 20px;
    }
    .inside-con{
        margin: 20px 0 0 0;
    }

    .title-con, content-con{
        margin: 20px 20px 0 20px;
    }
    
    .content-con{
        width: 100%;
    }
    h6{
        font-size: 16px;
        font-weight: 400;
        line-height: 2.25;
        word-break: break-word;
        letter-spacing: 0.25px;
        text-align: left;
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
                                            <h6>{"\t"+data.content}</h6>
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
