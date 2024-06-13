
interface Carddata {
    id: any;
    img: string;
    title: string;
    content: string;
}

interface data {
    carddata : Carddata;
}

const Card : React.FC<data> = ({carddata}) =>{
    return (
        <div className="card">
            <img src = {carddata.img} 
                alt = ""/>
            <div className="card-content">
                <h3>{carddata.title}</h3>
                <div className="content-p">
                    <p>{carddata.content}</p>
                </div>
                <a href= {"News/" + carddata.id} className="btn">Go Page</a>
            </div>
        </div>
    )
}

export default Card;