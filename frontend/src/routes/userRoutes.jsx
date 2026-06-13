import React from 'react';
import { Route } from 'react-router-dom';
import UserDashboard from '../pages/user/UserDashboard';
import Profile from '../pages/user/Profile';
import SavedReviews from '../pages/user/SavedReviews';
import { ProtectedRoute } from '../components/RouteGuards';

export const userRoutes = (
  <>
    <Route path="dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
    <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="saved-reviews" element={<ProtectedRoute><SavedReviews /></ProtectedRoute>} />
  </>
);
