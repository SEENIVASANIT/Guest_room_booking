/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-lone-blocks */
/* eslint-disable eqeqeq */
import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Image, Icon, Button, Grid, Menu } from "semantic-ui-react";
import "../House_Owner/House_owner_main_page.css";
import swal from "sweetalert2";
import nodata from "../assert/nodata.avif";
import no_room_book from "../assert/no_room_book.jpg";
import Add_new_house from "../components/Add_new_house";
import { db } from "../firebase";
import {
  collection,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

const House_owner_main_page = () => {
  const location = useLocation();
  const navigate = useNavigate(); //NAVICATR OTHER PAGR
  const ref = useRef(null); //for scrol the window
  const [manustate, setManustate] = useState("Booking_Records");
  //const get_name = location.state.Send_name; //GET DATA FROM LOGIN PAGE
  
  const get_email = location.state?.Send_email; //GET DATA FROM LOGIN PAGE
  location.state?.Send_email==null?window.location.replace("/"):<></>
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

  //FIREBASE COLLECTION TO GET ALL DATA
  const HouseCollectionRef = query(
    collection(db, "Houses"),
    where("House_owner_email", "==", get_email)
  );
  const BookerCollectionRef = query(
    collection(db, "Book_Rooms"),
    where("House_owner_email", "==", get_email)
  );
  ///data have or not check
  const [no_booker_data, setNo_Booker_data] = useState(true);
  const [no_booking_cansal_data, setNo_booking_cansal_data] = useState(true);
  const [no_amount__resend_data, setNo_amount__resend_data] = useState(true);
  const [no_exper_book, setNo_exper_book] = useState(true);
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

    getHouse();
    getUsers();
    getRoom_booker();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  /////get booking data
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
  //////DELETE HOUS ONLY OWNER
  const delete_House = async (get_delete_id) => {
    swal
      .fire({
        title: "<h3>Are you sure want to delete your data?</h3>",
        icon: "info",
        text: "You can't retrieve your old data.",

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
  const delete_booking_data = async (get_delete_id) => {
    swal
      .fire({
        title: "<h3>Do you want to delete this data?</h3>",
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
            await deleteDoc(doc(db, "Book_Rooms", get_delete_id));
            swal.fire({
              position: "top-end",
              icon: "success",
              title: "<h3 style={{color:'red'}}>Delete This data</h3>",
              showConfirmButton: false,
              timer: 1500,
            });
            getRoom_booker();
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
  ///invoke ammount send function
  const Amount_send_fun = async (list) => {
    try {
      //*UPDATE THE DATA IN FIREBASE*//

      await updateDoc(
        doc(db, "Book_Rooms", list.id),
        {
          Room_booking_cancel_amount_send: true,
          Current_time: String(new Date()),
          timstamp: serverTimestamp(),
        },
        getRoom_booker(),
        swal.fire(
          "Money Sent!!!",
          `Total amount : ${
            list.Total_rend - (list.Total_rend * list.Cancelation_charge) / 100
          } sent to ${list.Room_booker_name} successfully `,
          "success"
        )
      );
    } catch (error) {
      swal.fire("Oops!", `Some network error so tryagain!!!`, "error");
    }
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
        // eslint-disable-next-line react/jsx-pascal-case
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
                <li className="nav-tab">
                  <Button
                    id="nav_bttn"
                    onClick={() => Form_model_for_add_home()}
                  >
                    <Icon name="home" />
                    Add Home
                  </Button>
                </li>
                <li
                  className="nav-tab"
                  onClick={() =>
                    ref.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Booking Records
                </li>
                <li className="nav-tab" onClick={() => navigate("/")}>
                  Logout
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="nav_underline"></div>
      </header>
      <div className="your_bro_title">
        <h2>
          <Icon name="home"></Icon>Your Properties
        </h2>
      </div>
      <div className="house_deatails">
        <Grid columns="equal" divided>
          <div className="display_all_home_for_user">
            {house.map((list) => {
              return (
                <div className="Home_card_for_user House_owner_card_contain">
                  <img
                    className="hous-profile-img"
                    src={list.img}
                    alt="House img"
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
                  <div className="home-description4">
                    <Button
                      positive
                      onClick={() => Form_model_for_update(list.id)}
                      id="edit_home_bttn"
                    >
                      <Icon name="edit" /> Edit
                    </Button>
                    <Button
                      negative
                      onClick={() => delete_House(list.id)}
                      id="edit_home_bttn"
                    >
                      <Icon name="trash alternate outline" /> Delete
                    </Button>
                  </div>
                  <div className="hero-date">
                    <p>Total Rooms : {list.total_room}</p>
                  </div>
                  <div
                    className="hero-btn"
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
              //}
            })}
          </div>
        </Grid>
        {house.length == 0 ? (
          <div className="no_home_add">
            <div className="no_data_img">
              <img src={nodata} alt="Nodata"></img>
            </div>
            <h1>No data found</h1>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="booker_data"></div>
      <div className="booker_title">
        <Icon name="users"></Icon>Booking History and Customer Records
      </div>
      <div className="viwe_for_admin_option" ref={ref}>
        <Menu pointing secondary>
          <div className="all_option_position">
            <Menu.Item
              name="Booking Records"
              active={manustate === "Booking_Records"}
              onClick={() => setManustate("Booking_Records")}
            />

            <Menu.Item
              name="Cancelled Booking"
              active={manustate === "Cancelled_Booking"}
              onClick={() => setManustate("Cancelled_Booking")}
            />
            <Menu.Item
              name="Refund Records"
              active={manustate === "Refund_Records"}
              onClick={() => setManustate("Refund_Records")}
            />
            <Menu.Item
              name="Expired Records"
              active={manustate === "Expired_Records"}
              onClick={() => setManustate("Expired_Records")}
            />
          </div>
        </Menu>
      </div>
      <div>
        {manustate === "Booking_Records" ? (
          <Grid columns="equal" divided>
            {no_booker_data ? (
              <div className="no_booker">
                <div className="no_data_img">
                  <img src={no_room_book} alt="Nodata"></img>
                </div>
                <h1>No data found</h1>
              </div>
            ) : (
              <></>
            )}
            <div className="display_all_roombook">
              {Booker.map((list) => {
                if (
                  list.House_owner_id === single_user_id &&
                  list.Room_booking_cancel == false
                ) {
                  {
                    no_booker_data ? setNo_Booker_data(false) : <></>;
                  }
                  return (
                    <Card>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="mini"
                          src={list.Room_img}
                        />
                        <Card.Header>{list.Room_booker_name}</Card.Header>
                        <Card.Meta>
                          <Icon name="mobile alternate"></Icon>91+{" "}
                          {list.Room_booker_mobile}
                        </Card.Meta>
                        <Card.Meta>
                          <Icon name="mail"></Icon>
                          {list.Room_booker_email}
                        </Card.Meta>

                        {/* Call and mail */}
                        <a
                          href={`mailto:${list.Room_booker_email}`}
                          id="mailtobooker"
                          target="_blank"
                          hidden rel="noreferrer"
                        ></a>
                        <a
                          href={`tel:${list.Room_booker_mobile}`}
                          id="teltobooker"
                          target="_blank"
                          hidden rel="noreferrer"
                        ></a>
                        <Card.Description>
                          Room booking @<br />
                          <storage>{list.Current_time}</storage>
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
                              Booking on:
                              <p>
                                <Icon name="calendar alternate outline"></Icon>
                                {list.From_date} / {list.To_date}
                              </p>
                            </div>
                            <div className="user_card_room_name">
                              Total amount:{" "}
                              <p>
                                <Icon name="rupee sign" />
                                {list.Total_rend}
                              </p>
                            </div>
                          </div>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="call_mail_booker">
                          <Button id="mailltouser" negative onClick={()=>document.getElementById('mailtobooker').click()}>
                            <Icon name="mail outline" /> GMail...
                          </Button>
                          <Button primary id="mailltouser" onClick={()=>document.getElementById('teltobooker').click()}>
                            <Icon name="mobile alternate" /> Call...
                          </Button>
                        </div>
                      </Card.Content>
                    </Card>
                  );
                }
              })}
            </div>
            <div className="food_pading_all"></div>
          </Grid>
        ) : (
          <></>
        )}
        {/* ////////////////////////////////////////show-canceld book         */}
        {manustate === "Cancelled_Booking" ? (
          <Grid columns="equal" divided>
            
            <div className="display_all_roombook">
              {Booker.map((list) => {
                if (
                  list.House_owner_id === single_user_id &&
                  list.Room_booking_cancel === true &&
                  list.Room_booking_cancel_amount_send == false
                ) {
                  {
                    no_booking_cansal_data ? (
                      setNo_booking_cansal_data(false)
                    ) : (
                      <></>
                    );
                  }

                  return (
                    <Card>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="mini"
                          src={list.Room_img}
                        />
                        <Card.Header>{list.Room_booker_name}</Card.Header>
                        <Card.Meta>
                          <Icon name="mobile alternate"></Icon>91+{" "}
                          {list.Room_booker_mobile}
                        </Card.Meta>
                        <Card.Meta>
                          <Icon name="mail"></Icon>
                          {list.Room_booker_email}
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
                          <storage style={{ color: "red" }}>
                            Cancelled @ {list.Current_time}
                          </storage>
                          <br />

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
                              Booking slot:
                              <p>
                                <Icon name="calendar alternate outline"></Icon>
                                {list.From_date} / {list.To_date},
                              </p>
                            </div>
                            <div className="user_card_room_name">
                              Total amount:{" "}
                              <p>
                                <Icon name="rupee sign" />
                                {list.Total_rend}
                              </p>
                            </div>
                            <div className="user_card_room_name">
                              Refund amount:{" "}
                              {list.Cancelation_charge == 0 ? (
                                <p>
                                  <Icon name="rupee sign" />
                                  {list.Total_rend}
                                </p>
                              ) : (
                                <p>
                                  <Icon name="rupee sign" />-
                                  {list.Cancelation_charge}% =
                                  {list.Total_rend -
                                    (list.Total_rend *
                                      list.Cancelation_charge) /
                                      100}
                                </p>
                              )}
                            </div>
                          </div>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="amount_resend">
                          <Button
                            primary
                            id="mailltouser"
                            onClick={() => Amount_send_fun(list)}
                          >
                            <Icon name="rupee sign" /> send amount
                          </Button>
                        </div>
                      </Card.Content>
                    </Card>
                  );
                }
              })}
            </div>
            {no_booking_cansal_data ? (
              <div className="no_booker">
                <div className="no_data_img">
                  <img src={no_room_book} alt="Nodata"></img>
                </div>
                <h1>No data found</h1>
              </div>
            ) : (
              <></>
            )}
            <div className="food_pading_all"></div>
          </Grid>
        ) : (
          <></>
        )}
        {/* ///////////check resend ammount///         */}
        {manustate === "Refund_Records" ? (
          <Grid columns="equal" divided>
            {no_amount__resend_data ? (
              <div className="no_booker">
                <div className="no_data_img">
                  <img src={no_room_book} alt="Nodata"></img>
                </div>
                <h1>No data found</h1>
              </div>
            ) : (
              <></>
            )}
            <div className="display_all_roombook">
              {Booker.map((list) => {
                if (
                  list.House_owner_id === single_user_id &&
                  list.Room_booking_cancel_amount_send === true
                ) {
                  {
                    no_amount__resend_data ? (
                      setNo_amount__resend_data(false)
                    ) : (
                      <></>
                    );
                  }

                  return (
                    <Card>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="mini"
                          src={list.Room_img}
                        />
                        <Card.Header>{list.Room_booker_name}</Card.Header>
                        <Card.Meta>
                          <Icon name="mobile alternate"></Icon>91+{" "}
                          {list.Room_booker_mobile}
                        </Card.Meta>
                        <Card.Meta>
                          <Icon name="mail"></Icon>
                          {list.Room_booker_email}
                        </Card.Meta>

                        {/* Call and mail */}

                        <Card.Description>
                          Amount sent on @
                          <storage style={{ color: "red" }}>
                            {list.Current_time}
                          </storage>
                          <br />
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
                              Booking slot:
                              <p>
                                <Icon name="calendar alternate outline"></Icon>
                                {list.From_date} / {list.To_date},
                              </p>
                            </div>
                            <div className="user_card_room_name">
                              Status:{" "}
                              <p style={{ color: "green" }}>
                                amount sent successfull
                              </p>
                            </div>
                            <div className="user_card_room_name">
                              Total amount:{" "}
                              <p>
                                <Icon name="rupee sign" />
                                {list.Total_rend}
                              </p>
                            </div>
                            {list.Cancelation_charge ? (
                              <div className="user_card_room_name">
                                Refund amount:{" "}
                                <p>
                                  <Icon name="rupee sign" />-
                                  {list.Cancelation_charge} % =
                                  {list.Total_rend -
                                    (list.Total_rend *
                                      list.Cancelation_charge) /
                                      100}
                                </p>
                              </div>
                            ) : (
                              <div className="user_card_room_name">
                                Refund amount:{" "}
                                <p>
                                  <Icon name="rupee sign" />
                                  {list.Total_rend -
                                    (list.Total_rend *
                                      list.Cancelation_charge) /
                                      100}
                                </p>
                              </div>
                            )}
                          </div>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="booking_cancal_bttn">
                          <h4
                            style={{
                              color: "green",
                              letterSpacing: "1.5px",
                            }}
                          >
                            <Icon name="checkmark"></Icon> Refunded
                          </h4>
                        </div>
                      </Card.Content>
                    </Card>
                  );
                }
              })}
            </div>
            <div className="food_pading_all"></div>
          </Grid>
        ) : (
          <></>
        )}
        {/* ////////////////////////////////////////////////expired booking         */}
        {manustate === "Expired_Records" ? (
          <Grid columns="equal" divided>
            {no_exper_book ? (
              <div className="no_booker">
                <div className="no_data_img">
                  <img src={no_room_book} alt="Nodata"></img>
                </div>
                <h1>No data found</h1>
              </div>
            ) : (
              <></>
            )}
            <div className="display_all_roombook">
              {Booker.map((list) => {
                if (
                  list.House_owner_id === single_user_id &&
                  list.To_date <
                    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
                      new Date().getDate() <= 9
                        ? `0${new Date().getDate()}`
                        : new Date().getDate()
                    }`
                ) {
                  {
                    no_exper_book ? setNo_exper_book(false) : <></>;
                  }
                  return (
                    <Card>
                      <Card.Content>
                        <Image
                          floated="right"
                          size="mini"
                          src={list.Room_img}
                        />
                        <Card.Header>{list.Room_booker_name}</Card.Header>
                        <Card.Meta>
                          <Icon name="mobile alternate"></Icon>91+{" "}
                          {list.Room_booker_mobile}
                        </Card.Meta>
                        <Card.Meta>
                          <Icon name="mail"></Icon>
                          {list.Room_booker_email}
                        </Card.Meta>
                        {/* Call and mail */}

                        <Card.Description>
                          <storage style={{ color: "red" }}>
                            last action @ {list.Current_time}
                          </storage>
                          <br />

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
                              Booking slot:
                              <p>
                                <Icon name="calendar alternate outline"></Icon>
                                {list.From_date} / {list.To_date},
                              </p>
                            </div>

                            <div className="user_card_room_name">
                              Total amount:{" "}
                              <p>
                                <Icon name="rupee sign" />
                                {list.Total_rend}
                              </p>
                            </div>
                            <div className="user_card_room_name">
                              Status:{" "}
                              <p style={{ color: "red" }}>
                                <Icon
                                  name="calendar alternate outline"
                                  color="red"
                                />
                                Expired @ {list.To_date}
                              </p>
                            </div>
                          </div>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="delete_booking">
                          <Button
                            negative
                            id="mailltouser"
                            onClick={() => delete_booking_data(list.id)}
                          >
                            <Icon name="linkedin" /> Delete
                          </Button>
                        </div>
                      </Card.Content>
                    </Card>
                  );
                }
              })}
            </div>
            <div className="food_pading_all"></div>
          </Grid>
          
        ) : (
          <></>
        )}
      </div>
      <div className="food_pading_all"></div>
    </>
  );
};
export default House_owner_main_page;
