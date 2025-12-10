import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import MantraCard from '../components/MantraCard';
import { MANTRAS } from '../constants';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleMantraClick = (id: number) => {
    navigate(`/mantra/${id}`);
  };

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-gradient-to-br from-amber-100 to-orange-50 p-6 rounded-2xl border border-orange-200 text-center mb-8">
          <h2 className="text-2xl font-bold text-orange-800 mb-2">శుభోదయం</h2>
          <p className="text-orange-700 opacity-90">ఈ రోజు మీరు ఏ మంత్రాన్ని జపించాలనుకుంటున్నారు?</p>
        </div>

        {MANTRAS.map((group, index) => (
          <section key={index} className="space-y-4">
            <h2 className="text-xl font-bold text-orange-900 border-l-4 border-orange-500 pl-3">
              {group.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.mantras.map((mantra) => (
                <MantraCard 
                  key={mantra.id} 
                  mantra={mantra} 
                  onClick={handleMantraClick} 
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
