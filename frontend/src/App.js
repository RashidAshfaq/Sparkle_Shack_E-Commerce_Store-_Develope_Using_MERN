import React from 'react';
import {BrowserRouter , Route , Routes} from 'react-router-dom';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Cart from './pages/Cart';
import { useState , useEffect} from 'react';
import SingleProduct from './pages/SingleProduct';
import SuccessPage from './pages/SuccessPage';
import Navbar from './components/Navbar';
import {CartContext} from './CartContext';
import {getCart, storeCart} from './Helpers';

function App() {

  const [cart, setCart] = useState({});

  useEffect(() => {
 getCart().then( (cart) => {
   setCart(JSON.parse(cart));
 })
  }, [])

  useEffect(() => {
    storeCart(JSON.stringify(cart));
   }, [cart])
  
  return (
    <>
    <BrowserRouter>
    <CartContext.Provider value={{cart, setCart}}>
    <Navbar/>
    <Routes>
      <Route path='/' Component={Home} exact></Route>
      <Route path='/products' Component={ProductsPage} exact></Route>
      <Route path='/products/:id' Component={SingleProduct} ></Route>
      <Route path='/cart' Component={Cart} ></Route>
      <Route path='/success' Component={SuccessPage}></Route>
    </Routes>
    </CartContext.Provider>
    </BrowserRouter>
    </>
  )
}

export default App