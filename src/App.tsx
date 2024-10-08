import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import AITools from './components/AITools';
import Reminders from './components/Reminders';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBxyNJk3mVT96B38DS-H-3I8xsRd5wEMyA",
  authDomain: "ai-tools-fd0c8.firebaseapp.com",
  databaseURL: "https://ai-tools-fd0c8-default-rtdb.firebaseio.com",
  projectId: "ai-tools-fd0c8",
  storageBucket: "ai-tools-fd0c8.appspot.com",
  messagingSenderId: "513091723833",
  appId: "1:513091723833:web:8dfdfecfcbf09caf3ee3e8"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  return (
    <Router>
      <div className="min-h-screen dark bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/ai-tools" element={<AITools database={database} />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;