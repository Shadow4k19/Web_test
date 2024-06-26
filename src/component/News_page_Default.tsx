import styled from "styled-components";

const NewsStyle = styled.div`
    .section {
        min-height: 100vh;
        height: auto;
        padding: 20px;
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
    .ref-con{
        display: flex;
        justify-content: flex-end;
    }
    @media screen and (max-width : 768px){
        p {
            text-align : center;
        }
    }
`;


const NewsPage_Default1: React.FC = () => {
    return (
        <NewsStyle>
            <div className="section">
                <div className="container">
                    <div className="inside-con">
                        <div className="img-con">
                            <img src="https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1024/p:16x9/news_en_1920x1080.jpg" 
                                alt="" 
                                className="" />
                        </div>
                        <div className="title-con">
                            <h2>Test</h2>
                        </div>
                        <div className="content-con">
                            <p>
                                ผู้การ 5 พาลูกน้อง ตำรวจ สน.ทองหล่อ พบหนุ่ม กรรชัย ขอโทษ ปรับความเข้าใจ แจงเหตุห้ามไม่ให้เข้าห้องน้ำ ส่วนคดีครอบครัวน้องไนซ์เชื่อมจิต แจ้งความเอาผิดพิธีกรดัง กับต้นอ้อ เพจเป็นหนึ่ง ผกก.ทองหล่อ ชี้ถ้ามีมูลต้องดำเนินคดี เมื่อช่วงบ่ายวันที่ 4 มิถุนายน 2567 ที่อาคารมาลีนนท์ ถนนพระราม 4 เขตคลองเตย 
                            </p>    
                            <p>   
                                กทม. พล.ต.ต.วิทวัฒน์ ชินคำ ผบก.น.5 พร้อมด้วย พ.ต.ท.ณัฐกิตติ์ จอกโคกสูง รอง ผกก.ป. และ พ.ต.ต.กฤษฎา ขอประเสริฐ สวป.สน.ทองหล่อ เดินทางมาพบ นายภูดิท หรือหนุ่ม กรรชัย กำเนิดพลอย พิธีกรรายการโหนกระแส เพื่อชี้แจงทำกรณีเจ้าหน้าที่ตำรวจ สน.ทองหล่อ ห้ามไม่ให้หนุ่ม กรรชัย เข้าไปปัสสาวะในห้องน้ำโรงพัก พล.ต.ต.วิทวัฒน์ กล่าวว่า สาเหตุที่มาเพราะต้องการอธิบายขั้นตอน เมื่อวานนี้ให้กับทางหนุ่ม กรรชัย และทีมงาน เพราะน้องๆ ส่วนหนึ่งที่ทำงานท่ามกลางความกดดัน และไม่อยากให้เกิดกระทบกระทั่งกันทั้งสองฝ่าย ซึ่งบางครั้งการตัดสินใจอาจจะยังไม่สมบูรณ์ ในฐานะที่ตนเป็นผู้บังคับการตำรวจนครบาล 5 อะไรที่ทำให้เกิดความไม่เข้าใจทั้งสองฝ่าย ต้องขอโทษแทนน้องๆ ด้วย 
                            </p>     
                            <p>  
                                ด้านหนุ่ม กรรชัย กล่าวว่า ส่วนตัวไม่ได้ติดใจ แต่มีความไม่สบายใจเกิดขึ้น เพราะเป็นเรื่องของมาตรฐาน บรรทัดฐานที่จะเกิดขึ้น ตนเองเข้าใจว่าในส่วนของผู้ต้องหาที่มารับทราบข้อกล่าวหา แต่จริงๆ มันทำให้สังคมมองเรื่องของการดูแลปกป้องเขา ทั้งที่ตนเป็นเจ้าทุกข์ ทำให้เกิดความไม่สบายใจว่าคดีความจะถึงตรงไหน หนุ่ม กรรชัย กล่าวอีกว่า ในฐานะที่ตนก็เป็นผู้ถูกกล่าวหา และไปแจ้งความไว้ แต่ได้รับการปฎิบัติไม่ได้เหมือนกับผู้เสียหาย 
                            </p>
                            <p>   
                                แต่ผู้ถูกกล่าวหากลับได้รับการปฎิบัติแบบวีไอพี มีการปกป้องทุกอย่าง สุดท้ายรถออกไป ก็ยังมีรถตามไปอีก ในขณะที่ตนเองเป็นผู้เสียหาย ต้องนั่งรถมอเตอร์ไซค์กลับบ้าน จึงกังวลว่า ถ้าตาสีตาสาจะทำยังไง รู้สึกเป็นห่วงประชาชน และมองว่าการให้พิมพ์ลายนิ้วมือข้างล่าง จะกลายเป็นบรรทัดฐานในเคสอื่นๆ
                            </p>
                            <div className="ref-con">
                                <p className="ref"> 
                                    Referance by thairath tv ทำเพื่อฝึกพัฒนาเว็บไซต์เท่านั้น
                                </p> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NewsStyle>
    );
};

export default NewsPage_Default1;
