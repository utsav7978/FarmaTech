import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cropService } from '../services/cropService';
import { Leaf, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import Loading from '../components/common/Loading';

const HomePage = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await cropService.getPublicCrops();
        setCrops(response.data.slice(0, 6)); // Show only first 6 crops
      } catch (error) {
        console.error('Error fetching crops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  if (loading) {
    return <Loading message="Loading crops..." />;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Connecting Farmers with <span className="text-primary">Buyers</span>
            </h1>
            <p className="hero-subtitle">
              A platform where farmers can sell their crops directly to government officials and industrialists
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Our Platform?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Leaf className="feature-icon" />
              <h3>For Farmers</h3>
              <p>List your crops and reach verified buyers directly</p>
            </div>
            <div className="feature-card">
              <ShoppingCart className="feature-icon" />
              <p>For Buyers</p>
              <p>Access quality crops from verified farmers</p>
            </div>
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3>Verified Users</h3>
              <p>All users are verified for secure transactions</p>
            </div>
            <div className="feature-card">
              <TrendingUp className="feature-icon" />
              <h3>Fair Pricing</h3>
              <p>Transparent pricing with no hidden fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Crops Section */}
      <section className="featured-crops">
        <div className="container">
          <h2 className="section-title">Featured Crops</h2>
          {crops.length > 0 ? (
            <div className="crops-grid">
              {crops.map((crop) => (
                <div key={crop.id} className="crop-card">
                  <h3 className="crop-name">{crop.name}</h3>
                  <p className="crop-description">{crop.description}</p>
                  <div className="crop-details">
                    <span className="crop-price">₹{crop.price}/kg</span>
                    <span className="crop-quantity">{crop.quantity}kg available</span>
                  </div>
                  <div className="farmer-info">
                    <p>By: {crop.farmerName}</p>
                    <p>Contact: {crop.farmerContact}</p>
                  </div>
                  <Link to={`/crops/${crop.id}`} className="btn btn-outline">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-crops">No crops available at the moment.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;