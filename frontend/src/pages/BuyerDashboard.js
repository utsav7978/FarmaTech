import React, { useState, useEffect } from 'react';
import { cropService } from '../services/cropService';
import { purchaseService } from '../services/purchaseService';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, ShoppingCart } from 'lucide-react';
import Loading from '../components/common/Loading';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [crops, setCrops] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('crops');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cropsResponse, purchasesResponse] = await Promise.all([
        cropService.getAllCrops(),
        purchaseService.getBuyerPurchases()
      ]);
      setCrops(cropsResponse.data);
      setPurchases(purchasesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const filteredCrops = crops.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Buyer Dashboard</h1>
          <p>Welcome back, {user.name}! ({user.role.replace('_', ' ')})</p>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab ${activeTab === 'crops' ? 'active' : ''}`}
            onClick={() => setActiveTab('crops')}
          >
            Available Crops ({filteredCrops.length})
          </button>
          <button
            className={`tab ${activeTab === 'purchases' ? 'active' : ''}`}
            onClick={() => setActiveTab('purchases')}
          >
            My Purchases ({purchases.length})
          </button>
        </div>

        {activeTab === 'crops' && (
          <div className="crops-section">
            <div className="section-header">
              <h2>Available Crops</h2>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="crops-grid">
              {filteredCrops.map((crop) => (
                <div key={crop.id} className="crop-card">
                  <div className="crop-header">
                    <h3>{crop.name}</h3>
                    <span className="crop-price">₹{crop.price}/kg</span>
                  </div>
                  <p className="crop-description">{crop.description}</p>
                  <div className="crop-details">
                    <div className="detail-item">
                      <span className="label">Available:</span>
                      <span className="value">{crop.quantity}kg</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Farmer:</span>
                      <span className="value">{crop.farmerName}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Contact:</span>
                      <span className="value">{crop.farmerContact}</span>
                    </div>
                  </div>
                  <div className="crop-actions">
                    <Link to={`/crops/${crop.id}`} className="btn btn-outline">
                      <Eye className="btn-icon" />
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredCrops.length === 0 && (
              <div className="empty-state">
                <p>
                  {searchTerm 
                    ? `No crops found matching "${searchTerm}"`
                    : "No crops available at the moment."
                  }
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className="purchases-section">
            <h2>Purchase History</h2>
            {purchases.length > 0 ? (
              <div className="purchases-table">
                <table>
                  <thead>
                    <tr>
                      <th>Crop</th>
                      <th>Farmer</th>
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
                        <td>{purchase.quantity}kg</td>
                        <td>₹{purchase.totalPrice}</td>
                        <td>{new Date(purchase.timestamp).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <p>No purchases yet. Browse available crops to make your first purchase!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;