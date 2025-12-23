import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Check, ShieldCheck, CreditCard, Rocket, Code } from 'lucide-react';

export const BecomeDeveloper: React.FC = () => {
  const { upgradeToDeveloper, user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simular proceso de pago
    setTimeout(() => {
      upgradeToDeveloper();
      setIsProcessing(false);
      navigate('/upload');
    }, 2000);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Conviértete en <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Creador Verificado</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Únete a la élite de desarrolladores de SPARKZ. Publica tus proyectos, juegos y libros para una audiencia global con un único pago de por vida.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Benefits List */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-indigo-900/50 p-3 rounded-lg h-fit">
                <Rocket className="text-indigo-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Publicación Ilimitada</h3>
                <p className="text-gray-400">Sube todos los proyectos que quieras sin costes adicionales ni suscripciones mensuales.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-purple-900/50 p-3 rounded-lg h-fit">
                <Code className="text-purple-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Enlace a Repositorios</h3>
                <p className="text-gray-400">Fomenta el Open Source enlazando directamente a GitHub o GitLab desde tus proyectos.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-900/50 p-3 rounded-lg h-fit">
                <ShieldCheck className="text-green-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Insignia de Verificación</h3>
                <p className="text-gray-400">Gana la confianza de los usuarios con la insignia de "Creador Verificado" en tu perfil.</p>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              PAGO ÚNICO
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Licencia de Desarrollador</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-extrabold text-white">$19.99</span>
              <span className="text-gray-400">USD</span>
            </div>

            <ul className="space-y-3 mb-8 text-gray-300">
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Acceso al panel de carga</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Recibe donaciones directamente</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Soporte prioritario</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-400" /> Analytics de descargas</li>
            </ul>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Procesando Pago...
                </>
              ) : (
                <>
                  <CreditCard className="group-hover:scale-110 transition-transform" />
                  Pagar y Registrarse
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
              Pago seguro encriptado. Garantía de devolución de 30 días.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};