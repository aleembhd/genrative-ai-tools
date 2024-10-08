import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Reminders: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate('/')} className="mr-4 text-gray-400 hover:text-gray-300">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-4xl font-bold">Reminders</h1>
      </div>
      <p>Reminders functionality coming soon...</p>
    </div>
  );
};

export default Reminders;