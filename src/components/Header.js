import "../css/main_style.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';

import default_picture from "../assets/profile.png";
var API_URL = process.env.REACT_APP_API_URL;

// https://bulma.io/documentation/components/navbar/
export default function Header() {

  const [isActive, setActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShelter, setIsShelter] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };
  const [accountDetails, setAccountDetails] = useState(null);

  React.useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      setIsLoggedIn(false);
    } else {
      const fetchAccountDetails = async () => {
        try {
          var type = 'seeker';
          if (localStorage.getItem("isShelter") === 'true') {
            type = 'shelter';
          }
          console.log(localStorage.getItem("userId"));

          const response = await fetch(`${API_URL}account/${type}/${localStorage.getItem("userId")}/`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch account details');
          }
    
          const responseData = await response.json();
          const tempData = {
            "picture": responseData.picture,
          }
          setAccountDetails(tempData); // Update the state with fetched details
        } catch (error) {
          console.error('Error fetching account details:', error);
          console.log(`${API_URL}account/${type}/${localStorage.getItem('userId')}/`)
        }
      };
    
      fetchAccountDetails();
      setIsLoggedIn(true);
    }
    setIsShelter(localStorage.getItem('isShelter') === 'true');
    // return () => {
    //     console.log('MyComponent onUnmount');
    // };
}, []);

const navigate = useNavigate();

const handleLogout = () => {
  localStorage.setItem('accessToken', ''); 
  localStorage.setItem('isShelter', false);
  localStorage.setItem('userId', 0);
  setIsLoggedIn(false);
  navigate('/'); 
};

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          <div>PetPals</div>
        </Link>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-side"
          onClick={handleToggle}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar-side" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-search-bar">
          <p className="navbar-search-bar-input">
            <input
              className="input"
              type="text"
              placeholder="Search an animal"
            />
          </p>
          <p className="navbar-search-button">
            <Link to="/search">
              <button className="button is-secondary">Search</button>
            </Link>
          </p>
        </div>

        <div className="navbar-end">
          <div className={`navbar-item logged-in ${isLoggedIn ? "" : "hide"}`}>
            <div className="">
              <div className="navbar-item bell-div">
                <Link to="/notification_page">
                  <svg
                    className="bell"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                  >
                    {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                    <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-profile profile">
                <img
                  className="navbar-profile-image"
                  src={accountDetails ? accountDetails.picture : default_picture}
                  alt="profile pic"
                />
              </div>

              <div className="navbar-dropdown">
                <Link to="/seeker_dashboard_page" className={`navbar-item seeker ${isShelter ? "hide" : ""}`}>
                  Dashboard (seeker)
                </Link>

                <Link to="/shelter_dashboard" className={`navbar-item shelter ${isShelter ? "" : "hide"}`}>
                  Dashboard (shelter)
                </Link>

                <hr className="navbar-divider" />

                <Link
                  to="/update_seeker"
                  className={`navbar-item seeker ${isShelter ? "hide" : ""}`}
                >
                  Settings (seeker)
                </Link>

                <Link
                  to="/update_shelter"
                  className={`navbar-item shelter ${isShelter ? "" : "hide"}`}
                >
                  Settings (shelter)
                </Link>

                <Link to="/" className="navbar-item" onClick={handleLogout}>
                  Log Out
                </Link>
              </div>
            </div>
          </div>

          <div className={`navbar-item logged-out ${isLoggedIn ? "hide" : ""}`}>
            <div className="navbar-buttons">
              <Link to="/signup_before" className="button is-secondary">
                Sign up
              </Link>

              <Link to="/login" className="button is-secondary">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
