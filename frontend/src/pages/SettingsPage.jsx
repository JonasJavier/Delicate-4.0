import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/User.css';
import { fetchUserProfile, updateUserProfile } from '../services/api';

const SettingsPage = () => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    billing_first_name: '',
    billing_last_name: '',
    company_name: '',
    street_address: '',
    country: '',
    state: '',
    zip_code: '',
    billing_email: '',
    billing_phone: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar el perfil del usuario cuando el componente se monta
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfile(data);
      } catch (err) {
        setError('Error loading profile');
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateUserProfile(profile);
      setProfile(updatedProfile);
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Error updating profile');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-page-container p-4">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="settings-container shadow-lg">
            <h4 className="mb-4">Account Settings</h4>
            <div className="card30 p-4 mb-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      value={profile.first_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      value={profile.last_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={profile.email}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="phone_number">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone_number"
                    value={profile.phone_number}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Save Changes
                </button>
              </form>
            </div>

            <h4 className="mb-4">Billing Address</h4>
            <div className="card30 p-4 mb-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="billing_first_name">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="billing_first_name"
                      value={profile.billing_first_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="billing_last_name">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="billing_last_name"
                      value={profile.billing_last_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="company_name">Company Name (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="company_name"
                    value={profile.company_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="street_address">Street Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="street_address"
                    value={profile.street_address}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="country">Country / Region</label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      value={profile.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      value={profile.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="zip_code">Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip_code"
                      value={profile.zip_code}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="billing_email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="billing_email"
                      value={profile.billing_email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="billing_phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="billing_phone"
                    value={profile.billing_phone}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Save Changes
                </button>
              </form>
            </div>

            <h4 className="mb-4">Change Password</h4>
            <div className="card30 p-4">
              <form>
                <div className="form-group mb-4">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      placeholder="Password"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
