import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Image, Icon, Button, Grid, Feed } from "semantic-ui-react";
import { storage, db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import "../Customers/View_Rooms.css";
import nodata from "../assert/nodata.avif";
import Owner_see_All_booker from "../components/Owner_see_All_booker";
import Room_Book from "../components/Room_Book";
const View_Rooms = () => {
  const location = useLocation(); //GET DATA TO HOUSE SHOW PAGE
  const [rooms, setRooms] = useState([]); //SET DATA
  const [bookers_data, setBookers_data] = useState([]); //SET DATA
  const [all_booker_open, setall_booker] = useState(false);
  const [room_data, setRoom_data] = useState([]); //SET DATA
  const RoomsCollectionRef = query(
    collection(db, "Rooms"),
    where("House_id", "==", location.state.House_data.id)
  ); //FIREBASE COLLECTION TO GET ALL DATA
  const [book_room_form_open, setBook_room_form_open] = useState(false);
  //page landing to get all datas
  useEffect(() => {
    getUsers();
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
  return (
    <>
      <div className="main_cantainer_for_hous_div">
        <div className="house_deatail_cantainer">
          <div className="house_data_con">
            <div className="hos_data_in_con">
              <img src={location.state.House_data.img} alt={"dadad"} />
              <div className="data_con">
                <div className="hos_data_display">
                  <Feed.Summary>
                    <span>
                      House Owner Name:{" "}
                      <h3>{location.state.House_data.House_owner_name}</h3>
                    </span>
                  </Feed.Summary>
                  <Feed.Summary>
                    <span>
                      House Owner Gmail:{" "}
                      <h3>{location.state.House_data.House_owner_email}</h3>
                    </span>
                  </Feed.Summary>
                  <Feed.Summary>
                    <span>
                      House Owner Mobile:{" "}
                      <h3>{location.state.House_data.House_owner_mobile}</h3>
                    </span>
                  </Feed.Summary>

                  <Feed.Summary>
                    <span>
                      House Name:{" "}
                      <h3>{`${location.state.House_data.house_name}- ${location.state.House_data.house_no}`}</h3>
                    </span>
                  </Feed.Summary>
                  <Feed.Summary>
                    <span>
                      District Name:{" "}
                      <h3>{location.state.House_data.house_city}</h3>
                    </span>
                  </Feed.Summary>
                  <Feed.Summary>
                    <span>
                      Total Avalible Roomes:{" "}
                      <h3>{location.state.House_data.total_room}</h3>
                    </span>
                  </Feed.Summary>
                  <Feed.Summary>
                    <span>
                      House Address:
                      <div className="hos_addresss">
                        <h3>{location.state.House_data.house_address}</h3>
                      </div>
                    </span>
                  </Feed.Summary>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bellow_unterline"></div>
      <h1>Rooms</h1>
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
      {/* <Grid columns="equal" id="Distric" divided>
        <div className="city_card">
          {rooms.map((list) => {
            if (list.House_id === location.state.House_data.id)
              return (
                <Card color="grey" className="card_bar">
                  <Image src={list.img} className="room_img" />

                  <Card.Content>
                    <Card.Header>{"senivasan"}</Card.Header>
                    <Card.Description>Select Your District.</Card.Description>
                    <Button inverted color="green" className="city_bttn">
                      <span>Deatails</span>
                    </Button>
                    <Button
                      inverted
                      color="green"
                      className="city_bttn"
                      onClick={() => Open_room_book_form(list)}
                    >
                      <span>Boock</span>
                    </Button>
                  </Card.Content>
                </Card>
              );
          })}
        </div>
      </Grid> */}
      <div className="rooms_hole_contain">
        <Grid columns="equal" id="Distric" divided>
          <div className="display_all_room_user">
            {rooms.map((list) => (
              /* if (*/ /*   list.Owner_id === location.state.House_data.House_owner_id &&*/ /*   list.House_id === location.state.House_data.id*/ /* ) {*/ /* if (*/ /*   list.Owner_id === location.state.House_data.House_owner_id &&*/ /*   list.House_id === location.state.House_data.id*/ /* ) {*/ <div>
                <div class="booking-card">
                  <div
                    class="room-img"
                    style={{
                      backgroundImage: `url(${list.img})`,
                      objectFit: "fill",
                    }}
                  >
                    <div class="btn-group"></div>
                  </div>
                  <div class="room-desc">
                    <div class="room-content">
                      <p class="room-card-title">{list.room_name}</p>
                      <p class="rooom-card-address">
                        <Icon name="map marker alternate"></Icon>{" "}
                        {list.house_address}
                      </p>
                      <p class="price-range">₹ {list.rend} p/d</p>
                      <ul class="features">
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
                    <div class="min_and_max_con">
                      <div class="min_max_title">we are living only</div>
                      <div class="min_max_body">
                        *Min {list.min_day} - *Max {list.max_day}
                      </div>

                      <div class="min_max_body">
                        <Icon name="mobile alternate"></Icon>{" "}
                        {list.House_owner_mobile}
                      </div>
                    </div>
                  </div>
                  <div class="roombook_desc">
                    <Icon name="quote right"></Icon>
                    {list.other_data}
                  </div>
                  <div class="book_bttn">
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
