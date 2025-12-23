import React, { useState } from 'react';
import { X, Heart, Coffee, Sparkles } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDonate: (amount: number, name: string) => void;
  projectTitle: string;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, onDonate, projectTitle }) => {
  const [amount, setAmount] = useState<number>(5);
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDonate = () => {
    setIsProcessing(true);
    // Simulate network request
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onDonate(amount, name || 'Anónimo');
        setIsSuccess(false);
        setAmount(5);
        setName('');
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity duration-300">
      <div className="bg-gray-900 rounded-3xl w-full max-w-md border border-indigo-500/30 shadow-[0_0_50px_rgba(79,70,229,0.3)] overflow-hidden relative transform transition-all scale-100">
        
        {/* Decorative background gradients */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-900/40 to-transparent pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-800/50 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-all hover:rotate-90 z-10"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center h-[400px]">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-green-500 blur-xl opacity-20 animate-pulse"></div>
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <Heart className="text-white fill-current" size={40} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">¡Gracias Increíbles!</h3>
            <p className="text-indigo-200 text-lg">Tu donación de ${amount} hace la diferencia.</p>
            <div className="mt-8 px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-400 flex items-center gap-2">
              <Sparkles size={16} className="text-yellow-400" />
              <span>Ayudando a: {projectTitle}</span>
            </div>
          </div>
        ) : (
          <div className="p-8 relative">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-4 shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-900/50">
                <Heart size={32} className="fill-current animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Apoyar Proyecto</h3>
              <p className="text-indigo-200/80 text-sm mt-2 font-medium bg-indigo-900/30 inline-block px-3 py-1 rounded-full border border-indigo-500/20">
                {projectTitle}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[5, 10, 25].map((val) => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`py-4 rounded-2xl font-bold text-lg transition-all duration-300 border-2 transform hover:-translate-y-1 ${
                    amount === val 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/40 scale-105' 
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>

            <div className="space-y-5 bg-gray-800/50 p-5 rounded-2xl border border-gray-700/50">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider flex justify-between">
                  <span>Monto Personalizado</span>
                  <span className="text-indigo-400">USD</span>
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold group-focus-within:text-indigo-400 transition-colors">$</span>
                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-gray-900 border-2 border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white font-bold text-lg focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Tu Nombre (Opcional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Donador Anónimo"
                  className="w-full bg-gray-900 border-2 border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleDonate}
              disabled={isProcessing || amount <= 0}
              className="w-full mt-8 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] flex items-center justify-center gap-3 text-lg border border-white/10"
            >
              {isProcessing ? (
                <>
                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Procesando...
                </>
              ) : (
                <>
                  <Coffee size={24} className="animate-bounce" style={{ animationDuration: '3s' }} />
                  Invitar un café (${amount})
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
