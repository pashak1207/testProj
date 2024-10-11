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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <h1 className="text-2xl mb-4">Profile</h1>
      { user ? (
        <form onSubmit={ handleUpdate } className="flex flex-col space-y-4 min-w-64">
          <input
            type="text"
            value={ formData.name }
            className="p-2 rounded-md"
            placeholder="Name"
            autoComplete='true'
            onChange={ (e) => setFormData({ ...formData, name: e.target.value }) }
          />
          <input
            type="email"
            value={ formData.email }
            className="p-2 rounded-md"
            placeholder="Email"
            autoComplete='true'
            onChange={ (e) => setFormData({ ...formData, email: e.target.value }) }
          />
          <input
            type="password"
            value={ formData.password }
            className="p-2 rounded-md"
            placeholder="New Password"
            autoComplete='true'
            onChange={ (e) => setFormData({ ...formData, password: e.target.value }) }
          />
          <input
            type="password"
            value={ formData.confirmPassword }
            className="p-2 rounded-md"
            placeholder="Confirm New Password"
            autoComplete='true'
            onChange={ (e) => setFormData({ ...formData, confirmPassword: e.target.value }) }
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors">
            Update Profile
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      ) }
    </div>
  );
}
