import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../css/Notifications.css';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Importing notification icon
import { Badge } from '@mui/material'; // Importing Badge component for showing count

const Notifications = () => {
  const companies = useSelector((state) => state.companies);
  const [communications, setCommunications] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [dueToday, setDueToday] = useState([]);

  useEffect(() => {
    // Sample communication data for demo
    const sampleCommunications = [
      { companyId: 1, type: 'Email', date: '2024-12-25', notes: 'Follow-up' },
      { companyId: 2, type: 'LinkedIn Post', date: '2025-01-02', notes: 'New connection' },
    ];
    setCommunications(sampleCommunications);
  }, []);

  useEffect(() => {
    const today = new Date();
    const overdueList = [];
    const dueTodayList = [];

    companies.forEach((company) => {
      const nextComm = communications.find((c) => c.companyId === company.id);
      if (nextComm) {
        const commDate = new Date(nextComm.date);
        if (commDate < today) overdueList.push({ ...company, nextComm });
        if (commDate.toDateString() === today.toDateString()) dueTodayList.push({ ...company, nextComm });
      }
    });

    setOverdue(overdueList);
    setDueToday(dueTodayList);
  }, [companies, communications]);

  // Calculate the total count of overdue and due communications
  const notificationCount = overdue.length + dueToday.length;

  return (
    <div>
      <h1>Notifications</h1>

      {/* Notification Icon with Badge */}
      <div className="notification-icon">
        <Badge badgeContent={notificationCount} color="error">
          <NotificationsIcon fontSize="large" />
        </Badge>
      </div>

      <div className="notifications-section">
        <h2>Overdue Communications</h2>
        {overdue.length > 0 ? (
          <table className="notifications-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {overdue.map(({ id, name, nextComm }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{nextComm.type}</td>
                  <td>{nextComm.date}</td>
                  <td>{nextComm.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No overdue communications.</p>
        )}
      </div>

      <div className="notifications-section">
        <h2>Today’s Communications</h2>
        {dueToday.length > 0 ? (
          <table className="notifications-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {dueToday.map(({ id, name, nextComm }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{nextComm.type}</td>
                  <td>{nextComm.date}</td>
                  <td>{nextComm.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No communications due today.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
