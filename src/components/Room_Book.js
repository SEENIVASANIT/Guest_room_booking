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
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import "../components/Room_Book.css";
const Room_Book = ({
  setBook_room_form_open,
  room_data,
  single_user_name,
  single_user_email,
  single_user_mobile,
  single_user_id,
}) => {
  //ONcHANGE TO SET VALUE
  const initialState = {
    booking_days: "",
    From_date: "",
  };
  const [data, setData] = useState(initialState);
  ///////////////////////
  let today = new Date(); //DATE OBJ
  const [booking_rooms, setBooking_room] = useState([]); //SET DATA
  const [check_Booking_days, setCheck_Booking_days] = useState([]); //SET DATA
  var Date_avalible_for_booking = true;
  const Book_RoomsCollectionRef = collection(db, "Book_Rooms"); //FIREBASE COLLECTION TO GET ALL DATA
  //page landing to get all datas
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(Book_RoomsCollectionRef);
      setBooking_room(
        data.docs.map((doc) => ({
          //OFTER CHECKING SET THA ALL DATA.
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, []);

  //SUBMIT FUNCTION
  const handleSubmit_bookRoom = async (e) => {
    e.preventDefault(); //AVOIDING PAGE RELOAD
    const get_Submit_form_data = new FormData(e.target); //GET DATA FROM FORM
    const EndDate = new Date(get_Submit_form_data.get("From_date"));
    EndDate.setDate(
      EndDate.getDate() + Number(get_Submit_form_data.get("booking_days") - 1)
    );
    try {
      {
        await addDoc(
          collection(db, "Book_Rooms"),
          {
            Room_booker_name: get_Submit_form_data.get("booker_name"),
            Room_booker_mobile: get_Submit_form_data.get("booker_mobile"),
            Room_booker_email: get_Submit_form_data.get("booker_email"),
            Room_booker_id: single_user_id,
            Booking_days: Number(get_Submit_form_data.get("booking_days")),
            From_date: get_Submit_form_data.get("From_date"),
            To_date: `${EndDate.getFullYear()}-${
              EndDate.getMonth() + 1
            }-${EndDate.getDate()}`,
            House_owner_id: room_data.Owner_id,
            House_owner_name: room_data.House_owner_name,
            House_owner_email: room_data.House_owner_email,
            House_owner_mobile: room_data.House_owner_mobile,
            House_id: room_data.id,
            Room_img: room_data.img,
            room_name: room_data.room_name,
            house_address: room_data.house_address,
            Current_time: String(new Date()),
            Total_rend:
              room_data.rend * Number(get_Submit_form_data.get("booking_days")),
            timstamp: serverTimestamp(),
          },
          //setAdd_room_form_open(false),
          swal.fire("sUCCESS!!!", "New house add success", "success")
        );
      }
    } catch (error) {
      swal.fire("Oops!", `Some network error so tryagain!!!`, "error");
    }
  };
  useEffect(() => {
    setTimeout(
      () =>
        setCheck_Booking_days(
          booking_rooms.filter((id) => id.House_id == room_data.id)
        ),
      1000
    );
  }, [booking_rooms]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  ////////////WRITE LOGIC FOR BOOK ROOM DATE
  if (data.booking_days && data.From_date) {
    const EndDate = new Date(data.From_date);
    EndDate.setDate(EndDate.getDate() + (Number(data.booking_days) - 1));

    const To_date = `${EndDate.getFullYear()}-${EndDate.getMonth() + 1}-${
      EndDate.getDate() <= 9 ? `0${EndDate.getDate()}` : EndDate.getDate()
    }`;

    const length_of_booking = check_Booking_days.length;
    let Avaliable_Room = true;

    Date_avalible_for_booking = check_Booking_days.some((element) => {
      return (
        (data.From_date >= element.From_date &&
          data.From_date <= element.To_date) ||
        (To_date >= element.From_date && To_date <= element.To_date)
      );
    });
  }
  console.log(room_data.min_day);
  console.log(room_data.max_day);
  return (
    <>
      <div className="login_model animate__animated animate__fadeInDown">
        <div className="Add_Room_Form_Container">
          <Form onSubmit={handleSubmit_bookRoom}>
            <Form.Group widths="equal">
              <Form.Field
                className="input_placeholder_design"
                control={Input}
                label="name"
                name="booker_name"
                placeholder="First name"
                readOnly
                value={single_user_name}
              />
              <Form.Field
                className="input_placeholder_design"
                control={Input}
                label="gmail"
                placeholder="gmail"
                name="booker_email"
                value={single_user_email}
                readOnly
              />
              <Form.Field
                className="input_placeholder_design"
                control={Input}
                label="mobile"
                placeholder="Mobile"
                name="booker_mobile"
                value={single_user_mobile}
                readOnly
              />
            </Form.Group>
            <div className="bellow_unterline_book_room"></div>
            <h4>Check Avaliable</h4>
            <Form.Group widths="equal">
              <Form.Field
                className="input_placeholder_design"
                control={Input}
                required={true}
                type="number"
                onChange={handleChange}
                min={room_data.min_day}
                max={room_data.max_day}
                name="booking_days"
                label="how many day you live"
                placeholder="dayy"
              />
              <Form.Field
                className="input_placeholder_design"
                control={Input}
                label="Start date"
                name="From_date"
                onChange={handleChange}
                min={`${today.getFullYear()}-${
                  today.getMonth() + 1
                }-${today.getDate()}`}
                type="date"
                required={true}
                placeholder="date"
              />
            </Form.Group>
            {data.From_date == "" || data.booking_days == "" ? (
              <Message info>
                <div>
                  <h4>Date not avalible</h4>
                </div>
                <h5>chose onather date</h5>
              </Message>
            ) : (
              <></>
            )}
            {!Date_avalible_for_booking &&
            data.From_date != "" &&
            data.booking_days != "" ? (
              <Message positive>
                <div>
                  <h4>Success</h4>
                </div>
                <h5>
                  RoomRend per day{`${room_data.rend}`} your chose{" "}
                  {`${data.booking_days} X ${room_data.rend}= ${
                    data.booking_days * room_data.rend
                  }`}
                </h5>
              </Message>
            ) : (
              <></>
            )}
            {Date_avalible_for_booking &&
            data.From_date != "" &&
            data.booking_days != "" ? (
              <Message negative>
                <div>
                  <h4>Not Avaliable</h4>
                </div>
                <h5>try onather date</h5>
              </Message>
            ) : (
              <></>
            )}
            <div className="bellow_unterline_book_room"></div>
            <h4>Room Booked Date</h4>
            <div className="Booking_date_container">
              {booking_rooms.map((list) => {
                if (list.House_id === room_data.id) {
                  return (
                    <Menu compact>
                      <Menu.Item as="a">
                        <Label color="green" ribbon>
                          Start
                        </Label>
                        {list.From_date}
                      </Menu.Item>
                      <Menu.Item as="a">
                        <Label color="red" ribbon>
                          End
                        </Label>
                        {list.To_date}
                      </Menu.Item>
                    </Menu>
                  );
                }
              })}
            </div>
            <div
              style={{ width: "100%", marginTop: "3vh", marginBottom: "-1vh" }}
            >
              <Button
                primary
                size="huge"
                type="submit"
                disabled={Date_avalible_for_booking}
              >
                <Icon name="home" /> Add House
              </Button>
              <Button
                negative
                size="huge"
                onClick={() => setBook_room_form_open(false)}
              >
                <Icon name="home" /> close
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Room_Book;
