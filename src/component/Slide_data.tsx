import { useEffect, useState } from 'react';
import SlideShow from './Slide_show';

const SlideDataDefault = [
  { id: 1, url: 'https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1024/p:16x9/news_en_1920x1080.jpg' },
  { id: 2, url: 'https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1024/p:16x9/news_en_1920x1080.jpg' },
  { id: 3, url: 'https://s.france24.com/media/display/e6279b3c-db08-11ee-b7f5-005056bf30b7/w:1024/p:16x9/news_en_1920x1080.jpg' },
];

const dotColor = "#000";

interface Slide {
  id: number;
  url: string;
}

const SlideData: React.FC = () => {
  const [data, setData] = useState<Slide[]>(SlideDataDefault);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost/Server/Slideshow.php"||"http://localhost:8080/slideshowapi/slideshows", {
        method: 'GET',
      });
      const responseData = await response.json();
      if (responseData.status === 200) {
        const updatedData = responseData.data.map((slide: Slide) => ({
          ...slide,
          url: slide.url.startsWith('http://localhost/Server/')//Express use http://localhost:PORT/Folder_NAME/
            ? slide.url
            : `http://localhost/Server/${slide.url}`,//Express use http://localhost:PORT/Folder_NAME/
        }));
        setData(updatedData);
      } else {
        setData(SlideDataDefault);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <SlideShow slideData={data} transitionTime={3000} dotColor={dotColor} />
    </div>
  );
};

export default SlideData;
