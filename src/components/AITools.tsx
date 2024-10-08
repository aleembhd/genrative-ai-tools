import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { ArrowLeft, Plus, Search, Trash2, Edit2, X } from 'lucide-react';
import { ref, push, remove, update, onValue } from "firebase/database";

interface AITool {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
}

interface AIToolsProps {
  database: any;
}

const categories = ['All', 'Image', 'Video', 'Audio', 'Development', 'Productivity', 'Generative AI', 'Others'];

const AITools: React.FC<AIToolsProps> = ({ database }) => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [showAddTool, setShowAddTool] = useState(false);
  const [newTool, setNewTool] = useState<Omit<AITool, 'id'>>({ name: '', url: '', description: '', category: '' });
  const [editingTool, setEditingTool] = useState<AITool | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const toolsRef = ref(database, 'tools');
    onValue(toolsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const toolsList = Object.entries(data).map(([id, tool]: [string, any]) => ({
          id,
          ...tool,
        }));
        setTools(toolsList);
      }
    });
  }, [database]);

  const handleAddTool = () => {
    if (newTool.name && newTool.url && newTool.description && newTool.category) {
      const toolsRef = ref(database, 'tools');
      push(toolsRef, newTool);
      setNewTool({ name: '', url: '', description: '', category: '' });
      setShowAddTool(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleEditTool = () => {
    if (editingTool && editingTool.name && editingTool.url && editingTool.description && editingTool.category) {
      const toolRef = ref(database, `tools/${editingTool.id}`);
      update(toolRef, {
        name: editingTool.name,
        url: editingTool.url,
        description: editingTool.description,
        category: editingTool.category,
      });
      setEditingTool(null);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleDeleteTool = (id: string) => {
    const toolRef = ref(database, `tools/${id}`);
    remove(toolRef);
  };

  const filteredTools = tools.filter(
    (tool) =>
      (tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || tool.category === selectedCategory)
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      <div className="flex items-center mb-8">
        <button onClick={() => navigate('/')} className="mr-4 text-gray-400 hover:text-gray-300">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-4xl font-bold">AI Tools</h1>
      </div>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search AI tools by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 rounded-md border border-gray-700 bg-gray-800 text-white"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => setShowAddTool(!showAddTool)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
      >
        {showAddTool ? <X size={20} className="mr-2" /> : <Plus size={20} className="mr-2" />}
        {showAddTool ? 'Cancel' : 'Add New AI Tool'}
      </button>
      {showAddTool && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New AI Tool</h2>
          <input
            type="text"
            placeholder="Tool name"
            value={newTool.name}
            onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
            className="w-full p-2 mb-2 rounded-md border border-gray-700 bg-gray-900 text-white"
          />
          <input
            type="text"
            placeholder="Tool URL"
            value={newTool.url}
            onChange={(e) => setNewTool({ ...newTool, url: e.target.value })}
            className="w-full p-2 mb-2 rounded-md border border-gray-700 bg-gray-900 text-white"
          />
          <textarea
            placeholder="Tool description"
            value={newTool.description}
            onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
            className="w-full p-2 mb-2 rounded-md border border-gray-700 bg-gray-900 text-white"
          />
          <select
            value={newTool.category}
            onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
            className="w-full p-2 mb-4 rounded-md border border-gray-700 bg-gray-900 text-white"
          >
            <option value="">Select a category</option>
            {categories.filter(cat => cat !== 'All').map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button
            onClick={handleAddTool}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Add Tool
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="bg-gray-800 p-4 rounded-lg shadow-md relative">
            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block">
              <div className="flex items-center mb-2">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${tool.url}&sz=32`}
                  alt={`${tool.name} favicon`}
                  className="w-6 h-6 mr-2"
                />
                <h3 className="text-lg font-semibold">{tool.name}</h3>
              </div>
              <p className="text-gray-300 mb-2">{tool.description}</p>
              <p className="text-sm text-gray-400">Category: {tool.category}</p>
            </a>
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <button
                onClick={() => setEditingTool(tool)}
                className="text-gray-400 hover:text-blue-500"
              >
                <Edit2 size={20} />
              </button>
              <button
                onClick={() => handleDeleteTool(tool.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingTool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit AI Tool</h2>
            <input
              type="text"
              placeholder="Tool name"
              value={editingTool.name}
              onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
              className="w-full p-2 mb-2 rounded-md border border-gray-700 bg-gray-900 text-white"
            />
            <input
              type="text"
              placeholder="Tool URL"
              value={editingTool.url}
              onChange={(e) => setEditingTool({ ...editingTool, url: e.target.value })}
              className="w-full p-2 mb-2 rounded-md border border-gray-700 bg-gray-900 text-white"
            />
            <textarea
              placeholder="Tool description"
              value={editingTool.description}
              onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
              className="w-full p-2 mb-2 rounded-md border border-gray-700 bg-gray-900 text-white"
            />
            <select
              value={editingTool.category}
              onChange={(e) => setEditingTool({ ...editingTool, category: e.target.value })}
              className="w-full p-2 mb-4 rounded-md border border-gray-700 bg-gray-900 text-white"
            >
              <option value="">Select a category</option>
              {categories.filter(cat => cat !== 'All').map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingTool(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditTool}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITools;