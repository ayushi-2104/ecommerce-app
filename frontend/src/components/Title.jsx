import React from 'react';

const Title = ({ text1, text2 }) => {
  console.log("Title rendered with:", text1, text2); // Debugging

  return (
    <div className='inline-flex gap-2 items-center mb-3 justify-center'>
      <p className='text-gray-500 text-xl sm:text-2xl font-light'>
        {text1} <span className='text-gray-700 font-medium'>{text2}</span>
      </p>
      <p className='w-8 sm:w-12 h-[2px] bg-gray-700'> </p>

    </div>
  );
};

export default Title;
