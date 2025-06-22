'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [pathname]);


  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="border-b bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* 왼쪽 */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold hover:text-gray-300">
              CoWing
            </Link>
            <Link href="/orderbook" className="hover:text-gray-300">
              Order Book
            </Link>
            <Link href="/pricelist" className="hover:text-gray-300">
              Price List
            </Link>
          </div>

          {/* 오른쪽 */}
          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                {/* 로그인 상태일 때 */}
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300 cursor-pointer"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                {/* 비로그인 상태일 때 */}
                <Link href="/login" className="hover:text-gray-300">
                  로그인
                </Link>
                <Link href="/signup" className="hover:text-gray-300">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
