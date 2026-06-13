import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import Reviews from '../pages/Reviews';
import Analytics from '../pages/Analytics';
import Login from '../pages/Login';
import Register from '../pages/Register';

export const publicRoutes = (
  <>
    <Route index element={<Home />} />
    <Route path="reviews" element={<Reviews />} />
    <Route path="analytics" element={<Analytics />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </>
);
