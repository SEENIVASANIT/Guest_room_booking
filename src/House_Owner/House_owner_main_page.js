import React from "react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Image, Icon, Button, Grid, Menu, List } from "semantic-ui-react";
import "../House_Owner/House_owner_main_page.css";
import swal from "sweetalert2";
import woman from "../assert/woman.jpg";
import nodata from "../assert/nodata.avif";
import no_room_book from "../assert/no_room_book.jpg";
import Add_new_house from "../components/Add_new_house";
import { storage, db } from "../firebase";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

const House_owner_main_page = () => {
  const location = useLocation();
  const navigate = useNavigate(); //NAVICATR OTHER PAGR
  const ref = useRef(null); //for scrol the window
  const [manustate, setManustate] = useState("home");
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
          "SUCCESS!!!",
          `Total amount is ${
            list.Total_rend - (list.Total_rend * list.cancelation_charge) / 100
          } send to ${list.Room_booker_name} successfull `,
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
                  onClick={() =>
                    ref.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Room Booking
                </li>
                <li
                  class="nav-tab"
                  onClick={() => (window.location.href = "/")}
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
              //}
            })}
          </div>
        </Grid>
        {house.length == 0 ? (
          <div className="no_home_add">
            <div className="no_data_img">
              <img src={nodata} alt="Nodata"></img>
            </div>
            <h1>No data iten add yed</h1>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="booker_data"></div>
      <div className="booker_title">Your house booking slat.</div>
      <div className="viwe_for_admin_option" ref={ref}>
        <Menu pointing secondary>
          <div className="all_option_position">
            <Menu.Item
              name="All Booker"
              active={manustate === "home"}
              onClick={() => setManustate("home")}
            />

            <Menu.Item
              name="Booking Cancle"
              active={manustate === "messages"}
              onClick={() => setManustate("messages")}
            />
            <Menu.Item
              name="Ammount Resend"
              active={manustate === "friends"}
              onClick={() => setManustate("friends")}
            />
            <Menu.Item
              name="Expair booking"
              active={manustate === "exper"}
              onClick={() => setManustate("exper")}
            />
          </div>
        </Menu>
      </div>
      <div>
        {manustate === "home" ? (
          <Grid columns="equal" divided>
            {no_booker_data ? (
              <div className="no_booker">
                <div className="no_data_img">
                  <img src={no_room_book} alt="Nodata"></img>
                </div>
                <h1>No data iten add yed</h1>
              </div>
            ) : (
              <></>
            )}
            <div className="display_all_roombook">
              {Booker.map((list) => {
                if (
                  list.House_owner_id === single_user_id &&
                  list.Room_booking_cancel != false
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
                              Booking slat:
                              <p>
                                <Icon name="calendar alternate outline"></Icon>
                                {list.From_date} / {list.To_date},
                              </p>
                            </div>
                            <div className="user_card_room_name">
                              Total amount:{" "}
                              <p>
                                <Icon name="rupee sign" />
                                {list.Total_rend}/
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
        ) : (
          <></>
        )}
        {/* ////////////////////////////////////////show-canceld book         */}
        {manustate === "messages" ? (
          <Grid columns="equal" divided>
            {no_booking_cansal_data ? (
              <div className="no_booker">
                <div className="no_data_img">
                  <img src={no_room_book} alt="Nodata"></img>
                </div>
                <h1>No data iten add yed</h1>
              </div>
            ) : (
              <></>
            )}
            <div className="display_all_roombook">
              {Booker.map((list) => {
                if (
                  list.House_owner_id === single_user_id &&
                  list.Room_booking_cancel === true
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
                          <storage style={{ color: "red" }}>
                            Booking cancled at {list.Current_time}
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
                              Booking slat:
                              <p>
                                <Icon name="calendar alternate outline"></Icon>
                                {list.From_date} / {list.To_date},
                              </p>
                            </div>
                            <div className="user_card_room_name">
                              Total amount:{" "}
                              <p>
                                <Icon name="rupee sign" />
                                {list.Total_rend}/
                              </p>
                            </div>
                            <div className="user_card_room_name">
                              Refund amount:{" "}
                              {list.cancelation_charge == 0 ? (
                                <p>
                                  <Icon name="rupee sign" />
                                  {list.Total_rend}
                                </p>
                              ) : (
                                <p>
                                  <Icon name="rupee sign" />
                                  reduse {list.cancelation_charge}%=
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
                            onClick={() => Amount_send_fun(List)}
                          >
                            <Icon name="rupee sign" /> amount send
                          </Button>
                        </div>
                      </Card.Content>
                    </Card>
                  );
                }
              })}
            </div>
          </Grid>
        ) : (
          <></>
        )}
        {/* ///////////check resend ammount///         */}
        {manustate === "friends" ? (
          <Grid columns="equal" divided>
            {no_amount__resend_data ? (
              <div className="no_booker">
                <div className="no_data_img">
                  <img src={no_room_book} alt="Nodata"></img>
                </div>
                <h1>No data iten add yed</h1>
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
                          <Icon name="mail"></Icon>
                          {list.Room_booker_email}
                        </Card.Meta>
                        <Card.Meta>
                          <Icon name="mobile alternate"></Icon>91+{" "}
                          {list.Room_booker_mobile}
                        </Card.Meta>
                        {/* Call and mail */}

                        <Card.Description>
                          Amount send on @
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
                              Booking slat:
                              <p>
                                <Icon name="calendar alternate outline"></Icon>
                                {list.From_date} / {list.To_date},
                              </p>
                            </div>
                            <div className="user_card_room_name">
                              Status:{" "}
                              <p style={{ color: "green" }}>
                                <Icon name="rupee sign" color="green" />
                                amount send successfull
                              </p>
                            </div>
                            <div className="user_card_room_name">
                              Total amount:{" "}
                              <p>
                                <Icon name="rupee sign" />
                                {list.Total_rend}/
                              </p>
                            </div>
                            <div className="user_card_room_name">
                              Refund amount:{" "}
                              <p>
                                <Icon name="rupee sign" />
                                reduse 10%=
                                {list.Total_rend -
                                  (list.Total_rend * list.Cancelation_charge) /
                                    100}
                              </p>
                            </div>
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
                            Ammount sended
                          </h4>
                        </div>
                      </Card.Content>
                    </Card>
                  );
                }
              })}
            </div>
          </Grid>
        ) : (
          <></>
        )}
        {manustate === "exper" ? (
          <Grid columns="equal" divided>
            {no_exper_book ? (
              <div className="no_booker">
                <div className="no_data_img">
                  <img src={no_room_book} alt="Nodata"></img>
                </div>
                <h1>No data iten add yed</h1>
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
                          {/* <storage style={{ color: "red" }}>
                            {list.Current_time}
                          </storage> */}
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
                              Booking slat:
                              <p>
                                <Icon name="calendar alternate outline"></Icon>
                                {list.From_date} / {list.To_date},
                              </p>
                            </div>

                            <div className="user_card_room_name">
                              Total amount:{" "}
                              <p>
                                <Icon name="rupee sign" />
                                {list.Total_rend}/
                              </p>
                            </div>
                            <div className="user_card_room_name">
                              Status:{" "}
                              <p style={{ color: "red" }}>
                                <Icon name="rupee sign" color="red" />
                                Expaired @ {list.To_date}
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
