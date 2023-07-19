import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import { CartContext } from '../CartContext';
function Navbar() {
  const cartStyle = {
    display: 'flex',
    background: '#F59E0D',
    padding: '6px 12px',
    borderRadius: '50px'
  }
  const {cart} = useContext(CartContext);
  return (
    <>
    <nav className='container mx-auto flex items-center justify-between py-4'>
        <div  className='flex items-center justify-between'>
        <Link to={'/'}><img style = {{ height: 45}} src='/images/logo.svg' alt='SparkleShack-logo'/></Link>
         <h4 className='font-bold  ml-4'>Sparkle Shack</h4>
        </div>
        <ul className='flex items-center'>
            <li><Link to={'/'}>Home</Link></li>
            <li className='ml-6'><Link to={'/products'}>Product</Link></li>
            <li className='ml-6'>
        <Link to={'/cart'}>

         <div style={cartStyle}>
          <span>{cart.totalItems ? cart.totalItems : 0}</span>
          <img className='ml-2' src='/images/cart.png' alt='cart-icon'/>
         </div>
          </Link>
          </li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar