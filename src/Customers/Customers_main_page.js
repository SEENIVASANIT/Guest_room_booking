/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable array-callback-return */
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Icon,Grid } from "semantic-ui-react";
import "../Customers/Customers_main_page.css";
import nodata from "../assert/nodata.avif";
import Image_view_model from "../components/Image_view_model";
import { db } from "../firebase";

import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Customers_booking_rooms from "../components/Customers_booking_rooms";
const Customers_main_page = () => {
  const location = useLocation(); //GET ALL DATA
  const navigate = useNavigate(); //navigate to VIEW ROOMS
  const get_email = location.state?.Send_email; //GET DATA FROM LOGIN PAGE
  location.state?.Send_email==null?window.location.replace("/"):<></>
  const [users, setUsers] = useState([]); //SET DATA
  const [house, setHouse] = useState([]); //SET DATA
  ////SET DATA FOR LOGIN USER
  const [single_user_name, setSingle_user_name] = useState("");
  const [single_user_email, setSingle_user_email] = useState("");
  const [single_user_mobile, setSingle_user_mobile] = useState("");
  const [single_user_id, setSingle_user_id] = useState("");
  const [load_one_time, setLoad_one_time] = useState(true);
  /////////////////////////////////////////////////
  const [image_view, setImage_view] = useState(false);
  const [imageUrl, setImageUrl] = useState(false);

  ////OPEN CUSTOMER BOOKING DATA
  const [Customers_booking_open, setCustomers_booking_open] = useState(false);
  const usersCollectionRef = collection(db, "register_login");
  const HouseCollectionRef = query(
    collection(db, "Houses"),
    orderBy("house_name")
  ); //FIREBASE COLLECTION TO GET ALL DATA
  useEffect(() => {
    getUsers();
    getHouse();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //setdata
  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(
      data.docs.map((doc) => ({
        //OFTER CHECKING SET THA ALL DATA.
        ...doc.data(),
        id: doc.id,
      }))
    );
  };
  //SET ALL HOUSE FOR USER
  const getHouse = async () => {
    const data = await getDocs(HouseCollectionRef);
    setHouse(
      data.docs.map((doc) => ({
        //OFTER CHECKING SET THA ALL DATA.
        ...doc.data(),
        id: doc.id,
      }))
    );
  };
  ////Search function
  const Search_fun = async (e, searc) => {
    ///THIS IS A SEARCH VALUE FUNCTION
    e.preventDefault();
    if (searc == "") {
      getHouse();
    }
    setHouse(
      house.filter(
        (bolg) =>
          bolg.house_city.toLowerCase().includes(searc.toLowerCase()) ||
          bolg.house_address.toLowerCase().includes(searc.toLowerCase())
      )
    );
  };
  ///////set image view
  const OpenImageView = (img) => {
    setImageUrl(img);
    setImage_view(true);
  };
  return (
    <>
      {load_one_time &&
        users.map((item) => {
          if (item.email === get_email) {
            setSingle_user_email(item.email);
            setSingle_user_name(item.name);
            setSingle_user_mobile(item.mobile);
            setSingle_user_id(item.id);
            setLoad_one_time(false);
          }
        })}
      {Customers_booking_open && (
        <Customers_booking_rooms
          Customers_booking_open={setCustomers_booking_open}
          customers_id={single_user_id}
        />
      )}
      <header>
        <div className="nav-wrapper">
          <div className="logo-container">
            <h2>Gust Booking</h2>
          </div>
          <nav>
          <label className="menu-btn" htmlFor="menuToggle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-list"
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
                  onClick={() => setCustomers_booking_open(true)}
                >
                  My Bookings
                </li>
                <li
                  className="nav-tab"
                  onClick={() => navigate("/")}
                >
                  Logout
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="nav_underline"></div>
      </header>
      <div>
        {image_view && (
          <Image_view_model setImageview={setImage_view} image={imageUrl} />
        )}
        <div className="search_container">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
              <div className="input-group">
                <input
                  className="form-controls"
                  placeholder="Search by city or address"
                  type="text"
                  onChange={(e) => {
                    Search_fun(e, e.target.value);
                  }}
                />
                <div className="input-group-btn">
                  <button type="button" id="searchbtn">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="user_bro_title">
        <h2>
          <Icon name="home"></Icon>Find Accomodations
        </h2>
      </div>
      <Grid columns="equal" id="Distric" divided>
        <div className="display_all_home_for_user">
          {house.map((list) => {
            return (
              <div className="Home_card_for_user House_owner_card_contain">
                <img
                  className="hous-profile-img"
                  src={list.img}
                  alt="House img"
                  onClick={() => OpenImageView(list.img)}
                />
                <div className="house-description-bk"></div>
                <div className="owner-profile">
                  <img src={list.House_owner_profile} alt="owner img" />
                </div>
                <div className="home-description">{list.house_name}</div>
                <div className="home-description2">
                  Location : {list.house_city}
                </div>
                <div className="home-description3">
                  Address : {list.house_address}
                </div>

                <div className="hero-date">
                  <p>Total Rooms : {list.total_room}</p>
                </div>
                <div
                  className="hero-btn"
                  onClick={() =>
                    navigate("/View_rooms", {
                      state: {
                        House_data: list,

                        single_user_name: single_user_name,
                        single_user_email: single_user_email,
                        single_user_mobile: single_user_mobile,
                        single_user_id: single_user_id,
                      },
                    })
                  }
                >
                  More Detail
                </div>
              </div>
            );
          })}
        </div>
      </Grid>
      {house.length == 0 ? (
        <div className="no_home_add_user">
          <div className="no_data_img">
            <img src={nodata} alt="Nodata"></img>
          </div>
          <h1>No data found</h1>
        </div>
      ) : (
        <></>
      )}
      <div className="food_pading_all"></div>
    </>
  );
};
export default Customers_main_page;
