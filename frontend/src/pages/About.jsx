import React from 'react';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className='pt-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* Title Section */}
      <div className='text-2xl text-center border-t pt-10'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* Main Content Section */}
      <div className='my-12 flex flex-col md:flex-row items-center gap-12'>
        <img
          src={assets.about_img}
          alt='About us'
          className='w-full md:w-1/2 rounded-lg shadow-lg object-cover'
        />

        <div className='text-gray-700 text-base md:w-1/2 leading-relaxed'>
          <h2 className='text-2xl font-semibold mb-4'>Who We Are</h2>
          <p className='mb-4'>
            At ForeverYou, we believe that fashion is more than just clothing — it’s a statement. 
            Our mission is to bring timeless and trendy pieces to people who dare to express themselves.
          </p>
          <p className='mb-4'>
            Founded in 2023, ForeverYou has grown into a trusted platform offering curated collections, 
            high-quality fabrics, and customer-first service. Whether you're dressing for confidence, 
            comfort, or celebration, we're here to make every style story unforgettable.
          </p>

          <h2 className='text-xl font-semibold mt-6 mb-3'>Our Values</h2>
          <ul className='list-disc pl-5 space-y-2'>
            <li><strong>Quality:</strong> We partner with top manufacturers to ensure you get premium products.</li>
            <li><strong>Sustainability:</strong> Our fashion choices support eco-friendly practices and conscious production.</li>
            <li><strong>Customer-Centric:</strong> We strive to create a seamless, satisfying shopping experience.</li>
          </ul>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className='bg-gray-100 p-8 rounded-lg text-center mt-10'>
        <h3 className='text-xl font-semibold mb-2'>Join Our Story</h3>
        <p className='text-gray-600 mb-4'>
          Follow us on social media and subscribe to our newsletter to get the latest drops, stories, and exclusive offers!
        </p>
        <button className='bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700'>
          Explore Collections
        </button>
      </div>
      {/* Why Choose Us Section */}
<div className="my-16">
  <h2 className="text-2xl font-bold text-center mb-8">Why Choose Us</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">

    {/* Box 1 */}
    <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
      <p>
        We offer top-notch clothing crafted from premium fabrics, ensuring durability and comfort with every wear.
      </p>
    </div>

    {/* Box 2 */}
    <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-3">Trendy Collections</h3>
      <p>
        Stay ahead of the fashion curve with our exclusive, curated styles that blend tradition with trend.
      </p>
    </div>

    {/* Box 3 */}
    <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-3">Customer Satisfaction</h3>
      <p>
        Our customer-first approach means seamless support, fast shipping, and hassle-free returns every time.
      </p>
    </div>

  </div>
</div>
<NewsletterBox/>
    </div>
  );
};

export default About;
