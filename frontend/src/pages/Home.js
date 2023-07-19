import React from 'react'
import Products from '../components/Products'

function Home() {
  return (
    <>
    <div className='hero py-16'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='w-1/2'>
          <h6 className='text-lg mt-4'><em>Discover the Magic of Shopping at Sparkle Shack - Where Every Purchase Shines!</em></h6>
          <h1 className='text-3xl md:text-6xl font-bold text-wrap mt-4'>Discover Endless Delights at Sparkle Shack!</h1>
          <button className='px-6 py-2 rounded-full text-white font-bold mt-6 bg-yellow-500  hover:bg-yellow-600' >Order Now</button>
        </div>
        <div className='w-1/2'>
          <img className='' src='/images/shopImage.jpg' alt='pizza'/>
        </div>
      </div>
    </div>
    <div className='py-24'>
      <Products/>
    </div>
    </>
  )
}

export default Home