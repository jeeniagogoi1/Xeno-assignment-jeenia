import React, { useState, useContext } from 'react';
import '../styles/Audience.css';
import AuthContext from '../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

const Audience = () => {
  const { user } = useContext(AuthContext);
  const [criteria, setCriteria] = useState({});
  const [audienceSize, setAudienceSize] = useState(null);
  const { setUser } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  const handleCriteriaChange = (event) => {
    const { name, value } = event.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const checkAudienceSize = async () => {
    try {
      const res = await fetch('http://localhost:4000/audience/size', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(criteria),
      });
      const result = await res.json();
      setAudienceSize(result.size);
    } catch (err) {
      console.error(err);
    }
  };

  const createAudience = async () => {
    try {
      await fetch('http://localhost:4000/audience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(criteria),
      });
      alert('Audience created successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <>
      <nav className="dash-navbar">
        <h1 className="logo"><RouterLink to="/" id="logo-link"><a>Mini CRM</a></RouterLink></h1>
        <div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="audience">
      <h2>Create Audience</h2>
      <form className="audience-form">
        <label>
          Total Spends:
          <input type="number" name="totalSpends" onChange={handleCriteriaChange} />
        </label>
        <label>
          Max Visits:
          <input type="number" name="maxVisits" onChange={handleCriteriaChange} />
        </label>
        <label>
          Last Visit Before:
          <input type="date" name="lastVisit" onChange={handleCriteriaChange} />
        </label>
        <button type="button" onClick={checkAudienceSize}>Check Audience Size</button>
        {audienceSize !== null && <p>Audience Size: {audienceSize}</p>}
        <button type="button" onClick={createAudience}>Create Audience</button>
      </form>
    </div>
    </>
  );
};

export default Audience;
