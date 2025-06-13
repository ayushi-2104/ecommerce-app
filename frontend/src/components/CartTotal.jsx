import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal + delivery_fee;

  return (
    <div className='w-full p-4 rounded-md bg-white shadow'>
      <div className='text-2xl mb-3'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 text-sm text-gray-700'>
        <div className='flex justify-between'>
          <p>SUBTOTAL</p>
          <p>{currency} {subtotal.toFixed(2)}</p>
        </div>
       

        <div className='flex justify-between'>
          <p>DELIVERY FEE</p>
          <p>{currency} {delivery_fee.toFixed(2)}</p>
        </div>

        <hr className='my-2' />

        <div className='flex justify-between font-semibold text-base'>
          <p>TOTAL</p>
          <p>{currency} {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
