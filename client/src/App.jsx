import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DesignSystemPage from './pages/DesignSystemPage';
import ToastProvider from './context/ToastContext';

export function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="design-system" element={<DesignSystemPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
