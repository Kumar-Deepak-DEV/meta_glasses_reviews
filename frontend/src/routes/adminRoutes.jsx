import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminReviews from '../pages/admin/AdminReviews';
import AdminAnalytics from '../pages/admin/AdminAnalytics';
import AdminSettings from '../pages/admin/AdminSettings';
import { AdminRoute } from '../components/RouteGuards';

export const adminRoutes = (
  <>
    <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
    <Route path="admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
    <Route path="admin/reviews" element={<AdminRoute><AdminReviews /></AdminRoute>} />
    <Route path="admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
    <Route path="admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
  </>
);
