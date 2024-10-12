'use client';

import { useEffect, useState, FormEvent } from 'react';
import api from "@/utils/axios";
import { toast } from 'react-hot-toast';

type User = {
  id: string;
  name: string;
  email: string;
};

export default function Profile () {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/me`);
        const userData: User = res.data;
        setUser(userData);
        setFormData({ name: userData.name, email: userData.email, password: '', confirmPassword: '' });
      } catch (err) {
        console.log(err);
        toast.error('Failed to fetch user data');
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { name, email, password } = formData;
      const updateData = { name, email };
      if (password) {
        Object.assign(updateData, { password });
      }

      await api.put(`/users/${ user.id }`, updateData);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
            Update Your Profile
          </h2>
        </div>
        { user ? (
          <form className="mt-8 space-y-6" onSubmit={ handleUpdate }>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={ formData.name }
                  onChange={ (e) => setFormData({ ...formData, name: e.target.value }) }
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={ formData.email }
                  onChange={ (e) => setFormData({ ...formData, email: e.target.value }) }
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={ formData.password }
                  onChange={ (e) => setFormData({ ...formData, password: e.target.value }) }
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="New Password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={ formData.confirmPassword }
                  onChange={ (e) => setFormData({ ...formData, confirmPassword: e.target.value }) }
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm New Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Update Profile
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        ) }
      </div>
    </div>
  );
}
