import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Card, Image, Menu, Button, Icon, Grid } from "semantic-ui-react";
import no_room_book from "../assert/no_room_book.jpg";

import "../components/Customers_booking_rooms.css";
import swal from "sweetalert2";
const Customers_booking_rooms = ({ Customers_booking_open, customers_id }) => {
  const BookerCollectionRef = query(
    collection(db, "Book_Rooms"),
    where("Room_booker_id", "==", customers_id),
    where("Room_booking_cancel", "==", false)
  );
  const Booker_cancelCollectionRef = query(
    collection(db, "Book_Rooms"),
    where("Room_booker_id", "==", customers_id),
    where("Room_booking_cancel", "==", true)
  );
  const Booker_amount_sendCollectionRef = query(
    collection(db, "Book_Rooms"),
    where("Room_booker_id", "==", customers_id),
    where("Room_booking_cancel_amount_send", "==", true)
  );
  const [Booker, setBooker] = useState([]); //SET DATA
  const [Booker_cancel, setBooker_cancel] = useState([]);
  const [Booker_amount_resend, setBooker_ammount_resend] = useState([]);

  const [manustate, setManustate] = useState("home");
  useEffect(() => {
    getUsers();
    getCustomer_canceled();
    getAmmount_send();
  }, []);
  const getUsers = async () => {
    const data = await getDocs(BookerCollectionRef);
    setBooker(
      data.docs.map((doc) => ({
        //OFTER CHECKING SET THA ALL DATA.
        ...doc.data(),
        id: doc.id,
      }))
    );
  };
  const getCustomer_canceled = async () => {
    const data = await getDocs(Booker_cancelCollectionRef);
    setBooker_cancel(
      data.docs.map((doc) => ({
        //OFTER CHECKING SET THA ALL DATA.
        ...doc.data(),
        id: doc.id,
      }))
    );
  };
  const getAmmount_send = async () => {
    const data = await getDocs(Booker_amount_sendCollectionRef);
    setBooker_ammount_resend(
      data.docs.map((doc) => ({
        //OFTER CHECKING SET THA ALL DATA.
        ...doc.data(),
        id: doc.id,
      }))
    );
  };
  ///Booking cancel
  const Booking_cancel = async (list) => {
    swal
      .fire({
        title: "<h3>Are you suore?</h3>",
        icon: "info",
        text: `if you cancel owner redus 10% and give only ${""}`,

        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        showDenyButton: true,
        confirmButtonText: "<h5>Okey</h5>",
        denyButtonText: `<h5>Cancel</h5>`,
      })
      .then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          // if (open2) {
          //   setOpen2(false);
          // }
          try {
            await updateDoc(doc(db, "Book_Rooms", list.id), {
              Room_booking_cancel: true,
              Current_time: String(new Date()),
              timstamp: serverTimestamp(),
            });
            swal.fire({
              position: "top-end",
              icon: "success",
              title: "<h3 style={{color:'red'}}>Room booking canceled </h3>",
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
  return (
    <>
      <div className="login_model animate__animated animate__fadeInDown">
        <div className="all_booker_con_customer">
          <div className="viwe_for_customer_option">
            <Menu pointing secondary>
              <div className="all_option_position">
                <Menu.Item
                  name="Your Booking"
                  active={manustate === "home"}
                  onClick={() => setManustate("home")}
                />

                <Menu.Item
                  name="Canceld booking"
                  active={manustate === "messages"}
                  onClick={() => setManustate("messages")}
                />
                <Menu.Item
                  name="Ammount refund"
                  active={manustate === "friends"}
                  onClick={() => setManustate("friends")}
                />
              </div>
            </Menu>
          </div>
          <div className="create_cape"></div>
          <div className="con_for_booker">
            {manustate === "home" ? (
              <Grid columns="equal" divided>
                <div className="display_all_roombook2">
                  {Booker.map((list) => {
                    return (
                      <Card>
                        <Card.Content>
                          <Image
                            floated="right"
                            size="mini"
                            src={list.Room_img}
                          />
                          <Card.Header>{list.House_owner_name}</Card.Header>
                          <Card.Meta>
                            <Icon name="mobile alternate"></Icon>91+{" "}
                            {list.House_owner_mobile}
                          </Card.Meta>
                          <Card.Meta>
                            <Icon name="mail"></Icon>
                            {list.House_owner_email}
                          </Card.Meta>
                          {/* Call and mail */}
                          <a
                            href={`mailto:${list.House_owner_email}`}
                            id="calltobooker"
                            hidden
                          ></a>
                          <a
                            href={`tel:${list.House_owner_mobile}`}
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
                          <div className="booking_cancal_bttn">
                            <Button
                              negative
                              id="user_booking_show_bttn"
                              onClick={() => Booking_cancel(list)}
                            >
                              <Icon name="home" />
                              Booking Cancel
                            </Button>
                            <Button
                              id="user_booking_show_bttn"
                              primary
                              onClick={() => Booking_cancel(list)}
                            >
                              <Icon name="mobile alternate" />
                              Contact owner
                            </Button>
                          </div>
                        </Card.Content>
                      </Card>
                    );
                  })}
                </div>
                {Booker.length === 0 ? (
                  <div className="no_booker_data_items">
                    <div className="no_booker2">
                      <div className="no_data_img">
                        <img src={no_room_book} alt="Nodata"></img>
                      </div>
                      <h1>No data iten add yed</h1>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </Grid>
            ) : (
              <></>
            )}
            {/* canceled data */}
            {manustate === "messages" ? (
              <Grid columns="equal" divided>
                <div className="display_all_roombook2">
                  {Booker_cancel.map((list) => {
                    return (
                      <Card>
                        <Card.Content>
                          <Image
                            floated="right"
                            size="mini"
                            src={list.Room_img}
                          />
                          <Card.Header>{list.House_owner_name}</Card.Header>
                          <Card.Meta>
                            <Icon name="mobile alternate"></Icon>91+{" "}
                            {list.House_owner_mobile}
                          </Card.Meta>
                          <Card.Meta>
                            <Icon name="mail"></Icon>
                            {list.House_owner_email}
                          </Card.Meta>

                          <Card.Description>
                            booking canceled @<br />
                            <storage style={{ color: "red" }}>
                              {list.Current_time}
                            </storage>
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
                                Refund Amount:{" "}
                                <p>
                                  <Icon name="rupee sign" />
                                  {list.Total_rend -
                                    (list.Total_rend *
                                      list.Cancelation_charge) /
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
                                color: "orange",
                                letterSpacing: "1.5px",
                              }}
                            >
                              Ammount Not Send...
                            </h4>
                            {/* <Button
                              negative
                              id="user_booking_show_bttn"
                              onClick={() => Booking_cancel(list)}
                            >
                              <Icon name="home" />
                              Booking Cancel
                            </Button>
                            <Button
                              id="user_booking_show_bttn"
                              primary
                              onClick={() => Booking_cancel(list)}
                            >
                              <Icon name="mobile alternate" />
                              Contact owner
                            </Button> */}
                          </div>
                        </Card.Content>
                      </Card>
                    );
                  })}
                </div>
                {Booker_cancel.length === 0 ? (
                  <div className="no_booker_data_items">
                    <div className="no_booker2">
                      <div className="no_data_img">
                        <img src={no_room_book} alt="Nodata"></img>
                      </div>
                      <h1>No data iten add yed</h1>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </Grid>
            ) : (
              <></>
            )}
            {manustate === "friends" ? (
              <Grid columns="equal" divided>
                <div className="display_all_roombook2">
                  {Booker_amount_resend.map((list) => {
                    return (
                      <Card>
                        <Card.Content>
                          <Image
                            floated="right"
                            size="mini"
                            src={list.Room_img}
                          />
                          <Card.Header>{list.House_owner_name}</Card.Header>
                          <Card.Meta>
                            <Icon name="mobile alternate"></Icon>91+{" "}
                            {list.House_owner_mobile}
                          </Card.Meta>
                          <Card.Meta>
                            <Icon name="mail"></Icon>
                            {list.House_owner_email}
                          </Card.Meta>

                          <Card.Description>
                            Ammount send @<br />
                            <storage style={{ color: "green" }}>
                              {list.Current_time}
                            </storage>
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
                                Refund Amount:{" "}
                                <p>
                                  <Icon name="rupee sign" />
                                  {list.Total_rend -
                                    (list.Total_rend *
                                      list.Cancelation_charge) /
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
                              Ammount Sende...
                            </h4>
                            {/* <Button
                              negative
                              id="user_booking_show_bttn"
                              onClick={() => Booking_cancel(list)}
                            >
                              <Icon name="home" />
                              Booking Cancel
                            </Button>
                            <Button
                              id="user_booking_show_bttn"
                              primary
                              onClick={() => Booking_cancel(list)}
                            >
                              <Icon name="mobile alternate" />
                              Contact owner
                            </Button> */}
                          </div>
                        </Card.Content>
                      </Card>
                    );
                  })}
                </div>
                {Booker_amount_resend.length === 0 ? (
                  <div className="no_booker_data_items">
                    <div className="no_booker2">
                      <div className="no_data_img">
                        <img src={no_room_book} alt="Nodata"></img>
                      </div>
                      <h1>No data iten add yed</h1>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </Grid>
            ) : (
              <></>
            )}
          </div>

          <div className="All_booker_manu_closs">
            <Button
              negative
              size="huge"
              onClick={() => Customers_booking_open(false)}
            >
              Close Model
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers_booking_rooms;
