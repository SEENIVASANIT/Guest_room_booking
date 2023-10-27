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
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import "../components/Owner_see_All_booker.css";
const Owner_see_All_booker = ({ setall_booker, bookers_data }) => {
  const BookerCollectionRef = query(collection(db, "Book_Rooms"));
  const [Booker, setBooker] = useState([]); //SET DATA
  useEffect(() => {
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

    getUsers();
  }, []);
  return (
    <>
      <div className="login_model animate__animated animate__fadeInDown">
        <div className="all_booker_con">
          <div className="con_for_booker">
            <Grid columns="equal" divided>
              {/* {no_booker_data ? (
              <div className="no_booker">
                <div className="no_data_img">
                  <img src={no_room_book} alt="Nodata"></img>
                </div>
                <h1>No data iten add yed</h1>
              </div>
            ) : (
              <></>
            )} */}
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
                })}
              </div>
            </Grid>
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
