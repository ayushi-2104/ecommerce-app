import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: quantity
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleIncrease = (item) => {
    updateQuantity(item._id, item.size, item.quantity + 1);
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item._id, item.size, item.quantity - 1);
    } else {
      updateQuantity(item._id, item.size, 0); // Remove if quantity goes to 0
    }
  };

  return (
    <div className='border-t pt-14 px-4 sm:px-8'>
      <div className='text-2xl mb-6'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_1fr_1fr] items-center gap-4 sm:gap-6 text-sm sm:text-base'
            >
              <div className='flex items-start gap-4'>
                <img
                  className='w-16 sm:w-20'
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div>
                  <p className='font-medium'>{productData.name}</p>
                  <p className='text-gray-500 text-xs'>Size: {item.size}</p>
                </div>
              </div>

              <div className='flex items-center justify-center gap-2'>
                <button
                  onClick={() => handleDecrease(item)}
                  className='bg-gray-200 px-2 rounded text-lg'
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item)}
                  className='bg-gray-200 px-2 rounded text-lg'
                >
                  +
                </button>
              </div>

              <p className='text-center'>
                {(productData.price * item.quantity).toFixed(2)} {currency}
              </p>

              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className='w-4 sm:w-5 cursor-pointer justify-self-center'
                src={assets.bin_icon}
                alt="Remove"
              />
            </div>
          );
        })
      )}

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
