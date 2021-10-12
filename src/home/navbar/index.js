import { Row, Col,Button, Image } from "antd"; 
import { useTranslation } from "react-i18next";
import {useState} from 'react' 
import logo from "../../img/logoTun.png";
import i18n from "../../translations/i18n";
import "./Navbar.css";
const styles = {
  color : "white",
  paddingTop : 15
}
function Navbar() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState();
 
  const handleOnclick = (e)=>{
    e.preventDefault();
    console.log(e.target.value)
    setLanguage(e.target.value);
    console.log(language)
    i18n.changeLanguage(e.target.value);
  }
  return ( 
       <>  
        <Row >
            <Image src={logo} className="logos" />
            <Button className="button-text" style ={styles} type="text">{t("welcome")}</Button>
            <Button className="button-text" style ={styles} type="text">FAQ</Button> 
            <Button className="button-text" style ={styles} type="text">Contactez-nous</Button>
           
            <Button className="button-text" style ={styles} type="text">Inscription Pharmacie</Button>
            
            <Button className="button-text" style ={styles} type="text">S'inscrire</Button>
         
            <Button className="button-text" style ={styles} value="en" onClick={handleOnclick} type="text">English</Button>
           
            <Button className="button-text" style ={styles} value="fr" onClick={handleOnclick} type="text">français</Button>
           
        </Row>  
       </> 
  );
}
export default Navbar;
