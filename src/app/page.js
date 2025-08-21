'use client';
import { useAuth } from '@/contexts/Authcontext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          JWT Authentication App
        </h1>
        
        {isAuthenticated ? (
          <div className="text-center">
            <p className="text-xl mb-4">
              Welcome back, {user?.email}!
            </p>
            <Link 
              href="/dashboard"
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="text-center space-x-4">
            <Link 
              href="/login"
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            >
              Login
            </Link>
            <Link 
              href="/signup"
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}