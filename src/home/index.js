import {useState} from 'react'
import { Layout } from 'antd';
import CarouselComponent from './carousel'
import Navbar from './navbar';
const { Header, Footer, Content } = Layout;

const Home = () => {
    return (  
        <Layout>
            <Header>
                <Navbar />
            </Header>
            <CarouselComponent />
            <Content></Content>
            <Footer>Footer</Footer>
        </Layout>
      );
}

export default Home;