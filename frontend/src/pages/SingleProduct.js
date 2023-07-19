

import React, { useState, useEffect , useContext} from 'react';
import {CartContext} from '../CartContext';
import { StarIcon } from '@heroicons/react/20/solid';
import { useParams, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';

const SingleProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const location = useLocation();
  
  const {cart , setCart} = useContext(CartContext);
  const [ isAdding, setIsAdding] = useState(false);

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

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${params.id}`)
    .then((response) => response.json())
    .then((data) => {
      setLoading(true);
      setProduct(data);
      setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching products:', error);
      });
  }, [params.id]);

  const reviews = { href: '#', average: Math.floor(product.rating) }
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const handleGoBack = () => {
    if (location.state && location.state.from) {
      window.history.pushState(null, '', location.state.from); 
    } else {
      window.history.back(); 
    }
  };


  return (
    <div className="container mx-auto mt-12">
      <div className="mb-12 font-bold cursor-pointer" onClick={handleGoBack}>
        Back
      </div>
      { loading && <Spinner /> }
      <div className="flex">

        <img src={product.thumbnail} alt="electronics" />
        <div className="ml-16">
          <h1 className="font-bold text-xl">{product.title}</h1>
          <div className="font-md text-lg mt-2">$ {product.price}</div>
            {/* Reviews */}
            <div className="mt-2">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-yellow-500' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>
         
          <div className='text-lg font-medium mt-2'>{product.description}</div>
          <button disabled = {isAdding} onClick={(event) => {cartToHandle(event,product)}} className={`${isAdding ? 'bg-green-500' : 'bg-yellow-500'}  font-bold py-1 px-8 rounded-full mt-4`}>{isAdding ? 'ADDED' : 'Add to Cart'}</button>
        </div>
      </div>

    </div>
  );
};

export default SingleProduct;
