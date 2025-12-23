
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { Download, Heart, Smartphone, Gamepad2, BookOpen, Share2, Coffee, ArrowUpRight } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface ProjectCardProps {
  project: Project;
  onLike: (projectId: string) => void;
  onDonateClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onLike, onDonateClick }) => {
  const getIcon = () => {
    switch (project.category) {
      case 'APP': return <Smartphone size={16} />;
      case 'JUEGO': return <Gamepad2 size={16} />;
      case 'LIBRO': return <BookOpen size={16} />;
      default: return <Gamepad2 size={16} />;
    }
  };

  const percentFunded = Math.min(100, Math.round((project.currentDonation / project.donationGoal) * 100));

  return (
    <div className="group relative bg-[#1a1c24] rounded-[2rem] overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl">
      {/* Visual background glow on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
      
      <div className="relative p-3 flex-1 flex flex-col">
        {/* Image Container */}
        <div className="relative h-56 rounded-2xl overflow-hidden mb-4 shadow-inner">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
          
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-xl text-[10px] font-black text-white uppercase tracking-tighter flex items-center gap-1.5 border border-white/10">
            {getIcon()}
            {project.category}
          </div>
          
          <Link 
            to={`/project/${project.id}`}
            className="absolute top-3 right-3 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>

        {/* Info */}
        <div className="px-3 pb-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-black text-white leading-none tracking-tight group-hover:text-indigo-400 transition-colors line-clamp-1">{project.title}</h3>
          </div>
          
          <p className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2">
            BY <span className="text-indigo-400 uppercase tracking-widest">{project.author}</span>
          </p>
          
          <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
            {project.description}
          </p>
          
          {/* Progress Block */}
          <div className="mb-6 p-4 rounded-2xl bg-black/30 border border-white/5">
            <div className="flex justify-between items-center mb-2">
               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Progreso de Meta</span>
               <span className="text-xs font-black text-indigo-400">{percentFunded}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(99,102,241,0.6)]" 
                style={{ width: `${percentFunded}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold">
               <span className="text-white">${project.currentDonation}</span>
               <span className="text-gray-500">OBJETIVO: ${project.donationGoal}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button 
              onClick={() => onDonateClick(project)}
              className="flex-1 bg-white text-black font-black py-3 rounded-2xl text-xs uppercase tracking-tighter hover:bg-indigo-400 hover:text-white transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2"
            >
              <Coffee size={14} /> Donar Ahora
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); onLike(project.id); }}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${project.likes > 0 ? 'bg-pink-500/10 border-pink-500/50 text-pink-500' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
            >
              <Heart size={20} className={project.likes > 0 ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
