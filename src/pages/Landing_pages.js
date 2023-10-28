import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Image, Button, Grid } from "semantic-ui-react";
import "../pages/Landing_pages.css";
import Owener from "../assert/Owner.webp";
import Counsumar from "../assert/user_book.png";
import Login_Register from "../components/Login_Register";
import facebook from "../assert/facebook.svg";
import instagram from "../assert/instagram.svg";
import mail from "../assert/mail.svg";
import map_pin from "../assert/map-pin.svg";
import phone from "../assert/phone.svg";
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
          <Login_Register
            login_form_open={login_form_open}
            setLogin_form_open={setLogin_form_open}
            login_Type={login_type}
          />
        )}
        {/* <Button primary onClick={() => getForm_Type(false)}>
        Counsumer
      </Button>
      
      <Button primary onClick={() => getForm_Type(true)}>
        House woner
      </Button> */}
        <header>
          <div class="nav-wrapper">
            <div class="logo-container">
              <h2>Gust Booking</h2>
            </div>
            <nav>
              <input type="checkbox" id="menuToggle" />
              <label class="menu-btn" for="menuToggle">
                <div class="menu"></div>
                <div class="menu"></div>
                <div class="menu"></div>
              </label>
              <div class="nav-container">
                <ul class="nav-tabs">
                  <li
                    class="nav-tab"
                    onClick={() => (window.location.href = "#owners_about")}
                  >
                    Owner
                  </li>
                  <li
                    class="nav-tab"
                    onClick={() => (window.location.href = "#user_about")}
                  >
                    Counsumer
                  </li>

                  <li
                    class="nav-tab"
                    onClick={() => (window.location.href = "#review")}
                  >
                    Reviews
                  </li>
                  <li
                    class="nav-tab"
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
              Discover the perfect balance <br /> of hospitality, luxury and{" "}
              <br />
              comfort.
            </h2>
            <div className="index_btt_contian">
              <button class="landing_page_btn">As a Owner</button>
              <button class="landing_page_btn">As a Cunsumer</button>
            </div>
          </div>
          <div className="jumbotron-right"></div>
        </div>
        <div className="about_owner" id="owners_about">
          <div className="about_content">
            <div className="about_owner_head">
              <h1>About Admin </h1>
            </div>
            <div className="about_owner_content">
              <h3>hsgdjadkyusdmf.sdnf;;skgfisuff xooriwegc gqiwge rcgwjk</h3>
            </div>
            <Button id="nav_bttn" onClick={() => getForm_Type(true)}>
              <p id="log_reg_bttn">login/signup</p>
            </Button>
          </div>
          <div className="owner_img">
            <img src={Owener}></img>
          </div>
        </div>
        <div className="about_owner" id="user_about">
          <div className="about_content">
            <div className="about_owner_head">
              <h1>About Admin </h1>
            </div>
            <div className="about_owner_content">
              <h3>hsgdjadkyusdmf.sdnf;;skgfisuff xooriwegc gqiwge rcgwjk</h3>
            </div>
            <Button id="nav_bttn" onClick={() => getForm_Type(true)}>
              <p id="log_reg_bttn">login/signup</p>
            </Button>
          </div>
          <div className="owner_img">
            <img src={Counsumar}></img>
          </div>
        </div>
        <div class="review-container" id="reivew">
          <div class="review-header">
            <h2 class="review-title">Counsumer Reviews</h2>
            <hr class="horizontal" />
            <p class="">
              We are very proud of the services we offer to our customers.
              <br />
              Read every word from our happy customers.
            </p>
          </div>
          <div class="cards-container">
            <div class="card">
              <img src={Counsumar} alt="" class="card-avi" />
              <h2 class="card-title">Mark Essien</h2>
              <h3 class="card-subtitle">Lagos, Nigeria.</h3>
              <p class="card-desc">
                Words can't explain the kind of treatment I received from the
                management of star hotels. They are the best in the country.
              </p>
            </div>
            <div class="card">
              <img src={Owener} alt="" class="card-avi" />
              <h2 class="card-title">Seyi Onifade</h2>
              <h3 class="card-subtitle">Lagos, Nigeria.</h3>
              <p class="card-desc">
                Star hotels makes you feel the best room quality that makes you
                feel the comfort of a home.
              </p>
            </div>
            <div class="card">
              <img src={Owener} alt="" class="card-avi" />
              <h2 class="card-title">Fayemi David</h2>
              <h3 class="card-subtitle">Lagos, Nigeria.</h3>
              <p class="card-desc">
                My Family and I are very happy when we lodge into star hotels.
                They are by far the best in the universe.
              </p>
            </div>
          </div>
        </div>
        <footer class="footer" id="contact">
          <div class="footer-container">
            <nav class="footer-nav">
              <div class="footer-description">
                <h3 class="footer-description-title">Star Hotels</h3>
                <p>Hospitality and Comfort are our watchwords</p>
              </div>
              <div class="footer-contact-us">
                <h3 class="footer-description-title">Contact Us</h3>
                <p class="footer-description-detail">
                  <img
                    src={map_pin}
                    class="footer-description-icon"
                    alt="star hotel location"
                  />

                  <span>23, Fola Osibo, Lekki Phase 1</span>
                </p>
                <p class="footer-description-detail">
                  <img
                    src={phone}
                    class="footer-description-icon"
                    alt="star hotels phone number"
                  />
                  <span>91+ 9677978279</span>
                </p>
                <p class="footer-description-detail">
                  <img
                    src={mail}
                    class="footer-description-icon"
                    alt="star hotels email"
                  />
                  <span>seenivasan90it@gmail.com</span>{" "}
                </p>
              </div>
              <div class="footer-follow-us">
                <h3 class="footer-description-title">Follow Us</h3>
                <ul class="footer-follow-us-lists">
                  <li class="follow-us-list">
                    <a href="">
                      <img src={facebook} alt="star hotels facebook page" />
                    </a>
                  </li>
                  <li class="follow-us-list">
                    <a href="">
                      <img src={twitter} alt="star hotels twitter page" />
                    </a>
                  </li>
                  <li class="follow-us-list">
                    <a href="">
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
