import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Image, Button, Grid } from "semantic-ui-react";
import "../Customers/Customers_main_page.css";
import swal from "sweetalert2";
import { storage, db } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

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

  const usersCollectionRef = collection(db, "register_login");
  const HouseCollectionRef = collection(db, "Houses"); //FIREBASE COLLECTION TO GET ALL DATA
  useEffect(() => {
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
    getUsers();
    getHouse();
  }, []);
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
    // var search1 = searc;
    // e.preventDefault();
    // setHouse(
    //   house.filter(
    //     (bolg) =>
    //       bolg.work_type_english
    //         .toLowerCase()
    //         .includes(search1.toLowerCase()) ||
    //       bolg.house_city.toLowerCase().includes(search1.toLowerCase())
    //   )
    // );
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
              // <Card color="grey" className="card_bar">
              //   <Image src={list.img} className="room_img" />
              //   <Card.Content>
              //     <Card.Header>{list.houe_name}</Card.Header>
              //     <Card.Description>{`Location: ${list.house_city}`}</Card.Description>
              //     <Card.Description>{`Avaliable Room: ${list.total_room}`}</Card.Description>
              //     <Button
              //       inverted
              //       color="green"
              //       className="city_bttn"
              //       onClick={() =>
              //         navigate("/View_rooms", {
              //           state: {
              //             House_data: list,

              //             single_user_name: single_user_name,
              //             single_user_email: single_user_email,
              //             single_user_mobile: single_user_mobile,
              //             single_user_id: single_user_id,
              //           },
              //         })
              //       }
              //     >
              //       <span>View Rooms</span>
              //     </Button>
              //   </Card.Content>
              // </Card>
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
    </>
  );
};
export default Customers_main_page;
