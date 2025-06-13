import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    console.log("All Products:", products);
    const bestProducts = products.filter((item) => item.bestSeller === true);
    console.log("Filtered Best Sellers:", bestProducts);
    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);

  if (!products.length) return <div>Loading Products...</div>;

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Comfortable & Affordable
        </p>
      </div>

      {bestSeller.length === 0 ? (
        <div className="text-center text-red-500">No Best Seller Products Found</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {bestSeller.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image} // full array
              price={item.price}
            />

          ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;
