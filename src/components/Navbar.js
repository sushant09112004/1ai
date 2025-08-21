'use client';
import { useAuth } from '@/contexts/Authcontext';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          JWT Auth App
        </Link>
        
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <span>Welcome, {user?.email}</span>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/chat" className="hover:underline">
                AI Chat
              </Link>
              {isAdmin && (
                <Link href="/admin" className="hover:underline">
                  Admin
                </Link>
              )}
              <button 
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}