import React from 'react';
import { useAuth } from '../context/AuthContext';
import FarmerDashboard from './FarmerDashboard';
import BuyerDashboard from './BuyerDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardPage = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user.role) {
      case 'FARMER':
        return <FarmerDashboard />;
      case 'GOVERNMENT_OFFICIAL':
      case 'INDUSTRIALIST':
        return <BuyerDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      default:
        return (
          <div className="dashboard">
            <div className="container">
              <h2>Dashboard</h2>
              <p>Invalid user role.</p>
            </div>
          </div>
        );
    }
  };

  return renderDashboard();
};

export default DashboardPage;