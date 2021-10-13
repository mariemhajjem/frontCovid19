import { Route, Switch , Redirect,useHistory} from "react-router-dom";
import routes from "./content/routes"; 
import authProvider from '../../auth-provider'
import NotAuthorized from "../notAuthorized";
import Sidebar from "./content/sidebar";
import { Layout,Button } from "antd";
const { Header,Content } = Layout;
 
function Admin() {
    const history = useHistory();
     const auth=true;
     const handleMenuClick= () => {
      history.push("/");
    }
  return (/* authProvider.checkAuth()!==null && authProvider.IsWho()=="admin" ? ( */
    auth? (
      <Layout>
     <div className="wrapper" style={{"display": "flex" }}>
        <Sidebar routes={routes} /> 
        <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button type="primary" onClick={handleMenuClick} style={{ 'marginLeft': '90%' }}>Logout</Button>
        </Header>
        <Content
                className="site-layout-background"
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 'max-content',
                }}
              >
              <Switch>
                {routes.map((prop, key) => {
                  return (
                    <Route
                      exact
                      path={prop.layout + prop.path}
                      component={prop.component}
                      key={key}
                    />
                  );
                })}
              <Redirect to="/admin/dashboard" /> 
              </Switch>
            
              </Content>
            </Layout>
      </div> 
      </Layout>
  )  : <NotAuthorized /> )
  }
  
  export default Admin;