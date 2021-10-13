import Dashboard from "./dashboard"; 
import CentersList from "./centers/centers-list";  
import { 
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
 } from "@ant-design/icons";
var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <PieChartOutlined />,
    component: Dashboard,
    layout: "/admin",
  },  
  {
    path: "/CentersList",
    name: "Centers List",
    icon: <AppstoreOutlined />,
    component: CentersList,
    layout: "/admin",
  },  
  {
    path: "/PharmacyList",
    name: "Pharmacy List",
    icon: <AppstoreOutlined />,
    component: CentersList,
    layout: "/admin",
  }    
];
export default dashRoutes;
