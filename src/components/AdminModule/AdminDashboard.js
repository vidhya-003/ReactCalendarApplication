import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/AdminDashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany, deleteCompany, updateCompany } from '../../redux/companySlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminDashboard = () => {
  const companies = useSelector((state) => state.companies);
  
  const dispatch = useDispatch();
  const [companyIdCounter, setCompanyIdCounter] = useState(1);
  
  const [newCompany, setNewCompany] = useState({
    id: companyIdCounter,
    name: '',
    location: '',
    periodicity: '',
    linkedin: '',
    phoneNumber: '',
    comments: '',
    email: '',
  });
  
  const [showForm, setShowForm] = useState(false); // Controls the visibility of the form
  const [showExtraFields, setShowExtraFields] = useState(false); // To control visibility of extra fields
  const [editingCompany, setEditingCompany] = useState(null); // To track the company being edited
  
  // Handle form submission to add or edit a company
  const handleSubmit = () => {
    if (!newCompany.name || !newCompany.location || !newCompany.periodicity) {
      alert('Please fill out all required fields.');
      return;
    }

    if (editingCompany) {
      // If we're editing, dispatch updateCompany action
      dispatch(
        updateCompany({
          id: editingCompany.id,
          name: newCompany.name,
          location: newCompany.location,
          periodicity: newCompany.periodicity,
          linkedin: newCompany.linkedin,
          phoneNumber: newCompany.phoneNumber,
          comments: newCompany.comments,
          email: newCompany.email,
        })
      );
    } else {
      // If we're adding a new company, dispatch addCompany action
      dispatch(
        addCompany({
          id: companyIdCounter, // Unique ID
          name: newCompany.name,
          location: newCompany.location,
          periodicity: newCompany.periodicity,
          linkedin: newCompany.linkedin,
          phoneNumber: newCompany.phoneNumber,
          comments: newCompany.comments,
          email: newCompany.email,
        })
      );
      setCompanyIdCounter(companyIdCounter + 1); // Increment the company ID counter for the next company
    }
    
    setShowForm(false); // Hide the form after submission
    setNewCompany({
      id: Date.now(),
      name: '',
      location: '',
      periodicity: '',
      linkedin: '',
      phoneNumber: '',
      comments: '',
      email: '',
    });
    setEditingCompany(null); // Reset the editing company state
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setNewCompany({ ...company }); // Pre-fill form fields with the company data
    setShowForm(true); // Show the form for editing
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Navigation Links */}
      <section className="Admin-link">
        <div>
          <Link to="/admin" className="link">Company Management</Link>
        </div>
        <div>
          <Link to="/admin/communication-methods" className="link">Communication Methods</Link>
        </div>
      </section>

      {/* Button to Toggle Form */}
      <button onClick={() => setShowForm(!showForm)} className="add-company-btn">
        {showForm ? 'Cancel' : editingCompany ? 'Edit Company' : 'Add Company'}
      </button>

      {/* Company Form - Visible only when showForm is true */}
      {showForm && (
        <div className="company-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Company Name"
              value={newCompany.name}
              onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              value={newCompany.location}
              onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Communication Period"
              value={newCompany.periodicity}
              onChange={(e) => setNewCompany({ ...newCompany, periodicity: e.target.value })}
              className="form-input"
            />
          </div>

          {/* Toggle button to show/hide extra fields */}
          <button onClick={() => setShowExtraFields(!showExtraFields)} className="toggle-btn">
            {showExtraFields ? 'Hide Additional Fields' : 'Show Additional Fields'}
          </button>

          {/* Extra Fields - Hidden initially */}
          {showExtraFields && (
            <div className="extra-fields">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="LinkedIn Profile"
                  value={newCompany.linkedin}
                  onChange={(e) => setNewCompany({ ...newCompany, linkedin: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={newCompany.phoneNumber}
                  onChange={(e) => setNewCompany({ ...newCompany, phoneNumber: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Comments"
                  value={newCompany.comments}
                  onChange={(e) => setNewCompany({ ...newCompany, comments: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Email"
                  value={newCompany.email}
                  onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
          )}

          <button onClick={handleSubmit} className="submit-btn">
            {editingCompany ? 'Update Company' : 'Add Company'}
          </button>
        </div>
      )}

      {/* Displaying companies in a table */}
      {Array.isArray(companies) && companies.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Location</th>
              <th>Communication Period</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.location}</td>
                <td>{company.periodicity}</td>
                <td>
                  <button onClick={() => handleEdit(company)}><EditIcon /></button>
                  <button onClick={() => dispatch(deleteCompany(company.id))}><DeleteIcon /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No companies available</p>
      )}
    </div>
  );
};

export default AdminDashboard;
