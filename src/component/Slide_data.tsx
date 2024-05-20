import SlideShow from './Slide_show';

const slideData = [
  { url: 'https://genshin.global/wp-content/uploads/2023/10/3rd-anniversary-official-wallpaper-genshin.jpg', title: 'Slide 1' },
  { url: 'https://webstatic.hoyoverse.com/upload/op-public/2023/09/14/3c862d085db721a5625b6e12649399bc_831075638778509921.png', title: 'Slide 2' },
  { url: 'https://s.isanook.com/ga/0/ud/220/1100377/honkaiimpact3(11).jpg', title: 'Slide 3'},
]

const dotColor = "#000";

const SlideData = () =>{
  return(
    <div className="container">
      <SlideShow slideData= {slideData} transitionTime = {3000} dotColor = {dotColor}/>
    </div> 
  )
}

export default SlideData;