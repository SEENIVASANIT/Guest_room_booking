import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  Image,
  Button,
  Grid,
  Feed,
  Form,
  Icon,
  Input,
  Label,
} from "semantic-ui-react";
import { storage, db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import "../Customers/View_Rooms.css";
import Room_Book from "../components/Room_Book";
const View_Rooms = () => {
  const location = useLocation(); //GET DATA TO HOUSE SHOW PAGE
  const [rooms, setRooms] = useState([]); //SET DATA

  const [room_data, setRoom_data] = useState([]); //SET DATA

  const RoomsCollectionRef = collection(db, "Rooms"); //FIREBASE COLLECTION TO GET ALL DATA
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
      <Grid columns="equal" id="Distric" divided>
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
      </Grid>
    </>
  );
};
export default View_Rooms;
