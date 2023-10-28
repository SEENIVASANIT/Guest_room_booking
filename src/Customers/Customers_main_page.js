import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Image, Button, Grid } from "semantic-ui-react";
import "../Customers/Customers_main_page.css";
import swal from "sweetalert2";
import nodata from "../assert/nodata.avif";
import { storage, db } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import Customers_booking_rooms from "../components/Customers_booking_rooms";
const Customers_main_page = () => {
  const location = useLocation(); //GET ALL DATA
  const navigate = useNavigate(); //navigate to VIEW ROOMS
  const get_name = location.state.Send_name; //GET DATA FROM LOGIN PAGE
  const get_email = location.state.Send_email; //GET DATA FROM LOGIN PAGE
  const [users, setUsers] = useState([]); //SET DATA
  const [house, setHouse] = useState([]); //SET DATA
  ////SET DATA FOR LOGIN USER
  const [single_user_name, setSingle_user_name] = useState("");
  const [single_user_email, setSingle_user_email] = useState("");
  const [single_user_mobile, setSingle_user_mobile] = useState("");
  const [single_user_id, setSingle_user_id] = useState("");
  const [load_one_time, setLoad_one_time] = useState(true);
  /////////////////////////////////////////////////
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
                  onClick={() => setCustomers_booking_open(true)}
                >
                  My Rooms
                </li>
                <li
                  class="nav-tab"
                  onClick={() => (window.location.href = "#user_about")}
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
        <div class="search_container">
          <div class="row">
            <div class="col-xs-10 col-xs-offset-1">
              <div class="input-group">
                <input
                  className="form-controls"
                  placeholder="Search by city . . ."
                  type="text"
                  onChange={(e) => {
                    Search_fun(e, e.target.value);
                  }}
                />
                <div class="input-group-btn">
                  <button type="button" id="searchbtn">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1>All House</h1>
      <Grid columns="equal" id="Distric" divided>
        <div className="display_all_home_for_user">
          {house.map((list) => {
            return (
              <div class="Home_card_for_user House_owner_card_contain">
                <img class="hous-profile-img" src={list.img} alt="House img" />
                <div class="house-description-bk"></div>
                <div class="owner-profile">
                  <img src={list.House_owner_profile} alt="owner img" />
                </div>
                <div class="home-description">{list.house_name}</div>
                <div class="home-description2">
                  Location : {list.house_city}
                </div>
                <div class="home-description3">
                  Address : {list.house_address}
                </div>

                <div class="hero-date">
                  <p>Total Rooms : {list.total_room}</p>
                </div>
                <div
                  class="hero-btn"
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
          <h1>No data iten add yed</h1>
        </div>
      ) : (
        <></>
      )}
      <div className="food_pading_all"></div>
    </>
  );
};
export default Customers_main_page;
