import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/User.css';
import { useTheme } from '../context/ThemeContext';
import { fetchUserProfile, updateUserProfile, changePassword } from '../services/api';

const SettingsPage = () => {
  const { theme } = useTheme();
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

        // Verificar si hay datos válidos
        if (data) {
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
        } else {
          setError('User profile is empty or invalid.');
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        setError('Error loading profile. Please try again later.');
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
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      console.error("Error updating profile:", err);
      setError('Error updating profile. Please check your inputs.');
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
      console.error("Error changing password:", err);
      setPasswordError('Error changing password. Please try again later.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`user-page-container p-4`} data-theme={theme}>
      <div id ="containerdark" className="row justify-content-center">
        <div id ="containerdark1" className="col-lg-9 ">
          <div  className="settings-container shadow-lg p-5 mb-5 bg-white rounded">
            <h2 className="text-primary text-center mb-4">Account Settings</h2>
            <div id ="containerdark2" className="card card-body border-0 p-4 mb-5 shadow-sm">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="first_name" className="form-label">First Name</label>
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
                    <label htmlFor="last_name" className="form-label">Last Name</label>
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
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
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
                <button type="submit" className="btn btn-primary w-100">
                  Save Changes
                </button>
              </form>
            </div>
            <h2 className="text-primary text-center mb-4">Change Password</h2>
            <div className="card card-body border-0 p-4 shadow-sm">
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">Current Password</label>
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
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
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
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
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
                <button type="submit" className="btn btn-primary w-100">
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
