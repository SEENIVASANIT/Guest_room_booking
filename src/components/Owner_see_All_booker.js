import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import swal from "sweetalert2";
import {
  Card,
  Image,
  Message,
  Form,
  Input,
  Icon,
  TextArea,
  Label,
  Menu,
  Button,
  Grid,
} from "semantic-ui-react";
import "../components/Room_Book.css";

import { db } from "../firebase";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import no_room_book from "../assert/no_room_book.jpg";
import "../components/Owner_see_All_booker.css";
const Owner_see_All_booker = ({
  setall_booker,
  bookers_data,
  owner,
  single_user_id,
}) => {
  const BookerCollectionRef = owner
    ? query(
        collection(db, "Book_Rooms"),
        where("House_owner_id", "==", bookers_data.Owner_id),
        where("House_id", "==", bookers_data.id)
      )
    : query(
        collection(db, "Book_Rooms"),
        where("Room_booker_id", "==", single_user_id),
        where("House_id", "==", bookers_data.id)
      );
  const [Booker, setBooker] = useState([]); //SET DATA
  useEffect(() => {
    getUsers();
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
  ///Booking cancel
  const Booking_cancel = async (list) => {
    swal
      .fire({
        title: "<h3>Are you suore?</h3>",
        icon: "info",
        text:
          list.Cancelation_charge != 0
            ? `if you cancel owner redus ${
                list.Cancelation_charge
              }% and give only ${
                list.Total_rend -
                (list.Total_rend * list.Cancelation_charge) / 100
              }`
            : `you want cancled booking`,
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
        <div className="all_booker_con">
          <div className="con_for_booker">
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
                        {owner ? (
                          <Card.Header>{list.Room_booker_name}</Card.Header>
                        ) : (
                          <Card.Header>{list.House_owner_name}</Card.Header>
                        )}

                        <Card.Meta>
                          <Icon name="mobile alternate"></Icon>91+{" "}
                          {owner
                            ? list.Room_booker_mobile
                            : list.House_owner_mobile}
                        </Card.Meta>
                        <Card.Meta>
                          <Icon name="mail"></Icon>
                          {owner
                            ? list.Room_booker_email
                            : list.House_owner_email}
                        </Card.Meta>
                        {/* Call and mail */}
                        {/* <a
                          href={`mailto:${list.House_owner_email}`}
                          id="calltobooker"
                          hidden
                        ></a> */}
                        <a
                          href={`tel:${list.House_owner_mobile}`}
                          id="teltobooker"
                          hidden
                        ></a>
                        <Card.Description>
                          {list.Room_booking_cancel === true ? (
                            <>
                              Room Canceled @<br />
                              <storage style={{ color: "red" }}>
                                {list.Current_time}
                              </storage>
                            </>
                          ) : (
                            <>
                              Room booking @<br />
                              <storage>{list.Current_time}</storage>
                            </>
                          )}

                          <div className="user_underline"></div>
                          <div className="booker_details">
                            <div className="user_card_room_name">
                              Room Name: <p>{list.room_name}</p>
                            </div>
                            <div className="user_card_room_name">
                              Location:{" "}
                              <p id="display_address">
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
                            {list.Room_booking_cancel === true ? (
                              <div className="user_card_room_name">
                                Status:{" "}
                                <p style={{ color: "red" }}>
                                  <Icon name="rupee sign" />
                                  {"Booking Canceled"}/
                                </p>
                              </div>
                            ) : list.To_date <
                              `${new Date().getFullYear()}-${
                                new Date().getMonth() + 1
                              }-${
                                new Date().getDate() <= 9
                                  ? `0${new Date().getDate()}`
                                  : new Date().getDate()
                              }` ? (
                              <div className="user_card_room_name">
                                Status:{" "}
                                <p style={{ color: "orange" }}>
                                  <Icon name="rupee sign" />
                                  {"experied"}/
                                </p>
                              </div>
                            ) : (
                              <div className="user_card_room_name">
                                Status:{" "}
                                <p style={{ color: "green" }}>
                                  <Icon name="rupee sign" />
                                  {"Booking"}/
                                </p>
                              </div>
                            )}
                          </div>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        {owner ? (
                          <div className="call_mail_booker">
                            <Button id="mailltouser" negative>
                              <Icon name="linkedin" /> GMail...
                            </Button>
                            <Button primary id="mailltouser">
                              <Icon name="linkedin" /> Call...
                            </Button>
                          </div>
                        ) : (
                          <div className="booking_cancal_bttn">
                            <Button
                              negative
                              id="user_booking_show_bttn"
                              disabled={list.Room_booking_cancel}
                              onClick={() => Booking_cancel(list)}
                            >
                              <Icon name="home" />
                              Booking Cancel
                            </Button>
                            <Button
                              id="user_booking_show_bttn"
                              primary
                              disabled={list.Room_booking_cancel}
                              onClick={() => Booking_cancel(list)}
                            >
                              <Icon name="mobile alternate" />
                              Contact owner
                            </Button>
                          </div>
                        )}
                      </Card.Content>
                    </Card>
                  );
                })}
              </div>
            </Grid>
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
          </div>
          <div className="All_booker_manu_closs">
            <Button negative size="huge" onClick={() => setall_booker(false)}>
              Close Model
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Owner_see_All_booker;
