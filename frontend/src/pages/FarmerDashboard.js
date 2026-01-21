import React, { useState, useEffect } from 'react';
import { cropService } from '../services/cropService';
import { purchaseService } from '../services/purchaseService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Loading from '../components/common/Loading';
import ConfirmModal from '../components/common/ConfirmModal';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [crops, setCrops] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('crops');
  const [showCropForm, setShowCropForm] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, cropId: null });

  const [cropForm, setCropForm] = useState({
    name: '',
    description: '',
    quantity: '',
    price: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [cropsResponse, salesResponse] = await Promise.all([
        cropService.getFarmerCrops(),
        purchaseService.getFarmerSales()
      ]);
      setCrops(cropsResponse.data);
      setSales(salesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleCropSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCrop) {
        await cropService.updateCrop(editingCrop.id, cropForm);
        toast.success('Crop updated successfully!');
      } else {
        await cropService.addCrop(cropForm);
        toast.success('Crop added successfully!');
      }
      resetCropForm();
      fetchData();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to save crop';
      toast.error(errorMessage);
    }
  };

  const resetCropForm = () => {
    setCropForm({ name: '', description: '', quantity: '', price: '' });
    setShowCropForm(false);
    setEditingCrop(null);
  };

  const handleEdit = (crop) => {
    setCropForm({
      name: crop.name,
      description: crop.description,
      quantity: crop.quantity.toString(),
      price: crop.price.toString()
    });
    setEditingCrop(crop);
    setShowCropForm(true);
  };

  const handleDelete = async () => {
    try {
      await cropService.deleteCrop(deleteModal.cropId);
      toast.success('Crop deleted successfully!');
      setDeleteModal({ show: false, cropId: null });
      fetchData();
    } catch (error) {
      toast.error('Failed to delete crop');
    }
  };

  if (loading) {
    return <Loading message="Loading dashboard..." />;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Farmer Dashboard</h1>
          <p>Welcome back, {user.name}!</p>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`tab ${activeTab === 'crops' ? 'active' : ''}`}
            onClick={() => setActiveTab('crops')}
          >
            My Crops ({crops.length})
          </button>
          <button
            className={`tab ${activeTab === 'sales' ? 'active' : ''}`}
            onClick={() => setActiveTab('sales')}
          >
            Sales History ({sales.length})
          </button>
        </div>

        {activeTab === 'crops' && (
          <div className="crops-section">
            <div className="section-header">
              <h2>My Crops</h2>
              <button
                className="btn btn-primary"
                onClick={() => setShowCropForm(true)}
              >
                <Plus className="btn-icon" />
                Add New Crop
              </button>
            </div>

            {showCropForm && (
              <div className="crop-form-modal">
                <div className="modal-content">
                  <h3>{editingCrop ? 'Edit Crop' : 'Add New Crop'}</h3>
                  <form onSubmit={handleCropSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Crop Name</label>
                        <input
                          type="text"
                          value={cropForm.name}
                          onChange={(e) => setCropForm({...cropForm, name: e.target.value})}
                          required
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Price per kg (₹)</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0.01"
                          value={cropForm.price}
                          onChange={(e) => setCropForm({...cropForm, price: e.target.value})}
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Quantity (kg)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          value={cropForm.quantity}
                          onChange={(e) => setCropForm({...cropForm, quantity: e.target.value})}
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={cropForm.description}
                        onChange={(e) => setCropForm({...cropForm, description: e.target.value})}
                        required
                        className="form-control"
                        rows="3"
                      />
                    </div>
                    <div className="form-actions">
                      <button type="button" onClick={resetCropForm} className="btn btn-secondary">
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {editingCrop ? 'Update' : 'Add'} Crop
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="crops-grid">
              {crops.map((crop) => (
                <div key={crop.id} className="crop-card">
                  <div className="crop-header">
                    <h3>{crop.name}</h3>
                    <div className="crop-actions">
                      <button
                        onClick={() => handleEdit(crop)}
                        className="btn-icon"
                        title="Edit"
                      >
                        <Edit />
                      </button>
                      <button
                        onClick={() => setDeleteModal({ show: true, cropId: crop.id })}
                        className="btn-icon text-danger"
                        title="Delete"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                  <p className="crop-description">{crop.description}</p>
                  <div className="crop-details">
                    <div className="detail-item">
                      <span className="label">Price:</span>
                      <span className="value">₹{crop.price}/kg</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Quantity:</span>
                      <span className="value">{crop.quantity}kg</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Listed:</span>
                      <span className="value">{new Date(crop.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {crops.length === 0 && (
              <div className="empty-state">
                <p>No crops listed yet. Add your first crop to get started!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="sales-section">
            <h2>Sales History</h2>
            {sales.length > 0 ? (
              <div className="sales-table">
                <table>
                  <thead>
                    <tr>
                      <th>Crop</th>
                      <th>Buyer</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale) => (
                      <tr key={sale.id}>
                        <td>{sale.cropName}</td>
                        <td>{sale.buyerName}</td>
                        <td>{sale.quantity}kg</td>
                        <td>₹{sale.totalPrice}</td>
                        <td>{new Date(sale.timestamp).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <p>No sales yet. Your crops will appear here once buyers purchase them.</p>
              </div>
            )}
          </div>
        )}

        <ConfirmModal
          isOpen={deleteModal.show}
          onClose={() => setDeleteModal({ show: false, cropId: null })}
          onConfirm={handleDelete}
          title="Delete Crop"
          message="Are you sure you want to delete this crop? This action cannot be undone."
          confirmText="Delete"
        />
      </div>
    </div>
  );
};

export default FarmerDashboard;