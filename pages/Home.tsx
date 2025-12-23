
import React, { useState, useEffect } from 'react';
import { Project, Category } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { Layers, Gamepad2, Smartphone, BookOpen, Search, X, ChevronLeft, ChevronRight, Share2, Check, TrendingUp, Users, Download, Heart, Compass, Zap, Server, Shield, Coins } from 'lucide-react';
import { DonationModal } from '../components/DonationModal';

interface HomeProps {
  projects: Project[];
  onLike: (projectId: string) => void;
  onDonate: (projectId: string, amount: number) => void;
  onSupportPlatform: () => void;
}

const ITEMS_PER_PAGE = 12;

export const Home: React.FC<HomeProps> = ({ projects, onLike, onDonate, onSupportPlatform }) => {
  const [filter, setFilter] = useState<Category>('TODOS');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isDonationModalOpen, setDonationModalOpen] = useState(false);
  const [selectedProjectForDonation, setSelectedProjectForDonation] = useState<Project | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  const filteredProjects = projects.filter(p => {
    const matchesCategory = filter === 'TODOS' || p.category === filter;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const currentProjects = filteredProjects.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDonateClick = (project: Project) => {
    setSelectedProjectForDonation(project);
    setDonationModalOpen(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin + window.location.pathname);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryThumbnails = [
    { id: 'TODOS', label: 'Todo el Universo', icon: <Compass size={24} />, img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop', color: 'indigo' },
    { id: 'JUEGO', label: 'Zona Gaming', icon: <Gamepad2 size={24} />, img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop', color: 'orange' },
    { id: 'APP', label: 'Aplicaciones', icon: <Smartphone size={24} />, img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop', color: 'blue' },
    { id: 'LIBRO', label: 'Biblioteca Digital', icon: <BookOpen size={24} />, img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=400&auto=format&fit=crop', color: 'emerald' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0b10] text-gray-100">
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setDonationModalOpen(false)}
        onDonate={(amount) => selectedProjectForDonation && onDonate(selectedProjectForDonation.id, amount)}
        projectTitle={selectedProjectForDonation?.title || ''}
      />

      {/* BLOQUE 1: HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-[#0a0b10] to-[#0a0b10]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-black uppercase tracking-widest mb-8 backdrop-blur-xl">
            <Zap size={14} className="fill-current" />
            La Plataforma SPARKZ está en vivo
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1] tracking-tighter">
            IMPULSA TU <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">CREATIVIDAD.</span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative w-full group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={22} />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Busca el próximo éxito..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white/10 transition-all text-lg shadow-2xl backdrop-blur-md"
              />
            </div>
            <button 
              onClick={copyToClipboard}
              className={`h-[68px] px-8 rounded-2xl font-black flex items-center gap-2 transition-all shadow-xl active:scale-95 ${
                copied ? 'bg-green-600 text-white' : 'bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300'
              }`}
            >
              {copied ? <Check size={20} /> : <Share2 size={20} />}
              <span className="hidden sm:inline">{copied ? '¡URL Copiada!' : 'Compartir'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* BLOQUE 2: MINIATURAS CATEGORÍA */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categoryThumbnails.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setFilter(cat.id as Category);
                  const el = document.getElementById('trending');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`group relative h-32 md:h-40 rounded-3xl overflow-hidden border-2 transition-all duration-500 ${
                  filter === cat.id 
                    ? `border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-105 z-10` 
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                <img src={cat.img} alt={cat.label} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${filter === cat.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                <div className="absolute inset-0 bg-black/40 group-hover:opacity-30 transition-opacity"></div>
                <div className="absolute inset-0 p-4 flex flex-col justify-end items-start text-left">
                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md mb-2">{cat.icon}</div>
                  <span className="text-sm md:text-base font-black tracking-tight text-white">{cat.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 3: CATÁLOGO */}
      <section id="trending" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-indigo-500"></div>
                <h2 className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">Directorio SPARKZ</h2>
              </div>
              <h3 className="text-4xl font-black text-white">
                {filter === 'TODOS' ? 'Explorando Todo' : `Viendo ${filter}S`}
              </h3>
            </div>
            <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">{filteredProjects.length} PROYECTOS</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onLike={onLike} onDonateClick={handleDonateClick} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-20 gap-3">
              <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10" disabled={currentPage === 1}><ChevronLeft /></button>
              <div className="flex items-center px-8 rounded-2xl bg-white/5 border border-white/10 font-black text-indigo-400">{currentPage} / {totalPages}</div>
              <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10" disabled={currentPage === totalPages}><ChevronRight /></button>
            </div>
          )}
        </div>
      </section>

      {/* NUEVO BLOQUE: SOPORTE PLATAFORMA (TU INFORMACIÓN) */}
      <section className="py-24 bg-[#0d0e14] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-white/10 rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
            <div className="absolute top-10 right-10 opacity-5">
              <Zap size={200} />
            </div>
            
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-black uppercase tracking-widest mb-8">
                <Coins size={14} /> Mantenimiento de Infraestructura
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                AYÚDANOS A <br />
                <span className="text-yellow-500">MANTENER SPARKZ</span> VIVO.
              </h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Cada servidor, actualización de seguridad y funcionalidad de IA tiene un costo. Tu donación directa nos permite seguir siendo una plataforma gratuita para los creadores de todo el mundo.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400"><Server size={20} /></div>
                  <span className="text-sm font-bold text-gray-300">Servidores 24/7</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400"><Shield size={20} /></div>
                  <span className="text-sm font-bold text-gray-300">Cifrado de Datos</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400"><Zap size={20} /></div>
                  <span className="text-sm font-bold text-gray-300">IA de Sparkz</span>
                </div>
              </div>

              <button 
                onClick={onSupportPlatform}
                className="px-10 py-5 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-2xl transition-all shadow-2xl shadow-yellow-500/20 active:scale-95 flex items-center gap-3 text-lg"
              >
                <Heart size={24} className="fill-current" />
                Hacer una Donación a la Plataforma
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE FINAL: STATS */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all">
              <Users className="text-indigo-600 mb-6" size={56} />
              <div className="text-4xl font-black text-white mb-2">2.4k+</div>
              <div className="text-indigo-400 font-black text-xs uppercase tracking-widest">Creadores Activos</div>
            </div>
            <div className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all">
              <Download className="text-blue-600 mb-6" size={56} />
              <div className="text-4xl font-black text-white mb-2">150k+</div>
              <div className="text-blue-400 font-black text-xs uppercase tracking-widest">Descargas Totales</div>
            </div>
            <div className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-pink-500/30 transition-all">
              <Heart className="text-pink-600 mb-6" size={56} />
              <div className="text-4xl font-black text-white mb-2">$45k+</div>
              <div className="text-pink-400 font-black text-xs uppercase tracking-widest">Apoyo Recaudado</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
