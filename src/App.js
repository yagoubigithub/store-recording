import React from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Deatils from './components/Deatils';
import Cart from './components/Cart';
import Default from './components/Default';
import {Switch,Route} from 'react-router-dom';

function App() {
  return (
   <React.Fragment>
     <Navbar />
     <Switch>
       <Route exact path='/' component={ProductList}  />
       <Route path='/details' component={Deatils}  />
       <Route path='/cart' component={Cart}  />
       <Route  component={Default}  />
     </Switch>
    
    
   
   </React.Fragment>
  );
}

export default App;
