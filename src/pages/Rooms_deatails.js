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
} from "semantic-ui-react";
import { storage, db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import "../pages/Rooms_deatails.css";
import woman from "../assert/woman.jpg";
import Add_Room from "../components/Add_Room";
const Rooms_deatails = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState([]); //SET DATA
  const [add_house_form_open, setAdd_room_form_open] = useState(false);

  const RoomsCollectionRef = collection(db, "Rooms"); //FIREBASE COLLECTION TO GET ALL DATA
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
  return (
    <>
      <div className="main_cantainer_for_hous_div">
        <div className="house_deatail_cantainer">
          <div className="house_data_con">
            <div className="hos_data_in_con">
              <img src={woman} alt={"dadad"} />
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
        <Button primary size="big" onClick={() => setAdd_room_form_open(true)}>
          <Icon name="home" /> Add new room
        </Button>
      </div>
      <div className="bellow_unterline"></div>
      {add_house_form_open && (
        <Add_Room
          setAdd_room_form_open={setAdd_room_form_open}
          house_data={location.state.House_data}
        />
      )}
      <h1>Rooms</h1>
      <Grid columns="equal" id="Distric" divided>
        <div className="city_card">
          {rooms.map((list) => {
            if (list.Owner_id === location.state.House_data.House_owner_id)
              return (
                <Card color="grey" className="card_bar">
                  <Image src={list.img} className="room_img" />
                  <Card.Content>
                    <Card.Header>{"senivasan"}</Card.Header>
                    <Card.Description>Select Your District.</Card.Description>
                    <Button inverted color="green" className="city_bttn">
                      <span>Select</span>
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
export default Rooms_deatails;
