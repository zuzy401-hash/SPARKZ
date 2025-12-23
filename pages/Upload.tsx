import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, Category } from '../types';
import { generateProjectDescription } from '../services/geminiService';
import { Sparkles, Upload as UploadIcon, Github, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Tooltip } from '../components/Tooltip';

interface UploadProps {
  onAddProject: (project: Project) => void;
}

export const Upload: React.FC<UploadProps> = ({ onAddProject }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'JUEGO' as Category,
    author: user?.name || '',
    donationGoal: 100,
    repositoryUrl: '',
    keywords: '', // For AI generation
  });
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Auth Guard
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'DEVELOPER' || !user.isVerified) {
      navigate('/become-developer');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'DEVELOPER' || !user.isVerified) {
    return null;
  }

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
    if (!formData.author.trim()) newErrors.author = 'El autor es obligatorio';
    if (formData.donationGoal <= 0) newErrors.donationGoal = 'La meta debe ser mayor a 0';
    if (!description.trim()) newErrors.description = 'La descripción no puede estar vacía';
    
    // Simple URL validation
    if (formData.repositoryUrl && !/^https?:\/\/.+/.test(formData.repositoryUrl)) {
      newErrors.repositoryUrl = 'La URL debe comenzar con http:// o https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const newProject: Project = {
      id: Date.now().toString(),
      title: formData.title,
      description: description,
      category: formData.category,
      author: formData.author, 
      image: `https://picsum.photos/800/600?random=${Date.now()}`,
      donationGoal: formData.donationGoal,
      currentDonation: 0,
      downloadCount: 0,
      likes: 0,
      repositoryUrl: formData.repositoryUrl || undefined,
      createdAt: new Date().toISOString(),
    };

    onAddProject(newProject);
    navigate('/');
  };

  const handleGenerateDescription = async () => {
    if (!formData.title || !formData.keywords) {
      alert("Por favor ingresa un título y algunas palabras clave para generar la descripción.");
      return;
    }
    
    setIsGenerating(true);
    const generated = await generateProjectDescription(
      formData.title, 
      formData.category, 
      formData.keywords
    );
    setDescription(generated);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-600 rounded-xl">
              <UploadIcon className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Subir Proyecto</h1>
              <p className="text-gray-400">Comparte tu creación con la comunidad de SPARKZ</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Título del Proyecto</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 ${errors.title ? 'border-red-500' : 'border-gray-700'}`}
                  placeholder="Ej. Galaxy Defender"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Autor / Creador</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 ${errors.author ? 'border-red-500' : 'border-gray-700'}`}
                  placeholder="Tu nombre o estudio"
                />
                 {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="JUEGO">Juego</option>
                  <option value="APP">Aplicación</option>
                  <option value="LIBRO">Libro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Meta de Donación ($)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.donationGoal}
                  onChange={(e) => setFormData({...formData, donationGoal: Number(e.target.value)})}
                  className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 ${errors.donationGoal ? 'border-red-500' : 'border-gray-700'}`}
                />
                {errors.donationGoal && <p className="text-red-500 text-xs mt-1">{errors.donationGoal}</p>}
              </div>
            </div>

            {/* Repository URL Section */}
            <div>
               <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                 <Github size={16} /> URL del Repositorio (Opcional)
               </label>
               <input
                 type="url"
                 value={formData.repositoryUrl}
                 onChange={(e) => setFormData({...formData, repositoryUrl: e.target.value})}
                 className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-600 ${errors.repositoryUrl ? 'border-red-500' : 'border-gray-700'}`}
                 placeholder="https://github.com/usuario/mi-proyecto"
               />
               {errors.repositoryUrl && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.repositoryUrl}
                  </p>
               )}
               <p className="text-xs text-gray-500 mt-1">Fomenta la transparencia y el código abierto enlazando tu repositorio.</p>
            </div>

            {/* AI Section */}
            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-5 mt-4">
              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center gap-2 text-sm font-bold text-indigo-300">
                  <Sparkles size={16} /> Asistente de IA (Gemini)
                </label>
                <Tooltip content="Usa IA para generar una descripción basada en palabras clave">
                   <div className="w-4 h-4 rounded-full bg-indigo-500/50 text-xs flex items-center justify-center cursor-help">?</div>
                </Tooltip>
              </div>
              
              <div className="mb-4">
                 <label className="block text-xs text-gray-400 mb-1">Palabras clave / Resumen breve</label>
                 <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.keywords}
                      onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                      placeholder="Ej. rpg, espacial, combate por turnos, gráficos pixel art"
                      className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={handleGenerateDescription}
                      disabled={isGenerating}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                      {isGenerating ? 'Generando...' : 'Generar Descripción'}
                    </button>
                 </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descripción Detallada</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className={`w-full bg-gray-900 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 ${errors.description ? 'border-red-500' : 'border-gray-700'}`}
                  placeholder="La descripción de tu proyecto aparecerá aquí..."
                ></textarea>
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-lg text-gray-300 hover:text-white font-medium hover:bg-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-lg font-bold shadow-lg shadow-indigo-600/20 transition-all"
              >
                Publicar Proyecto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};