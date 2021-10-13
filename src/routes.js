import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  Admin  from './components/admin'; 
import  User  from './components/user';
import  Auth  from './components/auth';
import  Operator  from './components/operator'; 
import NotAuthorized from './components/notAuthorized';
import Drop from './dropdown';
import Home from './home';
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact from="/" to="/Home" >
        <Home />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route path="/user">
        <User />
      </Route>
      <Route path="/operator">
        <Operator />
      </Route>
      <Route path="/login">
        <Auth />
      </Route>
      <Route path="/drop">
        <Drop />
      </Route>
      {/* <Route exact path="/userDetails/:id">
        <UserDetails />
      </Route>   */}
      <Route exact path="/Not-authorized">
        <NotAuthorized />
      </Route>
    </Switch>
  </BrowserRouter>
);
export default Routes;