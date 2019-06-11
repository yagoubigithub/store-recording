import React from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Deatils from './components/Deatils';
import Cart from './components/Cart';
import Default from './components/Default';


function App() {
  return (
   <React.Fragment>
     <Navbar />
     <ProductList />
     <Deatils />
     <Cart />
     <Default />
   </React.Fragment>
  );
}

export default App;
