import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../firebase";
import {
  addDoc,
  collection,
<<<<<<< HEAD
  getDocs,
=======
<<<<<<< HEAD
  getDocs,
=======
<<<<<<< HEAD
  getDocs,
=======
  getDoc,
  doc,
  updateDoc,
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
  serverTimestamp,
} from "firebase/firestore";
import {
  Card,
  Image,
  Button,
  Icon,
  Grid,
  Form,
  Input,
  Message,
  TextArea,
} from "semantic-ui-react";
import "../components/Add_Room.css";
import swal from "sweetalert2";
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
const Add_Room = ({ setAdd_room_form_open, house_data }) => {
  const [file, setFile] = useState(null); //upload house image
  const [setimg, setImg] = useState({}); //image url
  const [progress, setProgress] = useState(null);
  const [rooms, setRooms] = useState([]); //SET DATA
  const RoomsCollectionRef = collection(db, "Rooms"); //FIREBASE COLLECTION TO GET ALL DATA
  //page landing to get all datas
  useEffect(() => {
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
    getUsers();
  }, []);
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
const Add_Room = ({ setAdd_room_form_open, house_data, Update_id }) => {
  ///for update
  const initialState = {
    room_name: "",
    floor_size: "",
    beds: "",
    min_day: "",
    max_day: "",
    rend: "",
    other_data: "",
    house_owner_name: "",
    house_owner_mobile: "",
    house_owner_email: "",
    house_address: "",
    img: "",
  };

  const [data, setData] = useState(initialState);
  const {
    room_name,
    floor_size,
    beds,
    max_day,
    min_day,
    rend,
    other_data,
    house_address,
    house_owner_email,
    house_owner_mobile,
    house_owner_name,
    img,
  } = data;
  const [file, setFile] = useState(null); //upload house image
  const [setimg, setImg] = useState({}); //image url
  const [progress, setProgress] = useState(null);
  //page landing to get all datas
  useEffect(() => {
    Update_id && getSingle_Room_data();
  }, [Update_id]);
  const getSingle_Room_data = async () => {
    const docRef = doc(db, "Rooms", Update_id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
  ///SET HOUSE IMAGE
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          /*---------------------------BROGRESS-BAR-------------------------------*/
          if (progress !== null && progress < 100) {
          }
          setProgress(progress);

          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
            default:
              break;
          }
        },
        (errors) => {
          swal.fire("Oops!", "Some network error so tryagain!!!", "error");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //GET IMAGE URL

            setImg((prev) => ({ ...prev, img: downloadURL })); //Upload DATA TO FIRSTORE
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
  //SUBMIT FORM DATA
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
  const Room_deatails_add = async (e) => {
    e.preventDefault(); //AVOIDING PAGE RELOAD
    const get_Submit_form_data = new FormData(e.target); //GET DATA FROM FORM

    try {
      {
        await addDoc(
          collection(db, "Rooms"),
          {
            House_owner_name: get_Submit_form_data.get("house_owner_name"),
            House_owner_mobile: get_Submit_form_data.get("house_owner_mobile"),
            House_owner_email: get_Submit_form_data.get("house_owner_email"),
            house_address: get_Submit_form_data.get("house_address"),
            No_beds: get_Submit_form_data.get("beds"),
            Room_name: get_Submit_form_data.get("room_name"),
            Min_day: get_Submit_form_data.get("min_day"),
            Max_day: get_Submit_form_data.get("max_day"),
            Room_rend: get_Submit_form_data.get("rend"),
            Other_data: get_Submit_form_data.get("other_data"),
            ...setimg,
            Owner_id: house_data.House_owner_id,
            House_id: house_data.id,
            timstamp: serverTimestamp(),
          },

          setAdd_room_form_open(false),
          swal.fire("sUCCESS!!!", "New house add success", "success")
        );
      }
    } catch (error) {
      swal.fire("Oops!", `Some network error so tryagain!!!`, "error");
    }
  };
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
  ///Onchange method
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
  return (
    <>
      <div className="login_model animate__animated animate__fadeInDown">
        <div className="Add_Room_Form_Container">
          <Form size="huge" onSubmit={Room_deatails_add}>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                name="house_owner_name"
                label="House Owner Name"
                value={house_data.House_owner_name}
                readOnly
                placeholder="House Owner Name"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                required={true}
                name="house_owner_mobile"
                label="House Owner Mobile"
                placeholder="House Owner Mobile"
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
                onChange={handleChange}
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
                value={house_data.House_owner_mobile}
              />

              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                name="house_owner_email"
                label="House Owner Gmail"
                value={house_data.House_owner_email}
                placeholder="House Owner Gmail"
                readOnly
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                label="House Name"
                name="house_name"
                value={house_data.house_name}
                readOnly
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                label="House Address"
                name="house_address"
                value={`${house_data.house_address}- ${house_data.house_city}`}
                readOnly
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                required={true}
                type="file"
                label="Upload Room image"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
                value={room_name}
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
                name="room_name"
                required={true}
                label="Room Name"
                placeholder="Enter Room Name"
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
                onChange={handleChange}
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
              />

              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                required={true}
                name="floor_size"
                label="Floor Size"
<<<<<<< HEAD
                placeholder="Enter size of the room"
=======
<<<<<<< HEAD
                placeholder="Enter size of the room"
=======
<<<<<<< HEAD
                placeholder="Enter size of the room"
=======
                onChange={handleChange}
                placeholder="Enter size of the room"
                value={floor_size}
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
              />
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                required={true}
                type="number"
                name="beds"
<<<<<<< HEAD
                label="Nomber of beds"
                placeholder="Enter avaliable beds in the room"
=======
<<<<<<< HEAD
                label="Nomber of beds"
                placeholder="Enter avaliable beds in the room"
=======
<<<<<<< HEAD
                label="Nomber of beds"
                placeholder="Enter avaliable beds in the room"
=======
                onChange={handleChange}
                label="Nomber of beds"
                placeholder="Enter avaliable beds in the room"
                value={beds}
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                required={true}
                type="number"
                name="min_day"
                min="1"
<<<<<<< HEAD
                label="Minimum days"
                placeholder="Enter Minimum days"
=======
<<<<<<< HEAD
                label="Minimum days"
                placeholder="Enter Minimum days"
=======
<<<<<<< HEAD
                label="Minimum days"
                placeholder="Enter Minimum days"
=======
                max="30"
                label="Minimum days"
                placeholder="Enter Minimum days"
                onChange={handleChange}
                value={min_day}
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
              />

              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                required={true}
                name="max_day"
                label="maximum days"
                max="30"
                placeholder="Enter maximum days"
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
                onChange={handleChange}
                value={max_day}
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
              />
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                required={true}
                name="rend"
                label="Rend of the room"
<<<<<<< HEAD
                placeholder="Enter rend of the room per day"
=======
<<<<<<< HEAD
                placeholder="Enter rend of the room per day"
=======
<<<<<<< HEAD
                placeholder="Enter rend of the room per day"
=======
                onChange={handleChange}
                placeholder="Enter rend of the room per day"
                value={rend}
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
              />
            </Form.Group>

            <Form.Field
              id="form-textarea-control-opinion"
              control={TextArea}
              required={true}
              name="other_data"
<<<<<<< HEAD
              label="Amenities in the room"
              placeholder="Enter all Amenities in the room"
=======
<<<<<<< HEAD
              label="Amenities in the room"
              placeholder="Enter all Amenities in the room"
=======
<<<<<<< HEAD
              label="Amenities in the room"
              placeholder="Enter all Amenities in the room"
=======
              onChange={handleChange}
              label="Amenities in the room"
              placeholder="Enter all Amenities in the room"
              value={other_data}
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
            />

            <div style={{ width: "100%" }}>
              <Button
                primary
                size="huge"
                type="submit"
                disabled={progress !== null && progress < 100}
              >
                <Icon name="home" /> Add House
              </Button>
              <Button
                negative
                size="huge"
                onClick={() => setAdd_room_form_open(false)}
              >
                <Icon name="home" /> Add House
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Add_Room;
