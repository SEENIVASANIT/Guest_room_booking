import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert2";
import {
  Card,
  Image,
  Button,
  Grid,
  Feed,
  Form,
  Icon,
  Input,
} from "semantic-ui-react";
import { storage, db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";
import "../pages/Rooms_deatails.css";
import woman from "../assert/woman.jpg";
import Add_Room from "../components/Add_Room";
import Owner_see_All_booker from "../components/Owner_see_All_booker";
const Rooms_deatails = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState([]); //SET DATA
  const [bookers_data, setBookers_data] = useState([]); //SET DATA
  const [add_house_form_open, setAdd_room_form_open] = useState(false);
  const [all_booker_open, setall_booker] = useState(false);
  const [Update_id, setUpdateId] = useState(false);
  // const [count, setCount] = useState(0);
  var count = 0;
  const RoomsCollectionRef = query(
    collection(db, "Rooms"),
    where("Owner_id", "==", location.state.House_data.House_owner_id),
    where("House_id", "==", location.state.House_data.id)
  ); //FIREBASE COLLECTION TO GET ALL DATA
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
        title: "<h3>Do you want to delete your data?</h3>",
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
          // if (open2) {
          //   setOpen2(false);
          // }
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
      <div className="main_cantainer_for_hous_div">
        <div className="house_deatail_cantainer">
          <div className="house_data_con">
            <div className="hos_data_in_con">
              <img src={location.state.House_data.img} alt={"houseimg"} />
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
      <div className="add_rooms_button">
        {rooms.length >= location.state.House_data.total_room ? (
          <Button size="big" negative disabled>
            <Icon name="home" /> Add new room
          </Button>
        ) : (
          <Button primary size="big" onClick={() => Add_room_datas()}>
            <Icon name="home" /> Add new room
          </Button>
        )}
      </div>
      <div className="bellow_unterline"></div>
      {add_house_form_open && (
        <Add_Room
          setAdd_room_form_open={setAdd_room_form_open}
          house_data={location.state.House_data}
          Update_id={Update_id}
          getUsers={getUsers}
        />
      )}
      {all_booker_open && (
        <Owner_see_All_booker
          bookers_data={bookers_data}
          setall_booker={setall_booker}
        />
      )}
      <h1>Rooms</h1>

      <Grid columns="equal" id="Distric" divided>
        <div className="display_all_room">
          {rooms.map((list) => {
            // if (
            //   list.Owner_id === location.state.House_data.House_owner_id &&
            //   list.House_id === location.state.House_data.id
            // ) {
            return (
              <div>
                <div class="booking-card">
                  <div
                    class="room-img"
                    style={{
                      backgroundImage: `url(${list.img})`,
                      objectFit: "fill",
                    }}
                  >
                    <div class="btn-group">
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
                    {/* <div>
                      <p>
                        <Icon name="eye" />
                        Show My Booking Details
                      </p>
                    </div> */}
                    <button
                      id="book_room_bttn"
                      onClick={() => view_All_bookers_data(list)}
                    >
                      All Bookers
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
  );
};
export default Rooms_deatails;
