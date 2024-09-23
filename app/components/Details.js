"use client"
import Image from 'next/image';
import React,{useState} from 'react';
import useCartStore from "../../cartStore"
import { toast } from 'react-hot-toast';
import Size from './Size';


function Details({product}) {
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const[qty,setQty] = useState(1);

  console.log(product.colors);
  

  const handleAddToCart = () => {

    if(!selectedColor) {
      toast.error('Please select a color.');
      return;
    }
    if (qty <= 0) {
      toast.error('Quantity should be greater than 0.');
      return;
    }
    if (!selectedSize) {
      toast.error('Please select a size.');
      return;
    }


    addToCart({"product": {
      "size":product.size,
      "_id": product._id,
      "price": product.price,
      "image": product.image,
      "slug": product.slug,
      "extraImages": product.extraImages,
      "colors": product.colors,
      "createdAt": product.createdAt,
      "name": product.name,
      "description": product.description,
      "quantity": qty,
      "color": product.color,
      "selectedColor":selectedColor,
      "selectedSize":selectedSize
  }}
      
);
    // addToCart({ 
    //   product, 
    //   // quantity: qty,
    //   // color:selectedColor,
    //   // selectedSize:"Vik"
    //  });
     
    toast.success('Added to cart');
  };

  return (
    <div className='mx-auto mt-20 max-w-7xl'>
      <div className='grid grid-cols-1 lg:grid-cols-2'>

        {/* Left - Main Image */}
        <div>
        <div className="relative overflow-hidden shadow-md h-96 aspect-ratio-1">
          <img
            src={selectedImage}
            layout="fill"
            objectfit="cover"
            alt="art"
          />
        </div>
        <div className="mt-2">
        <ul className="flex gap-4 overflow-x-auto">
            <li onClick={()=>{setSelectedImage(product?.image)}} className={`${selectedImage == product?.image? "border-4 border-[#5b20b6]":""} w-20 relative overflow-hidden aspect-ratio-1 cursor-pointer hover:border-4 border-[#5b20b6]`}>
                <img
                  src={product?.image}
                  layout="fill"
                  objectfit="cover"
                  alt="small_art1"
                />
              </li>
          {
            product?.extraImages?.map((image)=>(
              <li key={image} onClick={()=>{setSelectedImage(image)}} className={`${selectedImage == image? "border-4 border-[#5b20b6]":""} w-20 relative overflow-hidden aspect-ratio-1 cursor-pointer hover:border-4 border-[#5b20b6]`}>
                <img
                  src={image}
                  layout="fill"
                  objectfit="cover"
                  alt="small_art1"
                />
              </li>
            ))
          }
        </ul>
      </div>

        </div>

    
        

        {/* Right - Details */}
        <div className="flex flex-col justify-between p-6">
          <h1 className="text-3xl font-semibold text-[#5B20B6]">{product?.name}</h1>
          <p className="mt-4 text-lg text-gray-500">{product?.description}</p>

          

          {/* Color Selection Circles */}
          {/* <div className="flex mt-6 space-x-3">
            {product?.colors?.map((color) => {
              switch (color) {
                case 'Grey':
                  return <div onClick={()=>{setSelectedColor(color)}} key={color} className={`${color == selectedColor ? "border-4 border-[#5b20b6]":""} w-8 h-8 rounded-full bg-gray-500 cursor-pointer hover:border-4 border-[#5b20b6]`}></div>;
                case 'Black':
                  return <div onClick={()=>{setSelectedColor(color)}} key={color} className={`${color == selectedColor ? "border-4 border-[#5b20b6]":""} w-8 h-8 rounded-full bg-gray-800 cursor-pointer hover:border-4 border-[#5b20b6]`}></div>;
                case 'Blue':
                  return <div onClick={()=>{setSelectedColor(color)}} key={color} className={`${color == selectedColor ? "border-4 border-[#5b20b6]":""} w-8 h-8 rounded-full bg-blue-800 cursor-pointer hover:border-4 border-[#5b20b6]`}></div>;
                default:
                  return <div onClick={()=>{setSelectedColor(color)}} key={color} className={`${color == selectedColor ? "border-4 border-[#5b20b6]":""} w-8 h-8 rounded-full bg-gray-300 cursor-pointer hover:border-4 border-[#5b20b6]`}></div>;
              }
            })}
          </div> */}

          <div className="flex mt-6 space-x-3">
          {product?.colors?.map((color) => (
        <button
          key={color}
          onClick={() => setSelectedColor(color)}
          style={{ backgroundColor: color }} // Set background color dynamically
          className={`w-8 h-8 rounded-full cursor-pointer
                      ${color === selectedColor ? "border-4 border-[#5b20b6]" : ""}
                      ${color === selectedColor ? "" : "hover:bg-gray-300 hover:border-4 border-[#5b20b6]"}
                      `}
        />
      ))}
    </div>

          <Size onSizeSelect={setSelectedSize} size={product.size} />

          <div className="mt-5">
            {/* Additional details can be added here */}
            <span className="text-3xl font-semibold text-white">${product?.price}</span>

           
          </div>

          <div className="flex flex-col mt-6 text-gray-500">
            <label className="ml-2" htmlFor="">
              Qty
            </label>
            <input
              type="number"
              value={qty}
              onChange={(e)=>setQty(e.target.value)}
              className="w-20 h-10 px-4 border border-gray-300 rounded-md"
            />
          </div>

          
          <div className="mt-6">
            <button onClick={handleAddToCart} className="bg-[#5B20B6] text-white px-6 py-3 rounded-md">
              Add to Cart
            </button>
          </div>

        </div>
      </div>

      {/* Below Main Image - Small Image List */}
      {/* <div className="mt-2">
        <ul className="flex gap-4 overflow-x-auto">
            <li onClick={()=>{setSelectedImage(product?.image)}} className={`${selectedImage == product?.image? "border-4 border-[#5b20b6]":""} w-20 relative overflow-hidden aspect-ratio-1 cursor-pointer hover:border-4 border-[#5b20b6]`}>
                <img
                  src={product?.image}
                  layout="fill"
                  objectfit="cover"
                  alt="small_art1"
                />
              </li>
          {
            product?.extraImages?.map((image)=>(
              <li key={image} onClick={()=>{setSelectedImage(image)}} className={`${selectedImage == image? "border-4 border-[#5b20b6]":""} w-20 relative overflow-hidden aspect-ratio-1 cursor-pointer hover:border-4 border-[#5b20b6]`}>
                <img
                  src={image}
                  layout="fill"
                  objectfit="cover"
                  alt="small_art1"
                />
              </li>
            ))
          }
        </ul>
      </div> */}
    </div>
  );
}

export default Details;