import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserModule = () => {
  const companies = useSelector((state) => state.companies);
  const [activeLink, setActiveLink] = useState('dashboard');
  const [overdueCount, setOverdueCount] = useState(0);
  const [dueTodayCount, setDueTodayCount] = useState(0);
  const [communications, setCommunications] = useState([]);


  useEffect(() => {
    const sampleCommunications = [
      { companyId: 1, type: 'Email', date: '2024-12-25' },
      { companyId: 2, type: 'LinkedIn Post', date: '2025-01-02' },
    ];
    setCommunications(sampleCommunications);
  }, []);

  useEffect(() => {
    const today = new Date();
    let overdue = 0;
    let dueToday = 0;

    companies.forEach((company) => {
      const nextComm = communications.find((c) => c.companyId === company.id);
      if (nextComm) {
        const commDate = new Date(nextComm.date);
        if (commDate < today) overdue++;
        if (commDate.toDateString() === today.toDateString()) dueToday++;
      }
    });

    setOverdueCount(overdue);
    setDueTodayCount(dueToday);
  }, [companies, communications]);


  // Function to handle link click and set active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>

      {/* Navigation Links */}
      <nav className="user-nav">
        <Link
          to="/user/dashboard"
          className={activeLink === 'dashboard' ? 'active' : ''}
          onClick={() => handleLinkClick('dashboard')}
        >
          Dashboard
        </Link>
        <Link
          to="/user/calendar"
          className={activeLink === 'calendar' ? 'active' : ''}
          onClick={() => handleLinkClick('calendar')}
        >
          Calendar
        </Link>
        <Link
          to="/user/notifications"
          className={activeLink === 'notifications' ? 'active' : ''}
          onClick={() => handleLinkClick('notifications')}
        >
          Notifications<span className="badge">{overdueCount + dueTodayCount}</span>
        </Link>
      </nav>

     <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Location</th>
            <th>Communication Period</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.location}</td>
              <td>{company.periodicity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserModule;