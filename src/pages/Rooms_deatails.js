import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import swal from "sweetalert2";

>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
  deleteDoc,
  doc,
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
  serverTimestamp,
} from "firebase/firestore";
import "../pages/Rooms_deatails.css";
import woman from "../assert/woman.jpg";
import Add_Room from "../components/Add_Room";
const Rooms_deatails = () => {
  const location = useLocation();
  const [rooms, setRooms] = useState([]); //SET DATA
  const [add_house_form_open, setAdd_room_form_open] = useState(false);
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
  const [Update_id, setUpdateId] = useState(false);
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
  ///SET UPDATE ID
  const Update_for_room_datas = (id) => {
    setUpdateId(id);
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
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
          Update_id={Update_id}
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
                    <Button
                      positive
                      color="green"
                      className="city_bttn"
                      onClick={() => Update_for_room_datas(list.id)}
                    >
                      <span>update</span>
                    </Button>
                    <Button
                      negative
                      color="green"
                      onClick={() => delete_Room(list.id)}
                      className="city_bttn"
                    >
                      <span>Delete</span>
                    </Button>
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
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
