import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                `${backendUrl}/api/user/admin`,
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log('Login response:', response);

            // Adjusted to check token existence primarily
            if (response.data && response.data.token) {
                setToken(response.data.token);
                localStorage.setItem('adminToken', response.data.token);

                if (response.data.expiresIn) {
                    const expiryTime = new Date().getTime() + response.data.expiresIn * 1000;
                    localStorage.setItem('tokenExpiry', expiryTime);
                }

                toast.success('Login successful!');
                navigate('/dashboard');
            } else {
                // If no token found, show error
                throw new Error(
                    response.data?.message || 'Login failed: Token not provided by backend'
                );
            }
        } catch (error) {
            console.error('Login error:', error);

            if (error.response) {
                // Backend responded with an error status
                console.error('Error response data:', error.response.data);
                toast.error(error.response.data.message || 'Login failed due to server error');
            } else if (error.request) {
                // No response received from backend
                toast.error('No response from server. Please check your network.');
            } else {
                // Other errors (e.g., thrown manually)
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-80 p-6 bg-white rounded-md shadow-sm">
                <h1 className="text-xl font-semibold text-center mb-6">Admin Panel</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
