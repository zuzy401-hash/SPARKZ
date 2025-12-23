
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PlusCircle, Search, User, LogOut, Code, DollarSign, Zap, Coins } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onSupportPlatform: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSupportPlatform }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path ? 'text-indigo-400' : 'text-gray-300 hover:text-white';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-[#0a0b10]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Zap className="text-white fill-current" size={24} />
                </div>
              </div>
              <span className="font-black text-2xl text-white tracking-tighter group-hover:text-indigo-400 transition-colors">
                SPARKZ<span className="text-indigo-500">.</span>
              </span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className={`${isActive('/')} px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-white/5`}>
                  Explorar
                </Link>
                <Link to="/upload" className={`${isActive('/upload')} px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-white/5 flex items-center gap-2`}>
                   <PlusCircle size={18} /> 
                   Publicar
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onSupportPlatform}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-black uppercase tracking-widest hover:from-yellow-500/20 transition-all active:scale-95"
            >
              <Coins size={14} className="animate-bounce" />
              Apoyar SPARKZ
            </button>

            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-white">{user.name}</p>
                  <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">
                    {user.role}
                  </p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-3 bg-white/5 text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-400 rounded-xl border border-white/5 transition-all"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-bold">Entrar</Link>
                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-black transition-all shadow-lg shadow-indigo-600/20">Unirse</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
