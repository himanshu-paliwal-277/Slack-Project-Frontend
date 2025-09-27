import React, { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSignin } from '@/hooks/apis/auth/useSignin';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { isPending, isSuccess, error, signinMutation } = useSignin();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signinMutation(formData, {
      onSuccess: () => {
        navigate('/');
      },
    }); // Call your signin mutation
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-sm text-red-600">{error.message || 'Something went wrong'}</p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="flex items-center gap-2 text-sm">
            <p>Don't have an account?</p>
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>

        {/* Success message */}
        {isSuccess && <p className="mt-4 text-center text-green-600">Signed in successfully!</p>}
      </div>
    </div>
  );
};

export default memo(SignIn);
