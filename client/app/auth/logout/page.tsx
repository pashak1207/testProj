'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from "@/utils/axios";

export default function Logout () {
  const router = useRouter();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await api.post('/auth/logout');
        if (!isLoggedOut) {
          setIsLoggedOut(true);
        }
      } catch {
      } finally {
        router.push('/auth/login');
      }
    };

    handleLogout();
  }, [router, isLoggedOut]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.5v7l3.5 3.5"
          />
        </svg>
        <h3 className="mt-4 text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Logging out...
        </h3>
      </div>
    </div>
  );
}