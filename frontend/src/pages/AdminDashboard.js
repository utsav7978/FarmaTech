// pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { cropService } from '../services/cropService';
import { purchaseService } from '../services/purchaseService';
import { toast } from 'react-toastify';
import { Users, Package, ShoppingBag, Trash2 } from 'lucide-react';
import Loading from '../components/common/Loading';
import ConfirmModal from '../components/common/ConfirmModal';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [deleteModal, setDeleteModal] = useState({ 
    show: false, 
    type: null, 
    id: null, 
    name: '' 
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersResponse, cropsResponse, purchasesResponse] = await Promise.all([
        userService.getAllUsers(),
        cropService.getAllCropsAdmin(),
        purchaseService.getAllPurchases()
      ]);
      setUsers(usersResponse.data);
      setCrops(cropsResponse.data);
      setPurchases(purchasesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (deleteModal.type === 'user') {
        await userService.deleteUser(deleteModal.id);
        toast.success('User deleted successfully!');
      } else if (deleteModal.type === 'crop') {
        await cropService.deleteCropAdmin(deleteModal.id);
        toast.success('Crop deleted successfully!');
      }
      setDeleteModal({ show: false, type: null, id: null, name: '' });
      fetchData();
    } catch (error) {
      toast.error(`Failed to delete ${deleteModal.type}`);
    }
  };

  const getUsersByRole = (role) => users.filter(user => user.role === role);

  const stats = {
    totalUsers: users.length,
    farmers: getUsersByRole('FARMER').length,
    buyers: getUsersByRole('GOVERNMENT_OFFICIAL').length + getUsersByRole('INDUSTRIALIST').length,
    admins: getUsersByRole('ADMIN').length,
    totalCrops: crops.length,
    totalPurchases: purchases.length,
    totalValue: purchases.reduce((sum, purchase) => sum + parseFloat(purchase.totalPrice), 0)
  };

  if (loading) {
    return <Loading message="Loading admin dashboard..." />;
  }

  return (
    <div className="dashboard admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>System Overview and Management</p>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users ({stats.totalUsers})
          </button>
          <button
            className={`tab ${activeTab === 'crops' ? 'active' : ''}`}
            onClick={() => setActiveTab('crops')}
          >
            Crops ({stats.totalCrops})
          </button>
          <button
            className={`tab ${activeTab === 'purchases' ? 'active' : ''}`}
            onClick={() => setActiveTab('purchases')}
          >
            Purchases ({stats.totalPurchases})
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <Users className="stat-icon" />
                <div className="stat-content">
                  <h3>Total Users</h3>
                  <p className="stat-number">{stats.totalUsers}</p>
                  <div className="stat-breakdown">
                    <span>Farmers: {stats.farmers}</span>
                    <span>Buyers: {stats.buyers}</span>
                    <span>Admins: {stats.admins}</span>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <Package className="stat-icon" />
                <div className="stat-content">
                  <h3>Total Crops</h3>
                  <p className="stat-number">{stats.totalCrops}</p>
                  <span>Listed by farmers</span>
                </div>
              </div>

              <div className="stat-card">
                <ShoppingBag className="stat-icon" />
                <div className="stat-content">
                  <h3>Total Purchases</h3>
                  <p className="stat-number">{stats.totalPurchases}</p>
                  <span>Completed transactions</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-content">
                  <h3>Total Value</h3>
                  <p className="stat-number">₹{stats.totalValue.toFixed(2)}</p>
                  <span>Transaction value</span>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {purchases.slice(0, 5).map((purchase) => (
                  <div key={purchase.id} className="activity-item">
                    <div className="activity-info">
                      <p><strong>{purchase.buyerName}</strong> purchased <strong>{purchase.quantity}kg</strong> of <strong>{purchase.cropName}</strong></p>
                      <span className="activity-time">{new Date(purchase.timestamp).toLocaleString()}</span>
                    </div>
                    <span className="activity-value">₹{purchase.totalPrice}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h2>User Management</h2>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.contact}</td>
                      <td>
                        <span className={`role-badge ${user.role.toLowerCase()}`}>
                          {user.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => setDeleteModal({
                            show: true,
                            type: 'user',
                            id: user.id,
                            name: user.name
                          })}
                          className="btn-icon text-danger"
                          title="Delete User"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'crops' && (
          <div className="crops-section">
            <h2>Crop Management</h2>
            <div className="crops-table">
              <table>
                <thead>
                  <tr>
                    <th>Crop Name</th>
                    <th>Farmer</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Listed Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {crops.map((crop) => (
                    <tr key={crop.id}>
                      <td>{crop.name}</td>
                      <td>{crop.farmerName}</td>
                      <td>{crop.quantity}kg</td>
                      <td>₹{crop.price}/kg</td>
                      <td>{new Date(crop.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => setDeleteModal({
                            show: true,
                            type: 'crop',
                            id: crop.id,
                            name: crop.name
                          })}
                          className="btn-icon text-danger"
                          title="Delete Crop"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className="purchases-section">
            <h2>Purchase Management</h2>
            <div className="purchases-table">
              <table>
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Farmer</th>
                    <th>Buyer</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td>{purchase.cropName}</td>
                      <td>{purchase.farmerName}</td>
                      <td>{purchase.buyerName}</td>
                      <td>{purchase.quantity}kg</td>
                      <td>₹{purchase.totalPrice}</td>
                      <td>{new Date(purchase.timestamp).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={deleteModal.show}
          onClose={() => setDeleteModal({ show: false, type: null, id: null, name: '' })}
          onConfirm={handleDelete}
          title={`Delete ${deleteModal.type}`}
          message={`Are you sure you want to delete ${deleteModal.type} "${deleteModal.name}"? This action cannot be undone.`}
          confirmText="Delete"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;