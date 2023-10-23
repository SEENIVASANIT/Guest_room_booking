import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Image, Button, Grid } from "semantic-ui-react";
import "../Customers/Customers_main_page.css";
import swal from "sweetalert2";
import { storage, db } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const Customers_main_page = () => {
  const location = useLocation(); //GET ALL DATA
  const navigate = useNavigate(); //navigate to VIEW ROOMS
  const get_name = location.state.Send_name; //GET DATA FROM LOGIN PAGE
  const get_email = location.state.Send_email; //GET DATA FROM LOGIN PAGE
  const [users, setUsers] = useState([]); //SET DATA
  const [house, setHouse] = useState([]); //SET DATA
  ////SET DATA FOR LOGIN USER
  const [single_user_name, setSingle_user_name] = useState("");
  const [single_user_email, setSingle_user_email] = useState("");
  const [single_user_mobile, setSingle_user_mobile] = useState("");
  const [single_user_id, setSingle_user_id] = useState("");
  const [load_one_time, setLoad_one_time] = useState(true);
  /////////////////////////////////////////////////

  const usersCollectionRef = collection(db, "register_login");
  const HouseCollectionRef = collection(db, "Houses"); //FIREBASE COLLECTION TO GET ALL DATA
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
    getUsers();
    getHouse();
  }, []);
  //SET ALL HOUSE FOR USER
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

  return (
    <>
      {load_one_time &&
        users.map((item) => {
          if (item.email === get_email) {
            setSingle_user_email(item.email);
            setSingle_user_name(item.name);
            setSingle_user_mobile(item.mobile);
            setSingle_user_id(item.id);
            setLoad_one_time(false);
          }
        })}
      <h1>All House</h1>
      <Grid columns="equal" id="Distric" divided>
        <div className="city_card">
          {house.map((list) => {
            return (
              <Card color="grey" className="card_bar">
                <Image src={list.img} className="room_img" />
                <Card.Content>
                  <Card.Header>{list.houe_name}</Card.Header>
                  <Card.Description>{`Location: ${list.house_city}`}</Card.Description>
                  <Card.Description>{`Avaliable Room: ${list.total_room}`}</Card.Description>
                  <Button
                    inverted
                    color="green"
                    className="city_bttn"
                    onClick={() =>
                      navigate("/View_rooms", {
                        state: {
                          House_data: list,
                        },
                      })
                    }
                  >
                    <span>View Rooms</span>
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
export default Customers_main_page;
