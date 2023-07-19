import {useContext, useEffect, useState} from 'react'
import {CartContext} from '../CartContext';
import PayButton from '../components/PayButton';

const Cart = () => {
  
  const {cart , setCart} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [priceFetch, togglePriceFetched] = useState(false);
  useEffect(() => { 
  
    if(!cart.items){
      return;
    }
    const fetchData = async () => {
     
      
       if(!cart.items){
        return;
       }
       if(priceFetch) {
        return;
       }
        const itemIds = Object.keys(cart.items);
        if(itemIds){

          const fetchedData = [];
          for (let i = 0; i < itemIds.length; i++) {
            const itemId = itemIds[i];
            const response = await fetch(`https://dummyjson.com/products/${itemId}`);
            const itemData = await response.json();
            fetchedData.push(itemData);
          }
          
          setProducts(fetchedData);
          togglePriceFetched(true);
        }
      
    };
    fetchData();

  }, [cart,priceFetch])

  let total = 0;
  const getQty = (productId) => {
    return cart.items[productId];
  }
  
  const increment = (productId) => {
    const exitQty = cart.items[productId];
    const _cart = {...cart};
    _cart.items[productId] = exitQty + 1;
    _cart.totalItems += 1;
    setCart(_cart);
  }

  const decrement = (productId) => {
    const exitQty = cart.items[productId];
    if(exitQty === 1){
      return;
    }
    const _cart = {...cart};
    _cart.items[productId] = exitQty - 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  }

const totalPrice =(productId, productPrice) => {
  const sum = productPrice * getQty(productId);
  total += sum;
  return sum;
}

const handleDelete = (productId) =>{
  const _cart = {...cart};
  const qty = _cart.items[productId];

  delete _cart.items[productId];
  _cart.totalItems -= qty;
  setCart(_cart);
  setProducts(products.filter((product) => product.id !== productId));
}
  return (
    !products.length ? <img  className='mx-auto w-1/2 mt-6' src='/images/empty-cart.png' alt='cart-Items'/> :
    <div className='container mx-auto lg:w-1/8 w-full pb-24'>
      <h1 className='font-bold my-12'>Cart Items</h1>
      <ul>
      {
        products.map((product) => {

          return(
            <li className='mt-2' key={product.id}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-between w-60'>
                <img  className='h-16 w-16' src={product.thumbnail} alt='cart-Items'/>
                <span className='font-bold ml-12 py-2'>{product.title}</span>
              </div>
              <div>
                <button onClick={() => {decrement(product.id)}} className='bg-yellow-500 py-2 px-4 rounded-full leading-none'>-</button>
                <b className='px-4'>{getQty(product.id)}</b>
                <button onClick={() => {increment(product.id)}} className='bg-yellow-500 py-2 px-4 rounded-full leading-none'>+</button>
              </div>
              <span className='font-bold'>$ {totalPrice(product.id, product.price)}</span>
              <button  onClick= {() => {handleDelete(product.id)}} className='bg-red-500 py-2 px-4 rounded-full leading-none text-white'>Delete</button>
            </div>
          </li>
          )
        })
      }
       
      </ul>
      <hr className='my-6'/>
      <div className='text-right'>
        <b>Grand Total:</b> $ {total}
      </div>
      <div className='text-right mt-6'>
        <PayButton cartItems = {products} cart = {cart}/>
      </div>
      </div>
  )
}

export default Cart