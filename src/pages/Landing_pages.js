import React from "react";
import { useState } from "react";
import {  Button} from "semantic-ui-react";
import "../pages/Landing_pages.css";
import Owener from "../assert/admins.png";
import Login_Register from "../components/Login_Register";
import facebook from "../assert/facebook.svg";
import instagram from "../assert/instagram.svg";
import mail from "../assert/mail.svg";
import map_pin from "../assert/map-pin.svg";
import user1 from "../assert/user1.jpg"
import user2 from "../assert/user2.avif"
import user3 from "../assert/user3.jpg"
import phone from "../assert/phone.svg";
import hotel from "../assert/hotel.png";
import twitter from "../assert/twitter.svg";
const Landing_pages = () => {
  const [login_form_open, setLogin_form_open] = useState(false); //login form model
  const [login_type, setLogin_type] = useState(false); //SET LOGIN TYPE
  const getForm_Type = (type) => {
    setLogin_form_open(true);
    setLogin_type(type);
  };
  return (
    <>
      <div>
        {login_form_open && (
          // eslint-disable-next-line react/jsx-pascal-case
          <Login_Register
            login_form_open={login_form_open}
            setLogin_form_open={setLogin_form_open}
            login_Type={login_type}
          />
        )}
        <header>
          <div className="nav-wrapper">
            <div className="logo-container">
              <h2>Guest Booking</h2>
            </div>
            <nav>
              <label className="menu-btn" htmlFor="menuToggle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-list"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </label>
              <input type="checkbox" id="menuToggle" hidden />
              <div className="nav-container">
                <ul className="nav-tabs">
                  <li
                    className="nav-tab"
                    onClick={() => (window.location.href = "#owners_about")}
                  >
                    Owner
                  </li>
                  <li
                    className="nav-tab"
                    onClick={() => (window.location.href = "#user_about")}
                  >
                    Guest
                  </li>

                  <li
                    className="nav-tab"
                    onClick={() => (window.location.href = "#review")}
                  >
                    Reviews
                  </li>
                  <li
                    className="nav-tab"
                    onClick={() => (window.location.href = "#contact")}
                  >
                    Contact
                  </li>

                  <Button id="nav_bttn" onClick={() => getForm_Type(false)}>
                    <p id="log_reg_bttn">login/signup</p>
                  </Button>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <div className="jumbotron-container">
          <div className="jumbotron-left">
            <h2 className="jumbotron-header">
            Book Your Perfect Stay Today <br /> – Where Comfort Meets {" "}
              <br />
              Convenience!
            </h2>
            <div className="index_btt_contian">
              <button className="landing_page_btn" onClick={() => (window.location.href = "#owners_about")}>As a Owner</button>
              <button className="landing_page_btn" onClick={() => (window.location.href = "#user_about")}>As a Guest</button>
            </div>
          </div>
          <div className="jumbotron-right"></div>
        </div>
        <div className="about_owner" id="owners_about">
          <div className="about_content">
            <div className="about_owner_head">
              <h1>About House Owner </h1>
            </div>
            <div className="about_owner_content">
              <p>As an administrator on our platform, you have the power to manage every aspect of your property listings. This includes creating, editing, and deleting rooms, setting the minimum and maximum booking durations, and defining the daily rental rates. You can also enhance your property's appeal by uploading photos, providing potential guests with a comprehensive view of the accommodations, ensuring a seamless and attractive booking experience. Additionally, our platform allows for user registration through email addresses and mobile numbers, streamlining the sign-up process for all your users.
</p>
            </div>
            <Button id="nav_bttn" onClick={() => getForm_Type(true)}>
              <p id="log_reg_bttn">Join now</p>
            </Button>
          </div>
          <div className="owner_img">
            <img src={Owener} alt="img"></img>
          </div>
        </div>
        <div className="about_owner" id="user_about">
          <div className="about_content">
            <div className="about_owner_head">
              <h1>About Guest </h1>
            </div>
            <div className="about_owner_content">
              <p>Users on our website enjoy a seamless experience, with the option to register using either their email address or mobile number. Once registered, a world of possibilities unfolds as they can effortlessly browse and explore all available rooms for booking. Detailed room information and photos provide a comprehensive view, while a quick check on room availability ensures convenience. Users can easily choose their desired dates and make reservations, all at their fingertips. Your perfect stay is just a registration away.</p>
            </div>
            <Button id="nav_bttn" onClick={() => getForm_Type(false)}>
              <p id="log_reg_bttn">Explore now</p>
            </Button>
          </div>
          <div className="owner_img">
            <img src={hotel} alt=""></img>
          </div>
        </div>
        <div className="review-container" id="review">
          <div className="review-header">
            <h2 className="review-title">Our User Reviews</h2>
            <hr className="horizontal" />
            <p className="">
              We are very proud of the services we offer to our customers.
              <br />
              Read every word from our happy customers.
            </p>
          </div>
          <div className="cards-container">
            <div className="card">
              <img src={user1} alt="user1" className="card-avi" />
              <h2 className="card-title">Ganesh</h2>
              <h3 className="card-subtitle">Chennai, Tamil Nadu.</h3>
              <p className="card-desc">
              Booking through this site was a breeze! The selection of accommodations is impressive, and the booking process is seamless. Can't wait for my next stay
              </p>
            </div>
            <div className="card">
              <img src={user3} alt="user3" className="card-avi" />
              <h2 className="card-title">Heshma</h2>
              <h3 className="card-subtitle">Salem, Tamil Nadu.</h3>
              <p className="card-desc">
              I love how I can see all the details and photos of the rooms before booking. It takes the guesswork out of finding the perfect place to stay
              </p>
            </div>
            <div className="card">
              <img src={user2} alt="user3" className="card-avi" />
              <h2 className="card-title">Tony</h2>
              <h3 className="card-subtitle">Ooty, Tamil Nadu.</h3>
              <p className="card-desc">
              The availability calendar is a game-changer. It saved me so much time in planning my trip, and I was able to secure the dates I wanted with ease. Highly recommended!
              </p>
            </div>
          </div>
        </div>
        <footer className="footer" id="contact">
          <div className="footer-container">
            <nav className="footer-nav">
              <div className="footer-description">
                <h3 className="footer-description-title">Guest Booking Site</h3>
                <p>Hospitality and Comfort are our watchwords</p>
              </div>
              <div className="footer-contact-us">
                <h3 className="footer-description-title">Contact Us</h3>
                <p className="footer-description-detail">
                  <img
                    src={map_pin}
                    className="footer-description-icon"
                    alt="star hotel location"
                  />

                  <span>sriram</span>
                </p>
                <p className="footer-description-detail">
                  <img
                    src={phone}
                    className="footer-description-icon"
                    alt="star hotels phone number"
                  />
                  <span>91+ 9677978279</span>
                </p>
                <p className="footer-description-detail">
                  <img
                    src={mail}
                    className="footer-description-icon"
                    alt="star hotels email"
                  />
                  <span>seenivasan90it@gmail.com</span>{" "}
                </p>
              </div>
              <div className="footer-follow-us">
                <h3 className="footer-description-title">Follow Us</h3>
                <ul className="footer-follow-us-lists">
                  <li className="follow-us-list">
                    <a href="https://www.instagram.com/__seenivasan___/">
                      <img src={facebook} alt="star hotels facebook page" />
                    </a>
                  </li>
                  <li className="follow-us-list">
                    <a href="https://www.instagram.com/__seenivasan___/">
                      <img src={twitter} alt="star hotels twitter page" />
                    </a>
                  </li>
                  <li className="follow-us-list">
                    <a href="https://www.instagram.com/__seenivasan___/">
                      <img src={instagram} alt="star hotels instagram page" />
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Landing_pages;
