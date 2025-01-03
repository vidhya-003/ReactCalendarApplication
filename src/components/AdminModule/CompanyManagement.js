// src/components/Admin/CompanyManagement.jsx
import React, { useState } from "react";
import { connect } from "react-redux";
import { addCompany, editCompany, deleteCompany } from "../../redux/Actions/CompanyActions";

const CompanyManagement = ({ companies, addCompany, editCompany, deleteCompany }) => {
  const [company, setCompany] = useState({
    name: "",
    location: "",
    linkedIn: "",
    emails: "",
    phones: "",
    comments: "",
    periodicity: "",
  });

  const handleSubmit = () => {
    if (company.name) {
      addCompany(company);
      setCompany({
        name: "",
        location: "",
        linkedIn: "",
        emails: "",
        phones: "",
        comments: "",
        periodicity: "",
      });
    }
  };

  const handleEdit = (id) => {
    const updatedCompany = { ...company, id };
    editCompany(updatedCompany);
  };

  const handleDelete = (id) => {
    deleteCompany(id);
  };

  return (
    <div>
      <h1>Company Management</h1>
      <input
        type="text"
        placeholder="Company Name"
        value={company.name}
        onChange={(e) => setCompany({ ...company, name: e.target.value })}
      />
      <button onClick={handleSubmit}>Add Company</button>

      <ul>
        {companies.map((c) => (
          <li key={c.id}>
            {c.name} - {c.location}
            <button onClick={() => handleEdit(c.id)}>Edit</button>
            <button onClick={() => handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  companies: state.company.companies,
});

const mapDispatchToProps = {
  addCompany,
  editCompany,
  deleteCompany,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyManagement);
