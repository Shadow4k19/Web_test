import { useEffect, useState } from "react";
import Card from "./Card";

interface data{
    id : any;
    title : string;
    content: string;
    img : string;
}

const CarddataDefault : data[]= [
    {   
        id : "Tictacto",
        title : "Tic Tac To Game",
        content: "Tic Tac To Game",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvoepvuPOUAdZrY-BKITIPcAjDxnVIgkXskA&usqp=CAU",
    },
    {
        id : "Sorting",
        title : "Sorting",
        content : "Sorting",
        img : "https://embed-ssl.wistia.com/deliveries/70d6f4e10e2badb5ef394f00c17ad2bc1c14f6e7.jpg",
    },{
        id: "MineSweeper",
        title : "MineSweeper",
        content : "Game MineSweeper",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQThD0ONdOv7djwPaR2Sjp9eWc3p6Z0HAHRCg&usqp=CAU",
    },{
        id : "TeTris",
        title : "Tetris",
        content : "Tetris GAME",
        img : "https://play-lh.googleusercontent.com/ILMYT7PYDpF1771O6lixyX01a3JEGYKotMshaq6rFFxQnZPGb_byVbfgMZRJlG4pITJPfqoUC0g=w1296-h2160-rw",
    },{
        id : "NotFound",
        title : "Card",
        content : "Don't Have",
        img : "https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1",
    }
]
const Carddata : React.FC = () =>{
    const [data, setData] = useState<data[]>(CarddataDefault);
    
    useEffect (() => {
        fetchdata();
    },[]);

    const fetchdata = async() => {
        try{
            const response = await fetch("http://localhost/Server/Content.php"||"http://localhost:8080/contentapi/content",{
                method : 'GET',
            });
            const responseData = await response.json();
            if(responseData.status === 200){
                const updateData = responseData.data.map((content: data) =>({
                    ...content,
                    img: content.img.startsWith('http://localhost/Server/')//Express use http://localhost:PORT/Folder_NAME/
                        ? content.img
                        :`http://localhost/Server/${content.img}`,//Express use http://localhost:PORT/Folder_NAME/
                }));
                setData(updateData);
            }else{
                setData(CarddataDefault);
            }
        }catch(error){
            console.log(error);
        }
    }
    return(
        <div className="card-container">
            {data.map((card, index) => (
                <Card key={index} carddata={card} />
            ))}
        </div>
    )
}

export default Carddata;