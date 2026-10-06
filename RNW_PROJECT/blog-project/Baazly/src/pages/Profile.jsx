import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        street: user.address?.street || (typeof user.address === "string" ? user.address : ""),
        city: user.address?.city || "",
        state: user.address?.state || "",
        pincode: user.address?.pincode || ""
      });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: {
          street: formData.street.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim()
        }
      };

      await updateProfile(payload);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Profile save error:", err);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleLogout() {
    logout();
    toast.info("You have logged out.");
    navigate("/login");
  }

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <>
      <section className="page-top">
        <p className="small-title">Account Center</p>
        <h1>My Profile</h1>
      </section>

      <section className="form-section">
        <div className="product-form profile-form-container">
          <div className="profile-header-banner">
            <div className="profile-user-left">
              <div className="profile-avatar-circle">{initial}</div>
              <div>
                <h2 className="profile-name-title">{user.name}</h2>
                <p className="muted profile-meta-text">
                  <i className="fa-regular fa-envelope"></i> {user.email} &bull;{" "}
                  <span className="profile-role-badge">
                    {user.role || "Customer"}
                  </span>
                </p>
              </div>
            </div>

            <div>
              {!isEditing ? (
                <button
                  type="button"
                  className="btn profile-action-btn"
                  onClick={() => setIsEditing(true)}
                >
                  <i className="fa-solid fa-pen-to-square"></i> Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  className="btn light-btn profile-action-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="form-row">
              <div>
                <label htmlFor="profName">Full Name</label>
                <input
                  type="text"
                  id="profName"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={!isEditing ? "input-readonly" : ""}
                  required
                />
              </div>

              <div>
                <label htmlFor="profEmail">Email (Read Only)</label>
                <input
                  type="email"
                  id="profEmail"
                  value={user.email}
                  readOnly
                  className="input-disabled"
                />
              </div>
            </div>

            <div className="form-row">
              <div>
                <label htmlFor="profPhone">Contact Phone Number</label>
                <input
                  type="tel"
                  id="profPhone"
                  name="phone"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={!isEditing ? "input-readonly" : ""}
                />
              </div>

              <div>
                <label htmlFor="profStreet">Street Address</label>
                <input
                  type="text"
                  id="profStreet"
                  name="street"
                  placeholder="House / Flat / Street"
                  value={formData.street}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={!isEditing ? "input-readonly" : ""}
                />
              </div>
            </div>

            <div className="form-row form-row-3">
              <div>
                <label htmlFor="profCity">City</label>
                <input
                  type="text"
                  id="profCity"
                  name="city"
                  placeholder="City / Town"
                  value={formData.city}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={!isEditing ? "input-readonly" : ""}
                />
              </div>

              <div>
                <label htmlFor="profState">State</label>
                <input
                  type="text"
                  id="profState"
                  name="state"
                  placeholder="State / Region"
                  value={formData.state}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={!isEditing ? "input-readonly" : ""}
                />
              </div>

              <div>
                <label htmlFor="profPincode">PIN Code</label>
                <input
                  type="text"
                  id="profPincode"
                  name="pincode"
                  placeholder="6 digit PIN code"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={!isEditing ? "input-readonly" : ""}
                />
              </div>
            </div>

            {isEditing && (
              <div className="profile-edit-actions">
                <button type="submit" className="btn" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-floppy-disk"></i> Save Changes
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn light-btn"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>

          <div className="profile-footer-links">
            <div className="profile-footer-nav">
              {user.role === "admin" && (
                <Link to="/add-product" className="btn btn-admin-accent">
                  <i className="fa-solid fa-plus"></i> Add Product
                </Link>
              )}
              <Link to="/orders" className="btn profile-nav-btn">
                <i className="fa-solid fa-box-open"></i>{" "}
                {user.role === "admin" ? "Customer Orders" : "My Orders"}
              </Link>
              <Link to="/shop" className="btn light-btn profile-nav-btn">
                <i className="fa-solid fa-store"></i> Continue Shopping
              </Link>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="btn danger-btn profile-nav-btn"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Sign Out
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
