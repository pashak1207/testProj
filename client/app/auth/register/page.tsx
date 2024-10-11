'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from "@/utils/axios";
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

type RegisterFormData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const registerSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  name: yup.string().required('Name is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
}).required();

export default function Register () {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...formData } = data;

      await api.post(`/auth/register`, formData);

      router.push('/auth/login');
    } catch (err: any) {
      const message = err?.response?.data?.message;
      const mm = message?.message || message || 'Registration failed';

      toast.error('Registration failed: ' + mm);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <h1 className="text-2xl mb-4 font-bold">Register</h1>
      <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col space-y-4 w-5/12 min-w-64">
        <input
          type="text"
          placeholder="Name"
          className="p-4 rounded-md"
          { ...register('name') }
        />
        { errors.name && <p className="text-red-500">{ errors.name.message }</p> }

        <input
          type="email"
          placeholder="Email"
          className="p-4 rounded-md"
          { ...register('email') }
        />
        { errors.email && <p className="text-red-500">{ errors.email.message }</p> }

        <input
          type="password"
          placeholder="Password"
          autoComplete="true"
          className="p-4 rounded-md"
          { ...register('password') }
        />
        { errors.password && <p className="text-red-500">{ errors.password.message }</p> }

        <input
          type="password"
          placeholder="Confirm Password"
          autoComplete="true"
          className="p-4 rounded-md"
          { ...register('confirmPassword') }
        />
        { errors.confirmPassword && <p className="text-red-500">{ errors.confirmPassword.message }</p> }

        <button type="submit" disabled={ isSubmitting } className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors font-bold">
          { isSubmitting ? 'Submitting...' : 'Register' }
        </button>
      </form>
    </div>
  );
}
