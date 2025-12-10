import React from 'react';
import { Mantra } from '../types';
import { ChevronRight, Sparkles } from 'lucide-react';

interface MantraCardProps {
  mantra: Mantra;
  onClick: (id: number) => void;
}

const MantraCard: React.FC<MantraCardProps> = ({ mantra, onClick }) => {
  return (
    <div 
      onClick={() => onClick(mantra.id)}
      className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 flex items-center justify-between cursor-pointer hover:shadow-md hover:border-orange-300 transition-all duration-300 group active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
          <Sparkles size={18} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">
            {mantra.title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">మంత్రం తెరవండి</p>
        </div>
      </div>
      <ChevronRight className="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" size={24} />
    </div>
  );
};

export default MantraCard;
