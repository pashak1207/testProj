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
    <div className="flex items-center justify-center min-h-screen">
      <p>Logging out...</p>
    </div>
  );
}