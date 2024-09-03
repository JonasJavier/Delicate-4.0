import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/User.css';
import { fetchUserProfile, updateUserProfile, changePassword } from '../services/api';

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
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfile({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone_number: data.phone_number || '',
          billing_first_name: data.billing_first_name || '',
          billing_last_name: data.billing_last_name || '',
          company_name: data.company_name || '',
          street_address: data.street_address || '',
          country: data.country || '',
          state: data.state || '',
          zip_code: data.zip_code || '',
          billing_email: data.billing_email || '',
          billing_phone: data.billing_phone || '',
        });
      } catch (err) {
        console.error("Error loading profile:", err); // Mejor depuración
        setError('Error loading profile');
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile({
      ...profile,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const updatedProfile = await updateUserProfile(profile);
      setProfile(updatedProfile);
      alert('Profile updated successfully!');
      window.location.reload(); // Recargar la página para mostrar los cambios
    } catch (err) {
      console.error("Error updating profile:", err); // Mejor depuración
      if (err.response && err.response.status === 400) {
        const errorData = err.response.data;
        if (errorData.phone_number) {
          setError(`Phone Number: ${errorData.phone_number[0]}`);
        } else if (errorData.email) {
          setError(`Email: ${errorData.email[0]}`);
        } else {
          setError('Error updating profile. Please check your inputs.');
        }
      } else {
        setError('Unexpected error occurred. Please try again later.');
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setSuccessMessage('');
  
    const { currentPassword, newPassword, confirmPassword } = passwordData;
  
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
  
    try {
      await changePassword({ current_password: currentPassword, new_password: newPassword });
      setSuccessMessage('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      console.error("Error changing password:", err); // Registro del error específico
      setPasswordError(err.error || 'Error changing password.');
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
                      placeholder="John"
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
                      placeholder="Doe"
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
                    placeholder="john.doe@example.com"
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
                    placeholder="+1 (123) 456-7890"
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
                      placeholder="John"
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
                      placeholder="Doe"
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
                    placeholder="Doe Enterprises"
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
                    placeholder="123 Main St"
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
                      placeholder="USA"
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
                      placeholder="California"
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
                      placeholder="90001"
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
                      placeholder="billing@example.com"
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
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Save Changes
                </button>
              </form>
            </div>

            <h4 className="mb-4">Change Password</h4>
            <div className="card30 p-4">
              <form onSubmit={handlePasswordSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Current Password"
                    required
                  />
                </div>
                <div className="form-group row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="New Password"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm New Password"
                      required
                    />
                  </div>
                </div>
                {passwordError && <div className="text-danger mb-3">{passwordError}</div>}
                {successMessage && <div className="text-success mb-3">{successMessage}</div>}
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
