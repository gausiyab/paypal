"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import useCartStore from '../../cartStore';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalItems = useCartStore((state) => state.totalItems);
  const cartTotal = useCartStore((state) => state.cartTotal);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false); // State to manage payment processing

  console.log("cart",cart);
  
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  let user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    mobile: '123-456-7890',
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if(cartTotal<1){
      toast.error('Please add items to the cart to proceed.');
      return;
    }

    setIsProcessingPayment(true); // Set loading state to true

    try {
      const res = await axios.post('http://localhost:3000/api/v1/payment/paypal/order', {
        cart,
        cartTotal,
        user,
      });

      if (res && res.data) {
        window.location.href = res.data.redirectUrl;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessingPayment(false); // Reset loading state whether successful or not
    }
  };

  return (
    <div className='max-w-3xl mx-auto mt-20'>
      <h1 className='text-3xl text-center font-semibold text-[#5B20B6] mb-6'>{totalItems} items in Cart</h1>

      <table className='w-full border-collapse'>
        <thead>
          <tr className='text-[#5B20B6] border-b border-gray-200'>
            <th className='px-4 py-2'>Product</th>
            <th className='px-4 py-2'>Quantity</th>
            <th className='px-4 py-2'>Color</th>
            <th className='px-4 py-2'>Size</th>
            <th className='px-4 py-2'>Price</th>
            <th className='px-4 py-2'>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((product) => (
            <tr key={product?._id} className='hover:bg-gray-50 text-center border-b border-gray-300 text-[#5B20B6]'>
              <td className='flex items-center px-4 py-2'>
                <Image className='mr-2' src={product?.image} width={50} height={30} alt='art' />
                {product?.name}
              </td>
              <td className='px-4 py-2'>{product?.quantity}</td>
              <td className='px-4 py-2'>{product?.selectedColor}</td>
              <td className='px-4 py-2'>{product?.selectedSize}</td>
              <td className='px-4 py-2'>${product?.price}</td>
              <td className='px-4 py-2'>
                <FaTrash onClick={() => handleRemoveFromCart(product?._id)} className='text-[#5B20B6] mx-auto cursor-pointer' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Section */}
      <div className='mt-4 text-[#5B20B6] ml-auto'>
        <p className='mr-4 text-lg font-semibold text-right'>Total: ${cartTotal}</p>
      </div>

      <div className='flex items-center justify-between'>
        <div className='mt-6 text-[#5B20B6] max-w-sm mx-auto space-y-4'>
          <button className='text-lg w-full font-semibold text-center mr-4 bg-white hover:bg-[#5B20B6] hover:text-white text-[#5B20B6] border border-[#5B20B6] py-2 px-4 rounded'>
            <Link className='' href='/'>
              Back to Shopping
            </Link>
          </button>
        </div>

        <button 
         onClick={handlePayment}
         disabled={isProcessingPayment}
        className='mt-6'>
          <img
          
          src='https://lavendercottagecattery.co.uk/wp-content/uploads/2022/10/CITYPNG.COMDownload-PayPal-Yellow-Payment-Button-PNG-2100x770-2.png'
         className='h-24'
         >
          </img>
        </button>

        {/* <div className='mt-6 text-[#5B20B6] max-w-sm mx-auto space-y-4'>

          <button
            onClick={handlePayment}
            disabled={isProcessingPayment} // Disable button when processing payment
            className={`text-lg w-full font-semibold text-center mr-4 bg-white hover:bg-[#5B20B6] hover:text-white text-[#5B20B6] border border-[#5B20B6] py-2 px-4 rounded ${
              isProcessingPayment ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isProcessingPayment ? 'Processing...' : 'Pay Now'}
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Cart;
