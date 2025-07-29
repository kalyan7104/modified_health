
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { initializeDemoData } from '@/lib/api';

export default function Home() {
  useEffect(() => {
    // Initialize demo data on app load
    initializeDemoData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="text-center pt-24 pb-16">
        <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <i className="ri-heart-pulse-line text-white text-4xl"></i>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Pacifico, serif' }}>
          HealthCare
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Your trusted healthcare companion for managing appointments and medical care
        </p>
      </div>

      {/* Main Content */}
      <div className="px-6 max-w-sm mx-auto">
        <div className="space-y-6">
          {/* Patient Login */}
          <Link
            href="/patient-login"
            className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 block group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <i className="ri-user-line text-blue-600 text-2xl"></i>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Patient Login</h2>
                <p className="text-gray-600 text-sm">Book appointments and manage your health</p>
              </div>
              <i className="ri-arrow-right-line text-gray-400 group-hover:text-blue-600 transition-colors text-xl"></i>
            </div>
          </Link>

          {/* Doctor Login */}
          <Link
            href="/doctor-login"
            className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 block group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <i className="ri-stethoscope-line text-indigo-600 text-2xl"></i>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Doctor Login</h2>
                <p className="text-gray-600 text-sm">Manage your practice and patients</p>
              </div>
              <i className="ri-arrow-right-line text-gray-400 group-hover:text-indigo-600 transition-colors text-xl"></i>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-20 pb-8">
        <p className="text-sm text-gray-500">
          © 2024 HealthCare. Your health, our priority.
        </p>
      </div>
    </div>
  );
}
