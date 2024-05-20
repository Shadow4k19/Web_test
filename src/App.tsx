import Home from './component/Home'
import Navbar from './component/Navbar'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './component/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import Register from './component/Register';
import NotFound from './component/NotFoundPage';
import SortingPage from './component/SortingPage';
import TicTacTo from './component/TicTacTo';
import Footer from './component/footer';
import MineSwiper from './component/Minesweeper';
import DashBoard from './component/Dashboard';
import User from './component/User';
import Edit_user from './component/Edit_user';
import Add_user from './component/Add_user';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import CookieConsent from "react-cookie-consent";
import Breakout from './component/Breakout';


interface Props{
  currentpath: string;
}

const App: React.FC<Props> = ({currentpath}: any) => {
  const [loginstatus , setLoginStatus] = useState(false);
  const [role, setRole] = useState('');
  useEffect(() => {
    if (Cookies.get('isLoggedIn')) {
      setLoginStatus(true);
      const roleCookie = Cookies.get('role');
      if (roleCookie !== undefined) {
        setRole(roleCookie);
      }
    }
  }, []);
  useEffect(()=>{
    Cookies.set('path', currentpath);
    console.log(Cookies.get('path'));
  },[currentpath])
  return (
    <>
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path="/login" element = {<Login /> } />
          <Route path='/register' element = {<Register />} />
          <Route path='/Sorting' element = {<SortingPage />} />
          <Route path='/TicTacTo' element = {<TicTacTo />} />
          <Route path='/MineSweeper' element = {<MineSwiper />} />
          <Route path='/Breakout' element = {<Breakout />} />
          {loginstatus ? (
            <>
              <Route path='/Dashboard' element={<DashBoard />} />
              {role === "admin" && (
                <>
                  <Route path='/usermanagement' element={<User />} />
                  <Route path='/edituser/:username' element={<Edit_user />} />
                  <Route path='/adduser' element={<Add_user />} />
                </>
              )}
            </>
          ) : null 
          }
          <Route path='*' element = {<NotFound />} />
        </Routes>
      </BrowserRouter>
      <CookieConsent
          location="bottom"
          buttonText="ยอมรับ"
          style={{ background: "#2B373B", fontSize: "13px"}}
          buttonStyle={{ color: "#fff", fontSize: "13px", background: "#DD4E2F"}}
        >
          เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพ และประสบการณ์ที่ดีในการใช้งานเว็บไซต์ คุณสามารถเลือกตั้งค่า<br/>ความยินยอมการใช้คุกกี้ได้ โดยคลิก "การตั้งค่าคุกกี้" นโยบายความเป็นส่วนตัว
      </CookieConsent>
      <Footer />
    </div>
    </>
  )
}

export default App
