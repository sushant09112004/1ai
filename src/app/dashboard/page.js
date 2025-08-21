'use client';
import { useAuth } from '@/contexts/Authcontext';
import Navbar from '@/components/Navbar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
            Please log in to access this page.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto mt-8 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">User Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Profile</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-900">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">Role:</span>
                <span className="text-gray-900 capitalize">{user?.role}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-600">User ID:</span>
                <span className="text-gray-900 font-mono text-sm">{user?.id}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Welcome to your Dashboard!
            </h3>
            <p className="text-blue-700 leading-relaxed">
              This is a protected page that only authenticated users can access.
              You can add more features here like user settings, data management, etc.
            </p>
            <div className="mt-4 p-3 bg-blue-100 rounded-md">
              <p className="text-blue-800 text-sm">
                <strong>Status:</strong> Successfully authenticated
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <p className="font-medium text-gray-700">View Analytics</p>
              </div>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">⚙️</div>
                <p className="font-medium text-gray-700">Settings</p>
              </div>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">📝</div>
                <p className="font-medium text-gray-700">Edit Profile</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}