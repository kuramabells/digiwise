import React, { useState } from 'react';
import { LoginForm } from '../../components/admin/LoginForm';
import { Link } from 'react-router-dom';
export const AdminLoginPage = () => {
  return <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            DigiWise
            <span className="block text-xs text-slate-500 font-normal mt-1">
              Admin Portal
            </span>
          </h1>
        </div>
        <LoginForm />
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>© 2025 DigiWise. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/" className="text-slate-600 hover:text-slate-800 underline">
              Return to main site
            </Link>
          </p>
        </div>
      </div>
    </div>;
};