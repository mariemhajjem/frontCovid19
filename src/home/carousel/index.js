import { Carousel, Image, Typography } from 'antd';
import tal from "../../img/box-img2.jpg";
const { Title } = Typography;
const contentStyle = {
  height: '600px',
  color: '#fff',
  lineHeight: '600px',
  textAlign: 'center',
  background: '#364d79',
}; 
function getCurrentDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  }
const CarouselComponent = () => {
  return (
        <Carousel autoplay>
            <div> 
                <Image.PreviewGroup>
                    <Image src={tal} className="full" style={contentStyle} />
                    <Image src={tal} className="full" style={contentStyle} />
                   
                </Image.PreviewGroup>
                
            </div>
            <div>
                
                <div style={contentStyle}> 
                    <Title>Nombre d'inscrits</Title>
                    <Title level={2}>6470552</Title>
                    <Title level={2}>Date : { getCurrentDate()}</Title> 
                </div> 
            </div> 
        </Carousel>
    );
}
export default CarouselComponent;