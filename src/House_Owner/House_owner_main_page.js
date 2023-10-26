import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Image, Icon, Button, Grid } from "semantic-ui-react";
import "../House_Owner/House_owner_main_page.css";
import swal from "sweetalert2";
import woman from "../assert/woman.jpg";
import Add_new_house from "../components/Add_new_house";
import { storage, db } from "../firebase";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const House_owner_main_page = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const get_name = location.state.Send_name; //GET DATA FROM LOGIN PAGE
  const get_email = location.state.Send_email; //GET DATA FROM LOGIN PAGE
  const get_id = location.state?.send_id;
  const [users, setUsers] = useState([]); //SET DATA
  const [Booker, setBooker] = useState([]); //SET DATA
  const [house, setHouse] = useState([]); //SET DATA
  const [add_house_form_open, setAdd_house_form_open] = useState(false); //Add house form model
  //SET SINGLE USER DATAS
  const [single_user_name, setSingle_user_name] = useState("");
  const [single_user_email, setSingle_user_email] = useState("");
  const [single_user_mobile, setSingle_user_mobile] = useState("");
  const [single_user_id, setSingle_user_id] = useState("");
  const [single_user_img, setSingle_user_img] = useState("");
  const [load_one_time, setLoad_one_time] = useState(true);

  const [Update_id, setUpdateId] = useState(false);
  /////////////////////////////////////////////////
  const usersCollectionRef = collection(db, "register_login"); //FIREBASE COLLECTION TO GET ALL DATA
  const HouseCollectionRef = collection(db, "Houses"); //FIREBASE COLLECTION TO GET ALL DATA
  const BookerCollectionRef = collection(db, "Book_Rooms"); //FIREBASE COLLECTION TO GET ALL DATA
  //page landing to get all datas
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

    const getRoom_booker = async () => {
      const data = await getDocs(BookerCollectionRef);
      setBooker(
        data.docs.map((doc) => ({
          //OFTER CHECKING SET THA ALL DATA.
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getHouse();
    getUsers();
    getRoom_booker();
  }, []);
  //GET HOUSE DATA ON RENTER
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

  //////DELETE HOUS ONLY OWNER
  const delete_House = async (get_delete_id) => {
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
            await deleteDoc(doc(db, "Houses", get_delete_id));
            swal.fire({
              position: "top-end",
              icon: "success",
              title: "<h3 style={{color:'red'}}>Delete This data</h3>",
              showConfirmButton: false,
              timer: 1500,
            });
            getHouse();
          } catch (err) {
            swal.fire("Oops!", "Some network error so try again!!!", "error");
          }
        }
      });
  };

  const Form_model_for_update = (id) => {
    setUpdateId(id);
    setAdd_house_form_open(true);
  };
  const Form_model_for_add_home = () => {
    setUpdateId(null);
    setAdd_house_form_open(true);
  };
  return (
    <>
      {load_one_time &&
        users.map((item) => {
          if (item.email === get_email) {
            setSingle_user_email(item.email);
            setSingle_user_name(item.name);
            setSingle_user_mobile(item.mobile);
            setSingle_user_img(item.img);
            setSingle_user_id(item.id);
            setLoad_one_time(false);
          }
        })}

      {add_house_form_open && (
        <Add_new_house
          setAdd_house_form_open={setAdd_house_form_open}
          single_user_name={single_user_name}
          single_user_email={single_user_email}
          single_user_mobile={single_user_mobile}
          single_user_id={single_user_id}
          single_user_img={single_user_img}
          getHouse={getHouse}
          update_id={Update_id}
        />
      )}
      {/* <header>
        <nav class="navigation-menu">
          <div class="nav">
            <input type="checkbox" id="nav-check" />
            <div class="nav-header">
              <div class="nav-title">
                <div class="nav-title">
                  <div className="animate__animated animate__slideInLeft site_logo_div">
                    <p>
                      T<p>N</p>
                    </p>
                    <span>Blood Donors</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-btn">
              <label htmlFor="nav-check">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>

            <a href="/">Home</a>

            <a
              href="https://en.wikipedia.org/wiki/Blood_donation#:~:text=Many%20donors%20donate%20for%20several,or%20relative%2C%20and%20social%20pressure"
              target="_blank"
            >
              Awareness
            </a>

            <a>Back</a>

            <a style={{ color: "black" }}>Logout</a>
          </div>

          <Button primary size="huge" onClick={() => Form_model_for_add_home()}>
            <Icon name="home" /> Add House
          </Button>
        </nav>
      </header> */}
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
                <li class="nav-tab">
                  <Button
                    id="nav_bttn"
                    onClick={() => Form_model_for_add_home()}
                  >
                    <Icon name="home" />
                    Add Home
                  </Button>
                </li>
                <li
                  class="nav-tab"
                  onClick={() => (window.location.href = "#owners_about")}
                >
                  Room Booking
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
      <div className="house_deatails">
        <Grid columns="equal" divided>
          <div className="display_all_home_for_user">
            {house.map((list) => {
              if (list.House_owner_email == get_email) {
                return (
                  <div class="Home_card_for_user House_owner_card_contain">
                    <img
                      class="hous-profile-img"
                      src={list.img}
                      alt="House img"
                    />
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
                    <div className="home-description4">
                      <Button
                        positive
                        onClick={() => Form_model_for_update(list.id)}
                      >
                        <Icon name="edit" /> Edit
                      </Button>
                      <Button negative onClick={() => delete_House(list.id)}>
                        <Icon name="trash alternate outline" /> Delete
                      </Button>
                    </div>
                    <div class="hero-date">
                      <p>Total Rooms : {list.total_room}</p>
                    </div>
                    <div
                      class="hero-btn"
                      onClick={() =>
                        navigate("/Rooms", {
                          state: {
                            House_data: list,
                          },
                        })
                      }
                    >
                      More Detail
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </Grid>
      </div>
      <div className="booker_data"></div>
      <div className="booker_title">Your house booking slat.</div>
      <div>
        <Grid columns="equal" divided>
          <div className="display_all_roombook">
            {Booker.map((list) => {
              if (list.House_owner_id === single_user_id) {
                return (
                  <Card>
                    <Card.Content>
                      <Image floated="right" size="mini" src={list.Room_img} />
                      <Card.Header>{list.Room_booker_name}</Card.Header>
                      <Card.Meta>
                        <Icon name="mail"></Icon>
                        {list.Room_booker_email}
                      </Card.Meta>
                      <Card.Meta>
                        <Icon name="mobile alternate"></Icon>91+{" "}
                        {list.Room_booker_mobile}
                      </Card.Meta>
                      {/* Call and mail */}
                      <a
                        href={`mailto:${list.Room_booker_email}`}
                        id="calltobooker"
                        hidden
                      ></a>
                      <a
                        href={`tel:${list.Room_booker_mobile}`}
                        id="teltobooker"
                        hidden
                      ></a>
                      <Card.Description>
                        Room booking @<br />
                        <strong>{list.timstamp}</strong>
                        <div className="user_underline"></div>
                        <div className="booker_details">
                          <div className="user_card_room_name">
                            Room Name: <p>{list.room_name}</p>
                          </div>
                          <div className="user_card_room_name">
                            Location:{" "}
                            <p>
                              <Icon name="map marker alternate" />
                              {list.house_address}
                            </p>
                          </div>
                          <div className="user_card_room_name">
                            Booking slat:{" "}
                            <p>
                              <Icon name="calendar alternate outline"></Icon>
                              {list.From_date}-{list.To_date},
                              {list.Booking_days} days
                            </p>
                          </div>
                          <div className="user_card_room_name">
                            Total amount:{" "}
                            <p>
                              <Icon name="rupee sign" />
                              {/* {list.Total_rend}/ */}
                            </p>
                          </div>
                        </div>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="call_mail_booker">
                        <Button id="mailltouser" negative>
                          <Icon name="linkedin" /> GMail...
                        </Button>
                        <Button primary id="mailltouser">
                          <Icon name="linkedin" /> Call...
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                );
              }
            })}
          </div>
        </Grid>
      </div>
    </>
  );
};
export default House_owner_main_page;
