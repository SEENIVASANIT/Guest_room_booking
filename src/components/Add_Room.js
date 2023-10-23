import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
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
                name="room_name"
                required={true}
                label="Room Name"
                placeholder="Enter Room Name"
              />

              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                required={true}
                name="floor_size"
                label="Floor Size"
                placeholder="Enter size of the room"
              />
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                required={true}
                type="number"
                name="beds"
                label="Nomber of beds"
                placeholder="Enter avaliable beds in the room"
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
                label="Minimum days"
                placeholder="Enter Minimum days"
              />

              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                required={true}
                name="max_day"
                label="maximum days"
                max="30"
                placeholder="Enter maximum days"
              />
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                required={true}
                name="rend"
                label="Rend of the room"
                placeholder="Enter rend of the room per day"
              />
            </Form.Group>

            <Form.Field
              id="form-textarea-control-opinion"
              control={TextArea}
              required={true}
              name="other_data"
              label="Amenities in the room"
              placeholder="Enter all Amenities in the room"
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
