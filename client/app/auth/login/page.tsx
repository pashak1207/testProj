'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from "@/utils/axios";
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type LoginFormData = {
  email: string;
  password: string;
};

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

export default function Login () {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await api.post(`/auth/login`, data);
      router.push('/');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const message = (err as any)?.response?.data?.message;
        const mm = message?.message || message || 'Login failed';
        toast.error(`Login failed: ${ mm || 'Login failed' }`);
      } else {
        toast.error('Login failed');
      }
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <h1 className="text-2xl mb-4 font-bold">Login</h1>
      <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col space-y-4 w-5/12 min-w-64">
        <input
          type="email"
          placeholder="Email"
          autoComplete="true"
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

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors font-bold"
        >
          Login
        </button>

        <p>Don't have an account? <Link className="underline" href="/auth/register">Register for one</Link></p>
      </form>
    </div>
  );
}
