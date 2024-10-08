import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Cpu } from 'lucide-react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Task Manager and AI Tools</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/reminders')}
        >
          <Bell className="w-12 h-12 mb-4 text-blue-500" />
          <h2 className="text-xl font-semibold mb-2">Reminders</h2>
          <p className="text-gray-300 mb-4">
            Manage your tasks and set reminders for important events.
          </p>
          <div className="flex space-x-2">
            <Facebook className="w-6 h-6 text-blue-500" />
            <Instagram className="w-6 h-6 text-pink-500" />
            <Linkedin className="w-6 h-6 text-blue-700" />
            <Twitter className="w-6 h-6 text-blue-400" />
            <Youtube className="w-6 h-6 text-red-500" />
          </div>
        </div>
        <div
          className="bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate('/ai-tools')}
        >
          <Cpu className="w-12 h-12 mb-4 text-green-500" />
          <h2 className="text-xl font-semibold mb-2">AI Tools</h2>
          <p className="text-gray-300">
            Explore powerful AI tools to boost your productivity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;