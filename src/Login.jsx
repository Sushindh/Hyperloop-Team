import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Bg from "./images/Trainbg.jpg"
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0">
        <img 
          src={Bg} 
          alt="Background" 
          className="w-full h-full object-cover scale-105 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 animate-gradient" />
      </div>

      
      <div className="relative w-full max-w-md mx-4 p-8 bg-white/20 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 animate-fade-in">

        <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl" />
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl" />

    
        <div className="text-center mb-8 relative">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Welcome Back</h1>
          <p className="text-white/80">Please enter your details to sign in</p>
        </div>


        <form className="space-y-6 relative">
  
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90 drop-shadow">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-white/60 group-hover:text-white/80 transition-colors" />
              </div>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="block w-full pl-10 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg 
                         focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 
                         text-white placeholder-white/50 backdrop-blur-sm transition-all
                         hover:bg-white/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90 drop-shadow">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-white/60 group-hover:text-white/80 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="block w-full pl-10 pr-10 py-2.5 bg-white/10 border border-white/20 rounded-lg 
                         focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 
                         text-white placeholder-white/50 backdrop-blur-sm transition-all
                         hover:bg-white/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-white/60 hover:text-white/90 transition-colors" />
                ) : (
                  <Eye className="h-5 w-5 text-white/60 hover:text-white/90 transition-colors" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Link
            to="/Home"
            className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium
                     bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                     text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50
                     transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Sign in
          </Link>

          <div className="text-center text-sm">
            <span className="text-white/80">Don't have an account? </span>
            <Link
              to="/signup"
              className="font-medium text-white hover:text-blue-200 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};



export default Login;