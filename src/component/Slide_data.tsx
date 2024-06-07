import SlideShow from './Slide_show';

const slideData = [
  { url: 'https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1024/p:16x9/news_en_1920x1080.jpg' },
  { url: 'https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1024/p:16x9/news_en_1920x1080.jpg'},
  { url: 'https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1024/p:16x9/news_en_1920x1080.jpg'},
]

const dotColor = "#000";

const SlideData : React.FC = () =>{
  return(
    <div className="container">
      <SlideShow slideData= {slideData} transitionTime = {3000} dotColor = {dotColor}/>
    </div> 
  )
}

export default SlideData;