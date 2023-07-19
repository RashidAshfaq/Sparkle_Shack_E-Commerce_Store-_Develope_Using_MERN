
import React, { useState, useEffect } from 'react';
import Product from './Product';
import Spinner from './Spinner';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.products)) {
          setLoading(true);
          setProducts(data.products);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log('Error fetching products:', error);
      });
  }, []);

  return (
    <div className='container mx-auto pb-24'>
      <h1 className='text-lg font-bold my-8'>Products</h1>
      <div className='grid grid-cols-5 my-8 gap-24'>
      {loading && <Spinner />}
        {Array.isArray(products) &&
          products.map((product) => <Product key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default Products;
