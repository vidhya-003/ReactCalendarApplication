import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage.css'; // Add styles for homepage

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="navbar">
        <h1>ENTNT</h1>
        <h1>Calendar Communication Tracker</h1>
        <nav>
          <Link to="/admin">Admin Module</Link>
          <Link to="/user">User Module</Link>
        </nav>
      </header>
      <main>
        <section className="intro">
          
          <h2>Welcome to the Communication Tracker</h2>
          <p>
            Manage your company's communication tasks and schedules effectively.
          </p>
        </section>
        <section className="modules">
          <div className="module-card">
            <h3>Admin Module</h3>
            <p>Manage companies, communication methods, and overall tasks.</p>
            <Link to="/admin" className="btn">Go to Admin Module</Link>
          </div>
          <div className="module-card">
            <h3>User Module</h3>
            <p>Track your tasks, manage notifications, and communicate efficiently.</p>
            <Link to="/user" className="btn">Go to User Module</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
