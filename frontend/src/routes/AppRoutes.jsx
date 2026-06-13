import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { publicRoutes } from './publicRoutes';
import { userRoutes } from './userRoutes';
import { adminRoutes } from './adminRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {publicRoutes}
        {userRoutes}
        {adminRoutes}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
