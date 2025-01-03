


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../css/UserModule.css';

const UserDashboard = () => {
  const companies = useSelector((state) => state.companies);
  const dispatch = useDispatch();
  const [communications, setCommunications] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [overrides, setOverrides] = useState({}); // To store overridden highlights
  
  const [newCommunication, setNewCommunication] = useState({
    type: '',
    date: '',
    notes: '',
  });

  useEffect(() => {
    // Sample communications data
    const sampleCommunications = [
      { companyId: 1, type: 'LinkedIn Post', date: '2024-12-20', notes: 'Initial contact' },
      { companyId: 2, type: 'Email', date: '2025-01-03', notes: 'Follow-up email' },
      { companyId: 3, type: "Phone Call", date: "2025-01-10", notes: "Discussed partnership" },
      { companyId: 4, type: "LinkedIn Message", date: "2025-01-25", notes: "Scheduling next meeting" },
      { companyId: 5, type: "Email", date: "2025-01-10", notes: "Reminder email" },
    ];
    setCommunications(sampleCommunications);
  }, []);

  const handleCompanySelection = (companyId) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId) ? prev.filter((id) => id !== companyId) : [...prev, companyId]
    );
  };

  const getHighlightColor = (companyId) => {
    if (overrides[companyId]) return ''; // Override removes highlighting

    const nextComm = communications.find((c) => c.companyId === companyId);
    if (!nextComm) return '';

    const today = new Date();
    const nextDate = new Date(nextComm.date);

    if (nextDate < today) return 'red';
    if (nextDate.toDateString() === today.toDateString()) return 'yellow';
    return null;
  };

  const handleOverrideHighlight = (companyId) => {
    setOverrides((prev) => ({
      ...prev,
      [companyId]: !prev[companyId], // Toggle override state
    }));
  };

  const handleAddCommunication = () => {
    if (!newCommunication.type || !newCommunication.date || !newCommunication.notes) {
      alert('Please fill out all fields.');
      return;
    }

  
    const updatedCommunications = communications.filter(
      (comm) => !selectedCompanies.includes(comm.companyId)
    );

    selectedCompanies.forEach((companyId) => {
      updatedCommunications.push({
        companyId,
        type: newCommunication.type,
        date: newCommunication.date,
        notes: newCommunication.notes,
      });
    });

    setCommunications(updatedCommunications);
    setSelectedCompanies([]);
    setNewCommunication({ type: '', date: '', notes: '' });
    setShowModal(false);
  };



  const renderCommunications = (companyId) => {
    return communications
      .filter((c) => c.companyId === companyId)
      .slice(0, 5)
      .map((comm, index) => (
        <tr key={index}>
          <td>{comm.type}</td>
          <td>{comm.date}</td>
          <td>{comm.notes}</td>
        </tr>
      ));
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <button onClick={() => setShowModal(true)}>Communication Performed</button>

      <div className="dashboard-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Company Name</th>
              <th>Last Five Communications</th>
              <th>Next Scheduled Communication</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className={getHighlightColor(company.id) }>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCompanies.includes(company.id)}
                    onChange={() => handleCompanySelection(company.id)}
                  />
                </td>
                <td>{company.name}</td>
                <td>
                  <table className="communications-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>{renderCommunications(company.id)}</tbody>
                  </table>
                </td>
                <td>
                  {getHighlightColor(company.id) === 'red' ? 'Overdue' 
                  :  getHighlightColor(company.id) === 'yellow'
                    ? 'Due Today'
                    : 'On Schedule'}
                </td>
                <td>
                  <button onClick={() => handleOverrideHighlight(company.id)}>
                    {overrides[company.id] ? 'Enable Highlight' : 'Disable Highlight'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Log Communication</h2>
            <label>
              Type of Communication:
              <select
                value={newCommunication.type}
                onChange={(e) => setNewCommunication({ ...newCommunication, type: e.target.value })}
              >
                <option value="">Select</option>
                <option value="LinkedIn Post">LinkedIn Post</option>
                <option value="Email">Email</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Date of Communication:
              <input
                type="date"
                value={newCommunication.date}
                onChange={(e) => setNewCommunication({ ...newCommunication, date: e.target.value })}
              />
            </label>
            <label>
              Notes:
              <textarea
                value={newCommunication.notes}
                onChange={(e) => setNewCommunication({ ...newCommunication, notes: e.target.value })}
              />
            </label>
            <button onClick={handleAddCommunication}>Submit</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
