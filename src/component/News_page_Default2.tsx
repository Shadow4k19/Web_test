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


const NewsPage_Default2: React.FC = () => {
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
                                โฆษก ตร. ปัดตำรวจ สน.ทองหล่อ สองมาตรฐาน ไม่ให้ "หนุ่ม กรรชัย" เข้าห้องน้ำ หลังติดตามและสังเกตการณ์ในฐานะผู้เสียหายคดีครอบครัวเชื่อมจิต จนเกิดกระแสดราม่า ยันมีการทำความเข้าใจกันแล้ว สตช.จึงไม่ต้องตักเตือน เพราะ ตร.ไม่ได้ทำอะไรผิด
                            </p>    
                            <p>   
                                เมื่อวันที่ 5 มิ.ย. 67 พล.ต.ท.อาชยน ไกรทอง โฆษก ตร. กล่าวถึงประเด็นดราม่าท่าทีของตำรวจ สน.ทองหล่อ ที่ไม่อนุญาตให้ หนุ่ม กรรชัย พิธีกรชื่อดังเข้าห้องน้ำขณะไปติดตามและสังเกตการณ์ในฐานะผู้เสียหายคดีครอบครัวเชื่อมจิต จนเกิดกระแสดราม่าในโซเชียลมีเดีย ว่า ตั้งแต่วันเกิดเหตุได้มีการพูดคุยทำความเข้าใจกันทั้งสองฝ่ายแล้ว แต่ในเรื่องกระบวนการยุติธรรมต้องพูดคุยกัน โดยในส่วนของตำรวจก็ต้องมีการสื่อสารให้เป็นที่เข้าใจกันถึงหลักข้อกฎหมายการปฏิบัติ ส่วนประชาชนที่เข้ามาใช้บริการก็อาจจะมีความไม่เข้าใจบางอย่าง ก็มีการอธิบายให้เข้าใจ
                            </p>     
                            <p>  
                                ซึ่งในจุดนี้ตำรวจทุกนายและสถานีตำรวจทุกแห่งพร้อมจะให้บริการประชาชน ทั้งการแจ้งความ เรื่องการจะเข้าห้องน้ำไม่เคยกีดกัน แต่จะมีเหตุผลอยู่ที่ตำรวจต้องอธิบายให้ประชาชนเข้าใจในหลักการเรื่องการดูแลพื้นที่ และการรักษาความปลอดภัยให้เกิดความเรียบร้อย เพื่อให้กระบวนการสอบสวนเป็นไปด้วยความยุติธรรม ไม่ได้มีสองมาตรฐาน ตรงจุดนี้ต่างหากที่ตำรวจมุ่งเน้น ในส่วนที่มีปัญหาข้อขัดข้องหนักนิดเบาหน่อยก็ขอโทษกันไป
                            </p>
                            <p>   
                                โฆษก ตร. กล่าวอีกว่า เหตุการณ์ที่เกิดขึ้น สำนักงานตำรวจแห่งชาติไม่ได้ตักเตือน และยังไม่เห็นว่าตำรวจกระทำอะไรที่ผิด ในส่วนของผู้สื่อข่าวและตำรวจก็มีการเข้าใจกัน เพราะฉะนั้นนักข่าวที่ทำหน้าที่ที่สถานีตำรวจต้องเจอกับเจ้าหน้าที่ตำรวจ ก็ต้องมีการปรับความเข้าใจกัน ย้ำว่า ตร.ไม่ได้สั่งการให้ไปขอโทษ ไม่ได้เข้าไปยุ่งในเรื่องนี้ เพราะเป็นอำนาจหน้าที่ของ บก.น.5 และ สน.ทองหล่อ ที่จะไปพูดคุยสื่อสารกับนักข่าว เชื่อว่าคงคุยกันได้และเข้าใจกันอยู่แล้ว
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

export default NewsPage_Default2;