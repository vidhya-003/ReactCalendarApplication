import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CommunicationMethodManagement = () => {
  // Default communication methods
  const [methods, setMethods] = useState([
    { id: 1, name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
    { id: 2, name: 'LinkedIn Message', description: 'Message on LinkedIn', sequence: 2, mandatory: false },
    { id: 3, name: 'Email', description: 'Send an email', sequence: 3, mandatory: true },
    { id: 4, name: 'Phone Call', description: 'Call the company', sequence: 4, mandatory: false },
    { id: 5, name: 'Other', description: 'Any other method', sequence: 5, mandatory: false },
  ]);

  const [newMethod, setNewMethod] = useState({
    name: '',
    description: '',
    sequence: methods.length + 1,  // Default to next sequence
    mandatory: false,
  });

  const [showAddMethodModal, setShowAddMethodModal] = useState(false);

  // Handle input change for form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMethod({
      ...newMethod,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Add a new communication method
  const handleAddMethod = () => {
    setMethods([...methods, { ...newMethod, id: Date.now() }]);
    setShowAddMethodModal(false); // Close the modal
    setNewMethod({
      name: '',
      description: '',
      sequence: methods.length + 1,  // Set next sequence value
      mandatory: false,
    });
  };

  // Handle delete communication method
  const handleDeleteMethod = (id) => {
    setMethods(methods.filter((method) => method.id !== id));
  };

  // Handle edit communication method (not implemented in detail)
  const handleEditMethod = (id) => {
    const method = methods.find((method) => method.id === id);
    setNewMethod(method);  // Pre-fill form with current data
    setShowAddMethodModal(true); // Open modal for editing
  };

  return (
    <div>
      <h1>Communication Method Management</h1>

      <button onClick={() => setShowAddMethodModal(true)}>Add Communication Method</button>

      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Sequence</th>
            <th>Mandatory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {methods.map((method) => (
            <tr key={method.id}>
              <td>{method.name}</td>
              <td>{method.description}</td>
              <td>{method.sequence}</td>
              <td>{method.mandatory ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEditMethod(method.id)}><EditIcon/></button>
                <button onClick={() => handleDeleteMethod(method.id)}><DeleteIcon/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Communication Method Modal */}
      {showAddMethodModal && (
        <div className="modal">
          <h2>{newMethod.id ? 'Edit' : 'Add'} Communication Method</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newMethod.name}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={newMethod.description}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Sequence:
              <input
                type="number"
                name="sequence"
                value={newMethod.sequence}
                onChange={handleInputChange}
                min="1"
              />
            </label>
            <br />
            <label>
              Mandatory:
              <input
                type="checkbox"
                name="mandatory"
                checked={newMethod.mandatory}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="button" onClick={handleAddMethod}>
              {newMethod.id ? 'Save Changes' : 'Add Method'}
            </button>
            <button type="button" onClick={() => setShowAddMethodModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommunicationMethodManagement;
