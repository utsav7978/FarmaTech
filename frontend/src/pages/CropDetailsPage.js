import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cropService } from '../services/cropService';
import { purchaseService } from '../services/purchaseService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Calendar, User, Phone, Mail } from 'lucide-react';
import Loading from '../components/common/Loading';

const CropDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, hasAnyRole } = useAuth();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchaseQuantity, setPurchaseQuantity] = useState('');
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        let response;
        if (isAuthenticated() && hasAnyRole(['GOVERNMENT_OFFICIAL', 'INDUSTRIALIST'])) {
          response = await cropService.getCropById(id);
        } else {
          // Use public endpoint for non-buyers or unauthenticated users
          const publicResponse = await cropService.getPublicCrops();
          const cropData = publicResponse.data.find(c => c.id === parseInt(id));
          response = { data: cropData };
        }
        setCrop(response.data);
      } catch (error) {
        console.error('Error fetching crop:', error);
        toast.error('Failed to load crop details');
      } finally {
        setLoading(false);
      }
    };

    fetchCrop();
  }, [id, isAuthenticated, hasAnyRole]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    setPurchaseLoading(true);

    try {
      const purchaseData = {
        cropId: parseInt(id),
        quantity: parseFloat(purchaseQuantity)
      };

      await purchaseService.createPurchase(purchaseData);
      toast.success('Purchase request submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create purchase';
      toast.error(errorMessage);
    } finally {
      setPurchaseLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading crop details..." />;
  }

  if (!crop) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>Crop not found</h2>
          <p>The crop you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const canPurchase = isAuthenticated() && hasAnyRole(['GOVERNMENT_OFFICIAL', 'INDUSTRIALIST']);

  return (
    <div className="crop-details-page">
      <div className="container">
        <div className="crop-details-card">
          <div className="crop-header">
            <h1 className="crop-title">{crop.name}</h1>
            <div className="crop-meta">
              <span className="crop-price">₹{crop.price}/kg</span>
              <span className="crop-quantity">{crop.quantity}kg available</span>
            </div>
          </div>

          <div className="crop-content">
            <div className="crop-description">
              <h3>Description</h3>
              <p>{crop.description}</p>
            </div>

            <div className="farmer-details">
              <h3>Farmer Information</h3>
              <div className="farmer-info">
                <div className="info-item">
                  <User className="info-icon" />
                  <span>{crop.farmerName}</span>
                </div>
                <div className="info-item">
                  <Mail className="info-icon" />
                  <span>{crop.farmerEmail}</span>
                </div>
                <div className="info-item">
                  <Phone className="info-icon" />
                  <span>{crop.farmerContact}</span>
                </div>
                <div className="info-item">
                  <Calendar className="info-icon" />
                  <span>Listed on {new Date(crop.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {canPurchase && (
              <div className="purchase-section">
                <h3>Purchase This Crop</h3>
                <form onSubmit={handlePurchase} className="purchase-form">
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity (kg)</label>
                    <input
                      type="number"
                      id="quantity"
                      value={purchaseQuantity}
                      onChange={(e) => setPurchaseQuantity(e.target.value)}
                      min="0.1"
                      max={crop.quantity}
                      step="0.1"
                      required
                      className="form-control"
                      placeholder="Enter quantity in kg"
                    />
                  </div>
                  
                  {purchaseQuantity && (
                    <div className="purchase-summary">
                      <p>Total Cost: ₹{(parseFloat(purchaseQuantity) * crop.price).toFixed(2)}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={purchaseLoading || !purchaseQuantity}
                    className="btn btn-primary"
                  >
                    {purchaseLoading ? 'Processing...' : 'Submit Purchase Request'}
                  </button>
                </form>
              </div>
            )}

            {!isAuthenticated() && (
              <div className="auth-prompt">
                <p>Please <a href="/login">login</a> as a Government Official or Industrialist to purchase this crop.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetailsPage;