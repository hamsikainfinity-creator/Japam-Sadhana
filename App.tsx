import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MantraDetail from './pages/MantraDetail';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mantra/:id" element={<MantraDetail />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
