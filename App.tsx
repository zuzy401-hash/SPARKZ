
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Details } from './pages/Details';
import { Upload } from './pages/Upload';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BecomeDeveloper } from './pages/BecomeDeveloper';
import { INITIAL_PROJECTS } from './constants';
import { Project } from './types';
import { AuthProvider } from './context/AuthContext';
import { Rocket, Zap } from 'lucide-react';
import { DonationModal } from './components/DonationModal';

function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isPlatformDonationOpen, setIsPlatformDonationOpen] = useState(false);

  const addProject = (project: Project) => {
    setProjects([project, ...projects]);
  };

  const handleDonate = (projectId: string, amount: number) => {
    if (projectId === 'PLATFORM') {
      console.log(`Gracias por donar ${amount} a SPARKZ Platform!`);
      return;
    }
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return { ...p, currentDonation: p.currentDonation + amount };
      }
      return p;
    }));
  };

  const handleLike = (projectId: string) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return { ...p, likes: (p.likes || 0) + 1 };
      }
      return p;
    }));
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0a0b10] text-gray-100 flex flex-col font-sans">
          <Navbar onSupportPlatform={() => setIsPlatformDonationOpen(true)} />
          
          <DonationModal 
            isOpen={isPlatformDonationOpen} 
            onClose={() => setIsPlatformDonationOpen(false)}
            onDonate={(amount) => handleDonate('PLATFORM', amount)}
            projectTitle="Soporte Global SPARKZ"
          />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home projects={projects} onLike={handleLike} onDonate={handleDonate} onSupportPlatform={() => setIsPlatformDonationOpen(true)} />} />
              <Route 
                path="/project/:id" 
                element={<Details projects={projects} onDonate={handleDonate} onLike={handleLike} />} 
              />
              <Route 
                path="/upload" 
                element={<Upload onAddProject={addProject} />} 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/become-developer" element={<BecomeDeveloper />} />
              
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center h-[60vh]">
                  <div className="bg-gray-800 p-8 rounded-full mb-6 shadow-2xl shadow-indigo-500/20 animate-pulse">
                    <Rocket className="text-indigo-400 w-16 h-16 transform -rotate-45" />
                  </div>
                  <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">404</h1>
                  <h2 className="text-2xl font-bold text-white mb-4">¡Houston, tenemos un problema!</h2>
                  <Link to="/" className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all hover:scale-105 shadow-lg shadow-indigo-600/30">
                    Regresar a la Base
                  </Link>
                </div>
              } />
            </Routes>
          </main>
          
          <footer className="bg-[#0a0b10] border-t border-white/5 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start">
                  <Link to="/" className="flex items-center gap-3 group mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center shadow-xl">
                      <Zap className="text-white fill-current" size={24} />
                    </div>
                    <span className="font-black text-2xl text-white tracking-tighter">SPARKZ<span className="text-indigo-500">.</span></span>
                  </Link>
                  <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
                    Potenciando el desarrollo independiente y la literatura digital a través del apoyo comunitario.
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-400">
                  <button onClick={() => setIsPlatformDonationOpen(true)} className="hover:text-yellow-500 transition-colors">Donar a la plataforma</button>
                  <a href="#" className="hover:text-white transition-colors">Términos</a>
                  <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                  <a href="#" className="hover:text-white transition-colors">Cookies</a>
                  <a href="#" className="hover:text-white transition-colors">Contacto</a>
                </div>

                <div className="flex flex-col items-center md:items-end">
                  <div className="text-xs font-black text-gray-600 uppercase tracking-[0.3em] mb-2">Plataforma Global</div>
                  <p className="text-gray-500 text-sm">© 2024 SPARKZ Platform.</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
