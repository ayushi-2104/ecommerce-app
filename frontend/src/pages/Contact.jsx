import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className="pt-10 pb-20">
      {/* Page Title */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Section */}
      <div className="mt-12 flex flex-col md:flex-row gap-12 px-4 sm:px-10">
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt=""/>
        
        {/* Contact Form */}
        <form className="flex-1 space-y-6 bg-gray-50 p-8 rounded-lg shadow-md">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div className="flex-1 bg-gray-100 p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <p className="text-gray-700 mb-6">
            We're here to help and answer any question you might have. We look forward to hearing from you!
          </p>
          <ul className="text-gray-700 space-y-4">
            <li><strong>Phone:</strong> +1-212-456-7890</li>
            <li><strong>Email:</strong> contact@foreveryou.com</li>
            <li><strong>Address:</strong> 123 Fashion Ave, New York, NY, USA</li>
            <li><strong>Working Hours:</strong> Mon - Fri (9:00 AM to 6:00 PM)</li>
          </ul>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default Contact;
