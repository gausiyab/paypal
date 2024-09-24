import React from 'react';
import Link from 'next/link';

function Banner() {
  // categories.js
  const categories = [
    { name: "Men's Wear", slug: "mens-wear", image: "https://img.freepik.com/free-photo/still-life-with-classic-shirts-hanger_23-2150828574.jpg?uid=R52842429&ga=GA1.1.303391696.1724664260&semt=ais_hybrid" },
    { name: "Women's Wear", slug: "womens-wear", image: "https://img.freepik.com/free-photo/still-life-with-classic-shirts-hanger_23-2150828574.jpg?uid=R52842429&ga=GA1.1.303391696.1724664260&semt=ais_hybrid" },
    { name: "Kids' Wear", slug: "kids-wear", image: "https://img.freepik.com/free-photo/still-life-with-classic-shirts-hanger_23-2150828574.jpg?uid=R52842429&ga=GA1.1.303391696.1724664260&semt=ais_hybrid" },
    { name: "Accessories", slug: "accessories", image: "https://img.freepik.com/free-photo/still-life-with-classic-shirts-hanger_23-2150828574.jpg?uid=R52842429&ga=GA1.1.303391696.1724664260&semt=ais_hybrid" },
  ];

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              Latest Kaftan Hand Made
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Party Wear Dress.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white bg-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Speak to Sales
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://gausiyaboutique.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffbxbj6nz%2Fproduction%2Fc2d61d0027f570c7a81d9ff55b088cb9518fafac-1024x600.png&w=1080&q=75"
              alt="mockup"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">Explore Our Categories</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.slug}>
                <div className="relative cursor-pointer group">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-64 transition-transform transform rounded-lg group-hover:scale-105"
                  />
                  {/* Category Name Below Image */}
                  <div className="mt-2 text-center">
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>
                  {/* Hover Overlay */}
                  {/* <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  </div> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
