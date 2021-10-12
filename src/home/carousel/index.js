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
                    <Title level={2}>09:18:19</Title> 
                </div> 
            </div> 
        </Carousel>
    );
}
export default CarouselComponent;