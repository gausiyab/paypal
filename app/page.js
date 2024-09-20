import React from 'react'
import Headers from './components/Headers'
import Banner from './components/Banner'
import Card from './components/Card'
import Footer from './components/Footer';
import { getProducts } from '@/sanity/product-util';

export default async function Home() {

  const products = await getProducts();

  return (
    <div>
      <Headers/>
      <div className="flex flex-col items-center justify-center mt-10 space-y-4">
          <h1 className="text-4xl font-bold text-[#5B20B6] text-center">Get the Best Party Dress!</h1>
          <p className="text-center text-xl text-gray-500">For Women wear</p>
      </div>
  
        <div className="flex flex-col items-center justify-center mt-10 space-y-4">
         <Banner/>

      </div>
    
      <div className="flex flex-col items-center justify-center mt-10 space-y-4">
         <h1 className="text-4xl font-bold text-[#5B20B6] text-center">Featured Products</h1>
      </div>

      <div className='flex p-10'>
      <div className='mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16'>
        {/* <Card/>
        <Card/>
        <Card/>
        <Card/> */}
        {
          products.map((product)=>(
            <Card key={product._id} product={product}/>
          ))
        }
      </div>
      </div>
   <Footer/>
    </div>
  )
}

