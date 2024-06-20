import { useEffect, useState } from 'react';
import { BsFillArchiveFill} from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line} from 'recharts';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import axios from 'axios';

const DashBoardstyle = styled.div`

  .con-dash{
    padding: 50px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #CCBEBE;
    border-radius: 5px;
    height: auto;
    min-height: 100vh;
  }

  .container-xxl{
    padding-top: 100px;
    padding-bottom: 100px;
    overflow-x: hidden;
  }
  
  .main-title {
    display: flex;
    justify-content: center;
  }

  .main-title h3{
    font-size: 37px;
  }
  
  .main-cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 20px;
    margin: 15px 0;
  }
  
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 8px 15px;
    border-radius: 5px;
  }

  .card:hover{
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
  }
  
  .card:first-child {
    background-color: #2962ff;
  }
  
  .card:nth-child(2) {
    background-color: #ff6d00;
  }
  
  .card:nth-child(3) {
    background-color: #2e7d32;
  }
  
  .card:nth-child(4) {
    background-color: #d50000;
  }
  
  .card-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .card-inner > .card_icon {
    font-size: 25px;
  }
  
  .charts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 60px;
    height: auto;
  }
  /* End Main  */
  
  /* <= 1200px */
  
  @media screen and (max-width: 1200px){
    .charts {
      grid-template-columns: 1fr;
      margin-top: 30px;
    }
  }
  /* Medium <= 992px */
    
  @media screen and (max-width: 992px) {
    .grid-container {
      grid-template-columns: 1fr;
      grid-template-rows: 0.2fr 3fr;
      grid-template-areas:
        'main';
    }
    
    .menu-icon {
      display: inline;
    }
  
    .sidebar-title > span {
      display: inline;
    }
  }
  /* Small <= 768px */
    
  @media screen and (max-width: 768px) {
    .main-cards {
      grid-template-columns: 1fr;
      gap: 10px;
      margin-bottom: 0;
    }
  
  }
  
  /* Extra Small <= 576px */
  
  @media screen and (max-width: 576px) {
    .hedaer-left {
      display: none;
    } 
  }
`

interface DataObject {
  id: number;
  username: string;
  Feburary: number;
  March: number;
  April: number;
}
type MonthData = {
  Month: string;
  Primogem: number;
};

const DashBoard: React.FC = () => {
  const [loginstatus, setLoginStatus] = useState(false);
  const [username, setUser] = useState('');
  const [data, setData] = useState<DataObject[]>([]); 
  const [loading, setLoading] = useState(true);   
  const [graph, setGraph] = useState<MonthData[]>([
    {Month: 'Feburary', Primogem: 0},
    {Month: 'March', Primogem: 0},
    {Month: 'April', Primogem: 0}
  ]);
  
  useEffect(() => {
    if (Cookies.get('isLoggedIn')) {
      setLoginStatus(true);
      const user = Cookies.get('username');
      if (user !== undefined) {
        setUser(user);
      }
    }
  }, []);

  useEffect(() =>{
    fetchData();
  },[username , loginstatus]);

  useEffect(() =>{
      const month : string[] = ['Feburary', 'March', 'April']
      addNewMonthData(month, data);
  }, [data])
  
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const addNewMonthData = (months: string[], newData: DataObject[]) => {
    const newState: MonthData[] = [];
    for(let i = 0 ; i < months.length ; i++){
        const newMonthData: MonthData = {
          Month : months[i] ?? 'unknow',
          Primogem : (newData as any)[months[i]] ?? 0,
        };
        newState.push(newMonthData);
      }
    setGraph(newState);
  };
  
  

  const fetchData = async () => {
    if (loginstatus && username) {
      try {
        const response = await axios.get(`http://localhost/Server/DashBoard.php?username=${username}` || `http://localhost:8080/dashboardapi/dashboard/${username}`);
        if (response.data.status === 200) {
          const responseData = response.data.data;//Express use const responseData = response.data.data[0];
          setData(responseData); 
          setLoading(false); 
        } else {
          console.error("Can't fetch data");
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <DashBoardstyle>
    <div className='container-xxl'>
      <div className="con-dash">
        <div className='main-title'>
          <h3 style={{fontSize:"46px"}}>DASHBOARD</h3>
        </div>
        <div className='main-cards'>
          {loading ? (
            <p></p>
          ) : (
            <>
              <div className='card'>
                <div className='card-inner'>
                  <h3>Overall</h3>
                  <BsFillArchiveFill className='card_icon' />
                </div>
                <h1>{Number((data as any)['Feburary']) + Number((data as any)['March']) + Number((data as any)['April'])}</h1>
              </div>
              <div className='card'>
                <div className='card-inner'>
                  <h3>February</h3>
                </div>
                <h1>{Number((data as any)['Feburary']) }</h1>
              </div>
              <div className='card'>
                <div className='card-inner'>
                  <h3>March</h3>
                </div>
                <h1>{Number((data as any)['March'])}</h1>
              </div>
              <div className='card'>
                <div className='card-inner'>
                  <h3>April</h3>
                </div>
                <h1>{Number((data as any)['April'])}</h1>
              </div>
            </>
          )}
        </div>
        <div className='charts'>
          {loading ? (
            <div className="container-loading">
              <span className="loader"></span>
            </div>
          ) : (
            width < 600 ? (
              <BarChart
                width={350}
                height={300}
                data={graph}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Primogem" fill="#C412CF" />
              </BarChart>
            ) : (
              <BarChart
                width={600}
                height={300}
                data={graph}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Primogem" fill="#C412CF" />
              </BarChart>
            )
          )}
          {loading ? (
            <div className="container-loading">
              <span className="loader"></span>
            </div>
          ) : (
            width < 600 ? (
            <LineChart
              width={350}
              height={300}
              data={graph}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Primogem" stroke="#C412CF" />
            </LineChart>
              ):(
            <LineChart
              width={600}
              height={300}
              data={graph}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Primogem" stroke="#C412CF" />
            </LineChart>
        ))}
        </div>
      </div>
    </div>
  </DashBoardstyle>
  ) 
}

export default DashBoard;