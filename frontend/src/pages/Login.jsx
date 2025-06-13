import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign In');
  const { setToken, navigate, backendUrl } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const toggleState = () => {
    setCurrentState(currentState === 'Sign Up' ? 'Sign In' : 'Sign Up');
    setFormData({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!email || !password || (currentState === 'Sign Up' && !name)) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      let response;

      if (currentState === 'Sign Up') {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        toast.success("Registered successfully!");
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        toast.success("Logged in successfully!");
      }


      localStorage.setItem('token', response.data.token);

      setToken(response.data.token);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || `${currentState} failed`);
    }
  };

  return (
    <div className='flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-6 text-gray-800'>
      <div className='inline-flex items-center gap-3 mb-4'>
        <p className='prata-regular text-3xl font-semibold'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-10 bg-gray-800' />
      </div>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col w-full gap-4 bg-white p-6 rounded-md shadow-md'
      >
        {currentState === 'Sign Up' && (
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            required
            className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700'
          />
        )}

        <input
          type='email'
          name='email'
          placeholder='Email address'
          value={formData.email}
          onChange={handleChange}
          required
          className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700'
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          required
          className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700'
        />

        <button
          type='submit'
          className='bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition'
        >
          {currentState}
        </button>
      </form>

      <p className='text-sm text-gray-600'>
        {currentState === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={toggleState}
          className='text-gray-800 font-semibold underline cursor-pointer'
          type='button'
        >
          {currentState === 'Sign Up' ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
};

export default Login;
