import './App.css';
import Menu from './Menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './route-config';
import configureValidation from './Validation';
import { useEffect, useState } from 'react';
import { claim } from './auth/auth.models';
import AuthenticationContext from './auth/AuthenticationContext';
import { getClaims } from './auth/handleJWT';


configureValidation();

function App() {
  
  const [claims, setClaims] =useState<claim[]>([]);

  useEffect(() =>{
    setClaims(getClaims())
  }, [])

function isAdmin(){
  return claims.findIndex(claim => claim.name === 'role' && claim.value === 'admin') > -1;
}

 
  return(
    
    <BrowserRouter>
    <AuthenticationContext.Provider value={{claims, update: setClaims}}>

    
    <Menu/>
    <div className="container">
      { <Switch>
        {routes.map(route=><Route key={route.path} path={route.path} exact={route.exact}>
          <route.component/>
        </Route>)}    
      </Switch> }
       {/* <Switch>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}>
              {route.isAdmin && !isAdmin() ? <>
                You are not allowed to see this page
              </>:  <route.component/> }
             
            </Route>
        ))}
      </Switch> */}
    </div>
    <footer className="bd-footer py-5 mt-5 bg-dark text-white">
  <div className="container">
    <div className="row">
      <div className="col-lg-4">
        <h5>About Us</h5>
        <p>We are BMM Movies, your source for the latest movie information and news.</p>
      </div>
      <div className="col-lg-4">
        <h5>Explore</h5>
        <ul className="list-unstyled">
          <li><a href="#" style={{ textDecoration: 'none' }}>Home</a></li>
          <li><a href="#" style={{ textDecoration: 'none' }}>Movies</a></li>
          <li><a href="#" style={{ textDecoration: 'none' }}>Theaters</a></li>
          <li><a href="#" style={{ textDecoration: 'none' }}>Contact</a></li>
        </ul>
      </div>
      <div className="col-lg-4">
        <h5>Contact Us</h5>
        <p>Email: info@bmmmovies.com</p>
        <p>Phone: +1-123-456-7890</p>
      </div>
    </div>
    <hr className="my-4" />
    <p className="small">
      &copy; {new Date().getFullYear()} BMM Movies. All rights reserved.
    </p>
  </div>
</footer>


    </AuthenticationContext.Provider>
    </BrowserRouter>
  )
    
  
}

export default App;
