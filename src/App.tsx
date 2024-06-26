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
import MineSwiper from './component/Minesweeper';
import DashBoard from './component/Dashboard';
import User from './component/Manage_User';
import Edit_user from './component/Edit_user';
import Add_user from './component/Add_user';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import CookieConsent from "react-cookie-consent";
import Tetris from './component/TeTris';
import Manage from './component/Manage';
import ManageSlideshow from './component/Manage_slideshow';
import ManageContent from './component/Manage_content';
import AddSlide from './component/Add_Slide';
import EditSlide from './component/Edit_Slide';
import AddContent from './component/Add_Content';
import EditContent from './component/Edit_content';
import NewsPage from './component/News_page';
import NewsPage_Default1 from './component/News_page_Default';
import NewsPage_Default2 from './component/News_page_Default2';


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
          <Route path='/News/Sorting' element = {<SortingPage />} />
          <Route path='/News/TicTacTo' element = {<TicTacTo />} />
          <Route path='/News/MineSweeper' element = {<MineSwiper />} />
          <Route path='/News/Tetris' element = {<Tetris />} />
          <Route path='/News/Default1' element = {<NewsPage_Default1/>} />
          <Route path='/News/Default2' element = {<NewsPage_Default2 />} />
          <Route path='/News/:id' element = {<NewsPage />} />
          {loginstatus ? (
            <>
              <Route path='/Dashboard' element={<DashBoard />} />
              {role === "admin" && (
                <>
                  <Route path='/usermanagement' element={<User />} />
                  <Route path='/edituser/:username' element={<Edit_user />} />
                  <Route path='/adduser' element={<Add_user />} />
                  <Route path='/Systemmanagement' element = {<Manage />}/>
                  <Route path='/manageslideshow' element = {<ManageSlideshow />}/>
                  <Route path='/managecontent' element = {<ManageContent />}/>
                  <Route path='/manageslideshow/add' element= {<AddSlide />} />
                  <Route path='/manageslideshow/edit/:id' element = {<EditSlide />}/>
                  <Route path='/managecontent/add' element = {<AddContent />} />
                  <Route path='/managecontent/edit/:id' element = {<EditContent />} />
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
    </div>
    </>
  )
}

export default App
