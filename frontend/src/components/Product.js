import React , {useContext ,useState} from 'react'
import { Link } from 'react-router-dom';
import {CartContext} from '../CartContext';


const Product = (props) => {

  const {cart , setCart} = useContext(CartContext);
  const [ isAdding, setIsAdding] = useState(false);
  const {product} = props;

  const cartToHandle = (event, product) => {
    event.preventDefault();

    let _cart = {...cart};
    if(!_cart.totalItems){
      _cart.totalItems = 0;
    }
    if(!_cart.items){
      _cart.items = {}
    }
    if(_cart.items[product.id]){
      _cart.items[product.id] += 1;
    } else {
      _cart.items[product.id] = 1;
    }


    _cart.totalItems += 1;
    setCart(_cart);
    setIsAdding(true);

    setTimeout(() => {
      setIsAdding(false);
    }, 2000);

  }
 
  return (
    <Link to={`/products/${product.id}`}>
    
    <div>
      <img src={product.thumbnail} style={{ width: 300, height:200 }} alt='pizza' />
      <div className='text-center'>
       <h2 className='text-lg font-bold py-2'>{product.title}</h2>
       <span className='bg-gray-200 py-1 px-4 rounded-full text-sm'>{product.category}</span>
      </div>
      <div className='flex items-center justify-between mt-4'>
        <span>$ {product.price}</span>
        <button disabled = {isAdding} onClick={(event) => {cartToHandle(event,product)}} className={`${isAdding ? 'bg-green-500' : 'bg-yellow-500'}  font-bold py-1 px-4 rounded-full`}>ADD{isAdding ? 'ED' : ''}</button>
      </div>
    </div>
    </Link>
  )
}

export default Product