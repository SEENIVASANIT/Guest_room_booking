/* eslint-disable eqeqeq */
import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import swal from "sweetalert2";
import {
  Button,
  Grid,

  Icon,
} from "semantic-ui-react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import "../pages/Rooms_deatails.css";
import nodata from "../assert/nodata.avif";
import Add_Room from "../components/Add_Room";
import Owner_see_All_booker from "../components/Owner_see_All_booker";
const Rooms_deatails = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState([]); //SET DATA
  const [bookers_data, setBookers_data] = useState([]); //SET DATA
 
  const [add_house_form_open, setAdd_room_form_open] = useState(false);
  const [all_booker_open, setall_booker] = useState(false);
  const [Update_id, setUpdateId] = useState(false);
  location.state?.House_data.House_owner_id==null?window.location.replace("/"):<></>
  const RoomsCollectionRef = query(
    collection(db, "Rooms"),
    where("Owner_id", "==", location.state.House_data.House_owner_id),
    where("House_id", "==", location.state.House_data.id)
  ); //FIREBASE COLLECTION TO GET ALL DATA
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
  ///SET UPDATE ID
  const Update_for_room_datas = (id) => {
    setUpdateId(id);
    setAdd_room_form_open(true);
  };
  const Add_room_datas = () => {
    setUpdateId(null);
    setAdd_room_form_open(true);
  };
  ////DELETE FOR ROOM
  const delete_Room = async (get_delete_id) => {
    swal
      .fire({
        title: "<h3>Are you really want to proceed?</h3>",
        icon: "info",
        text: "You can't undo your data.",

        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        showDenyButton: true,
        confirmButtonText: "<h5>Delete</h5>",
        denyButtonText: `<h5>Cancel</h5>`,
      })
      .then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          try {
            await deleteDoc(doc(db, "Rooms", get_delete_id));
            swal.fire({
              position: "top-end",
              icon: "success",
              title: "<h3 style={{color:'red'}}>Delete This data</h3>",
              showConfirmButton: false,
              timer: 1500,
            });
            getUsers();
          } catch (err) {
            swal.fire("Oops!", "Some network error so try again!!!", "error");
          }
        }
      });
  };
  //VIEW ALL BOOKER DATA
  const view_All_bookers_data = (list) => {
    setall_booker(true);
    setBookers_data(list);
  };
  
  return (
    <>
    <div className="adminPageContainer">
      <div className="main_cantainer_for_hous_div">
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
                {rooms.length >= location.state.House_data.total_room ? (
                  <div className="homeCardItem" id="centerDiv">
                    <Button
                      circular
                      className="homeCardButton"
                      color="facebook"
                      icon="plus"
                      disabled
                    />
                  </div>
                ) : (
                  <div className="homeCardItem" id="centerDiv">
                    <Button
                      circular
                      className="homeCardButton"
                      color="facebook"
                      icon="plus"
                      onClick={() => Add_room_datas()}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        </div>
      </div>
      

      {add_house_form_open && (
        // eslint-disable-next-line react/jsx-pascal-case
        <Add_Room
          setAdd_room_form_open={setAdd_room_form_open}
          house_data={location.state.House_data}
          Update_id={Update_id}
          getUsers={getUsers}
        />
      )}
      {all_booker_open && (
        // eslint-disable-next-line react/jsx-pascal-case
        <Owner_see_All_booker
          bookers_data={bookers_data}
          setall_booker={setall_booker}
          owner={true}
        />
      )}
      <div className="rooms_title_bar">
        <h3 style={{ fontSize: "30px"}} i>House Accomodations</h3>
      </div>
      <div className="rooms_hole_contain">
        {rooms.length == 0 ? (
          <div className="no_home_add">
            <div className="no_data_img2">
              <img src={nodata} alt="Nodata"></img>
            </div>
            <h1>No data iten add yed</h1>
          </div>
        ) : (
          <>
            <Grid columns="equal" id="Distric" divided>
              
              <div className="display_all_room">
                {rooms.map((list) => {
                 
                  return (
                    <div>
                      <div className="booking-card">
                        <div
                          className="room-img"
                          style={{
                            backgroundImage: `linear-gradient(90deg, rgba(207, 207, 207, 0.02), rgb(73, 73, 73,0.7)),url(${list.img})`,
                            backgroundRepeat: "no-repeat",
                            objectFit: "contain",
                            backgroundSize: "100% 100%",
                           
                          }}
                          
                        >
                          <div className="btn-group">
                            <div className="edit_delete_room">
                              <Button
                                positive
                                id="edit_for_room"
                                onClick={() => Update_for_room_datas(list.id)}
                              >
                                <Icon name="edit" /> Edit
                              </Button>
                              <Button
                                negative
                                id="edit_for_room"
                                onClick={() => delete_Room(list.id)}
                              >
                                <Icon name="trash alternate outline" /> Delete
                              </Button>
                            </div>
                          </div>
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
                                <Icon name="bath"></Icon> {list.bathrooms}{" "}
                                bathroom
                              </li>
                              <li>
                                <Icon name="bed"></Icon> {list.beds} bed
                              </li>
                            </ul>
                          </div>
                          <div className="min_and_max_con">
                            <div className="min_max_title">
                              we are living only
                            </div>
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
                          <button
                            id="book_room_bttn"
                            onClick={() => view_All_bookers_data(list)}
                          >
                            View Booking
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                  // }
                })}
              </div>
            </Grid>
          </>
        )}
        <div className="food_pading_all1"></div>
      </div>
      </div>
    </>
  );
};
export default Rooms_deatails;
