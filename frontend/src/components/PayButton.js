import axios from "axios";
import React from 'react'
const url = 'http://localhost:5000/api';

const PayButton = ({cartItems, cart}) => {
    const handleCheckOut = () => {
        axios.post(`${url}/stripe/create-checkout-session`, {
            cartItems,
            cart
        }).then((res) => {
            if(res.data.url){
                window.location.href = res.data.url;
            }
        }).catch((error) => console.log(error));
    };
  return (
    <>
     <button onClick={handleCheckOut} className='bg-yellow-500 py-2 px-4 rounded-full leading-none '>Order Now</button>
    </>
  )
}

export default PayButton