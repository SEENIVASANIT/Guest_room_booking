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
  const [house, setHouse] = useState([]); //SET DATA
  const [add_house_form_open, setAdd_house_form_open] = useState(false); //Add house form model
  //SET SINGLE USER DATAS
  const [single_user_name, setSingle_user_name] = useState("");
  const [single_user_email, setSingle_user_email] = useState("");
  const [single_user_mobile, setSingle_user_mobile] = useState("");
  const [single_user_id, setSingle_user_id] = useState("");
  const [single_user_img, setSingle_user_img] = useState("");
  const [load_one_time, setLoad_one_time] = useState(true);
  /////////////////////////////////////////////////
  const usersCollectionRef = collection(db, "register_login"); //FIREBASE COLLECTION TO GET ALL DATA
  const HouseCollectionRef = collection(db, "Houses"); //FIREBASE COLLECTION TO GET ALL DATA
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
      <header>
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

          {add_house_form_open && (
            <Add_new_house
              setAdd_house_form_open={setAdd_house_form_open}
              single_user_name={single_user_name}
              single_user_email={single_user_email}
              single_user_mobile={single_user_mobile}
              single_user_id={single_user_id}
              single_user_img={single_user_img}
              getHouse={getHouse}
            />
          )}
          <Button
            primary
            size="huge"
            onClick={() => setAdd_house_form_open(true)}
          >
            <Icon name="home" /> Add House
          </Button>
        </nav>
      </header>

      <div className="house_deatails">
        <div className="house_deatails_child">
          <h2>Your houses</h2>
        </div>
        <Grid columns="equal" divided>
          <div className="donator_card">
            {house.map((list) => {
              if (list.House_owner_email == get_email) {
                return (
                  <Card color="grey" className="card_bar">
                    <Image src={woman} className="home_img" />
                    <Card.Content>
                      <Card.Header>{list.house_name}</Card.Header>
                      <Card.Description>{`Location : ${list.house_city}`}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button
                        inverted
                        primary
                        color="green"
                        className="house_deatails_show_button"
                        onClick={() =>
                          navigate("/Rooms", {
                            state: {
                              House_data: list,
                            },
                          })
                        }
                      >
                        <span>Deatails</span>
                      </Button>
                      <div className="ui two buttons">
                        <Button inverted className="city_bttn1" color="green">
                          <span>Update</span>
                        </Button>
                        <Button
                          inverted
                          className="city_bttn1"
                          color="red"
                          onClick={() => delete_House(list.id)}
                        >
                          <span>Delete</span>
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
      <div></div>
    </>
  );
};
export default House_owner_main_page;
