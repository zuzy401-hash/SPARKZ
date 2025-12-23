import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Project } from '../types';
import { Download, ArrowLeft, Heart, Share2, Calendar, User, ShieldCheck, Github, ThumbsUp } from 'lucide-react';
import { DonationModal } from '../components/DonationModal';
import { Tooltip } from '../components/Tooltip';

interface DetailsProps {
  projects: Project[];
  onDonate: (projectId: string, amount: number) => void;
  onLike: (projectId: string) => void;
}

export const Details: React.FC<DetailsProps> = ({ projects, onDonate, onLike }) => {
  const { id } = useParams<{ id: string }>();
  const [isDonationModalOpen, setDonationModalOpen] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h2 className="text-2xl font-bold mb-4">Proyecto no encontrado</h2>
        <Link to="/" className="text-indigo-400 hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
      </div>
    );
  }

  const handleDownload = () => {
    setDownloadStarted(true);
    // Simulate download
    setTimeout(() => {
        alert("¡Descarga iniciada! Gracias por usar SPARKZ.");
        setDownloadStarted(false);
    }, 2000);
  };

  const handleDonationComplete = (amount: number, name: string) => {
    onDonate(project.id, amount);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/#/project/${project.id}`;
    alert(`¡Comparte este proyecto!\n\n${project.title}\n${url}`);
  };

  const percentFunded = Math.min(100, Math.round((project.currentDonation / project.donationGoal) * 100));

  return (
    <div className="min-h-screen bg-gray-900 pt-10 pb-20">
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setDonationModalOpen(false)}
        onDonate={handleDonationComplete}
        projectTitle={project.title}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Image & Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-gray-700 aspect-video group">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 left-4">
                 <span className="px-3 py-1 rounded-full bg-indigo-600/90 text-white text-sm font-semibold backdrop-blur-sm shadow-lg">
                   {project.category}
                 </span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white">Sobre este proyecto</h2>
                  {project.repositoryUrl && (
                    <Tooltip content="Ver código en repositorio externo">
                      <a 
                        href={project.repositoryUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors text-sm border border-gray-700 group"
                      >
                        <Github size={16} className="group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Ver Código Fuente</span>
                      </a>
                    </Tooltip>
                  )}
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {project.description}
              </p>
              
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-gray-700">
                <div className="flex flex-col items-center p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                  <User size={20} className="text-indigo-400 mb-2" />
                  <span className="text-xs text-gray-400">Creador</span>
                  <span className="font-medium text-white">{project.author}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                  <Download size={20} className="text-indigo-400 mb-2" />
                  <span className="text-xs text-gray-400">Descargas</span>
                  <span className="font-medium text-white">{project.downloadCount}</span>
                </div>
                 <div className="flex flex-col items-center p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                  <Calendar size={20} className="text-indigo-400 mb-2" />
                  <span className="text-xs text-gray-400">Publicado</span>
                  <span className="font-medium text-white">{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                 <div className="flex flex-col items-center p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                  <Heart size={20} className="text-pink-400 mb-2" />
                  <span className="text-xs text-gray-400">Likes</span>
                  <span className="font-medium text-white">{project.likes}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 sticky top-24 shadow-xl">
              <h1 className="text-3xl font-bold text-white mb-2">{project.title}</h1>
              <p className="text-gray-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Disponible para descarga
              </p>

              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                   <span className="text-gray-300 font-medium">Meta de donación</span>
                   <span className="text-white font-bold">${project.currentDonation} / ${project.donationGoal}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                    style={{ width: `${percentFunded}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 text-center">¡Ayuda a {project.author} a alcanzar su meta!</p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleDownload}
                  disabled={downloadStarted}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group hover:scale-[1.02]"
                >
                  {downloadStarted ? (
                      <span className="flex items-center gap-2">
                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                         Descargando...
                      </span>
                  ) : (
                    <>
                       <Download className="group-hover:-translate-y-1 transition-transform duration-300" />
                       Descargar Gratis
                    </>
                  )}
                </button>
                
                <button 
                  onClick={() => setDonationModalOpen(true)}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-500 group hover:scale-[1.02]"
                >
                  <Heart className="text-pink-500 fill-current group-hover:scale-110 transition-transform duration-300" />
                  Hacer Donación
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <Tooltip content="Dar me gusta a este proyecto">
                    <button 
                      onClick={() => onLike(project.id)}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-gray-600 group"
                    >
                      <ThumbsUp size={18} className={`transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12 ${project.likes > 0 ? "text-pink-400" : ""}`} />
                      Dar Like
                    </button>
                  </Tooltip>
                  
                  <Tooltip content="Compartir enlace del proyecto">
                    <button 
                      onClick={handleShare}
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-gray-600 group"
                    >
                      <Share2 size={18} className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                      Compartir
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
            
            {/* Disclaimer */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
               <p className="text-xs text-gray-500 leading-relaxed text-center">
                 SPARKZ no aloja archivos ilegales. Todo el contenido es proporcionado por la comunidad y es responsabilidad del creador.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};