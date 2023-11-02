/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Icon, Grid } from "semantic-ui-react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "../Customers/View_Rooms.css";
import nodata from "../assert/nodata.avif";
import Owner_see_All_booker from "../components/Owner_see_All_booker";
import Image_view_model from "../components/Image_view_model";

import Room_Book from "../components/Room_Book";

const View_Rooms = () => {
  const location = useLocation(); //GET DATA TO HOUSE SHOW PAGE\
  const [image_view, setImage_view] = useState(false);
  const [imageUrl, setImageUrl] = useState(false);
  const [rooms, setRooms] = useState([]); //SET DATA
  const [bookers_data, setBookers_data] = useState([]); //SET DATA
  const [all_booker_open, setall_booker] = useState(false);
  const [room_data, setRoom_data] = useState([]); //SET DATA
  location.state?.House_data.id==null?window.location.replace("/"):<></>
  const RoomsCollectionRef = query(
    collection(db, "Rooms"),
    where("House_id", "==", location.state.House_data.id)
  ); //FIREBASE COLLECTION TO GET ALL DATA
  const [book_room_form_open, setBook_room_form_open] = useState(false);
  //page landing to get all datas
  useEffect(() => {
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //ON RENDER GET ALL DATA FROM FIREBASE
  const getUsers = async () => {
    const data = await getDocs(RoomsCollectionRef);
    setRooms(
      data.docs.map((doc) => ({
        //OFTER CHECKING SET THA ALL DATA.
        ...doc.data(),
        id: doc.id,
      }))
    );
  };
  /////ROOM BOOK FORM MODEL OPEN FUN
  const Open_room_book_form = (list) => {
    setRoom_data(list);
    setBook_room_form_open(true);
  };
  //VIEW  BOOKING DATA
  const view_All_bookers_data = (list) => {
    setall_booker(true);
    setBookers_data(list);
  };
  ///////set image view
  const OpenImageView = (img) => {
    setImageUrl(img);
    setImage_view(true);
  };
  return (
    <>
      <div className="main_house_view_card">
      <section>
          <div
            className="homeDetailsCard"
            style={{
              background: `linear-gradient(-218deg, rgba(0,0,0,.9), rgba(0,0,0,.0) 50.8%),url(${location.state.House_data.img})`,
            }}
          >
            <div className="upperDivision">
              <div className="homeCardContent">
                <p className="title-content">{`${location.state.House_data.house_name}- ${location.state.House_data.house_no}`}</p>
                <p className="title-desc">
                  <Icon name="map marker alternate"></Icon>
                  {location.state.House_data.house_address}-
                  {location.state.House_data.house_city}
                </p>
                <p className="homeCardDetails">
                  Available rooms : {location.state.House_data.total_room}
                </p>
              </div>
              <div className="img-admin">
                <div className="userImage">
                  <img
                    src={location.state.House_data.House_owner_profile}
                    className="userImage"
                    alt="Owner profile"
                  />
                </div>
              </div>
            </div>
            <div className="lowerDivision">
              <div className="content-view">
                <div className="homeCardItem">
                  <p className="owner-title">Owner Name</p>
                  <hr className="owner-seperator" style={{ color: "black" }} />
                  <br />
                  <p className="owner-answer">
                    <Icon name="user"></Icon>
                    {location.state.House_data.House_owner_name}
                  </p>
                </div>
                <div className="homeCardItem">
                  <p className="owner-title">Owner Phone</p>
                  <hr className="owner-seperator" />
                  <br />
                  <p className="owner-answer">
                    <Icon name="mobile alternate"></Icon>+91{" "}
                    {location.state.House_data.House_owner_mobile}
                  </p>
                </div>
                <div className="homeCardItem">
                  <p className="owner-title">Owner GMail</p>
                  <hr className="owner-seperator" />
                  <br />
                  <p className="owner-answer">
                    <Icon name="mail"></Icon>{" "}
                    {location.state.House_data.House_owner_email}
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </section>
</div>
      {book_room_form_open && (
        <Room_Book
          setBook_room_form_open={setBook_room_form_open}
          room_data={room_data}
          single_user_name={location.state.single_user_name}
          single_user_email={location.state.single_user_email}
          single_user_mobile={location.state.single_user_mobile}
          single_user_id={location.state.single_user_id}
        />
      )}
      {all_booker_open && (
        <Owner_see_All_booker
          bookers_data={bookers_data}
          setall_booker={setall_booker}
          owner={false}
          single_user_id={location.state.single_user_id}
        />
      )}
      
      <div className="rooms_title_bar">
        <h3 style={{ fontSize: "30px"}} i>Available Rooms</h3>
      </div>
      <div className="rooms_hole_contain2">
        {image_view && (
          <Image_view_model setImageview={setImage_view} image={imageUrl} />
        )}
        <Grid columns="equal" id="Distric" divided>
          <div className="display_all_room_user">
            {rooms.map((list) => (
              /* if (*/ /*   list.Owner_id === location.state.House_data.House_owner_id &&*/ /*   list.House_id === location.state.House_data.id*/ /* ) {*/ /* if (*/ /*   list.Owner_id === location.state.House_data.House_owner_id &&*/ /*   list.House_id === location.state.House_data.id*/ /* ) {*/ <div>
                <div className="booking-card">
                  <div
                    className="room-img"
                    style={{
                      backgroundImage: `url(${list.img})`,
                      objectFit: "fill",
                      cursor: "pointer",
                    }}
                    onClick={() => OpenImageView(list.img)}
                  >
                    <div className="btn-group"></div>
                  </div>
                  <div className="room-desc">
                    <div className="room-content">
                      <p className="room-card-title">{list.room_name}</p>
                      <p className="rooom-card-address">
                        <Icon name="map marker alternate"></Icon>{" "}
                        {list.house_address}
                      </p>
                      <p className="price-range">₹ {list.rend} p/d</p>
                      <ul className="features">
                        <li>
                          <Icon name="building outline"></Icon>{" "}
                          {list.floor_size} floor size
                        </li>
                        <li>
                          <Icon name="bath"></Icon> {list.bathrooms} bathroom
                        </li>
                        <li>
                          <Icon name="bed"></Icon> {list.beds} bed
                        </li>
                      </ul>
                    </div>
                    <div className="min_and_max_con">
                      <div className="min_max_title">Time duration must be</div>
                      <div className="min_max_body">
                        *Min {list.min_day} - *Max {list.max_day}
                      </div>

                      <div className="min_max_body">
                        <Icon name="mobile alternate"></Icon>{" "}
                        {list.House_owner_mobile}
                      </div>
                    </div>
                  </div>
                  <div className="roombook_desc">
                    <Icon name="quote right"></Icon>
                    {list.other_data}
                  </div>
                  <div className="book_bttn">
                    <div>
                      <p onClick={() => view_All_bookers_data(list)}>
                        <Icon name="eye" />
                        Show My Booking Details
                      </p>
                    </div>
                    <button
                      id="book_room_bttn"
                      onClick={() => Open_room_book_form(list)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Grid>
        {rooms.length == 0 ? (
          <div className="no_home_add_user2">
            <div className="no_data_img2">
              <img src={nodata} alt="Nodata"></img>
            </div>
            <h1>No data iten add yed</h1>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="food_pading_all"></div>
    </>
  );
};
export default View_Rooms;
