/* eslint-disable no-lone-blocks */
import React from "react";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../firebase";
import {
  addDoc,
  collection,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {

  Button,
  Icon,

  Form,
  Input,
  TextArea,
} from "semantic-ui-react";
import "../components/Add_Room.css";
import swal from "sweetalert2";
const Add_Room = ({
  setAdd_room_form_open,
  house_data,
  Update_id,
  getUsers,
}) => {
  const [file, setFile] = useState(null); //upload house image
  const [setimg, setImg] = useState({}); //image url
  const [progress, setProgress] = useState(null);

  ///for update
  const initialState = {
    room_name: "",
    floor_size: "",
    beds: "",
    min_day: "",
    max_day: "",
    rend: "",
    cancelation_charge: "",
    bathrooms: "",
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
    bathrooms,
    min_day,
    rend,
    other_data,
    cancelation_charge,
    house_address,
    house_owner_email,
    house_owner_mobile,
    house_owner_name,
    img,
  } = data;

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
  console.log(data);
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
            Update_id
              ? setData((prev) => ({ ...prev, img: downloadURL }))
              : setImg((prev) => ({ ...prev, img: downloadURL })); //Upload DATA TO FIRSTORE
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  //SUBMIT FORM DATA
  const Room_deatails_add = async (e) => {
    e.preventDefault(); //AVOIDING PAGE RELOAD
    const get_Submit_form_data = new FormData(e.target); //GET DATA FROM FORM
    if (!Update_id) {
      try {
        {
          await addDoc(
            collection(db, "Rooms"),
            {
              House_owner_name: get_Submit_form_data.get("house_owner_name"),
              House_owner_mobile:
                get_Submit_form_data.get("house_owner_mobile"),
              House_owner_email: get_Submit_form_data.get("house_owner_email"),
              house_address: get_Submit_form_data.get("house_address"),
              beds: Number(get_Submit_form_data.get("beds")),
              cancelation_charge: Number(
                get_Submit_form_data.get("cancelation_charge")
              ),
              room_name: get_Submit_form_data.get("room_name"),
              bathrooms: get_Submit_form_data.get("bathrooms"),
              min_day: Number(get_Submit_form_data.get("min_day")),
              max_day: Number(get_Submit_form_data.get("max_day")),
              rend: Number(get_Submit_form_data.get("rend")),
              floor_size: get_Submit_form_data.get("floor_size"),
              other_data: get_Submit_form_data.get("other_data"),
              ...setimg,
              Owner_id: house_data.House_owner_id,
              House_id: house_data.id,

              timstamp: serverTimestamp(),
            },
            getUsers(),
            setAdd_room_form_open(false),
            swal.fire("Add new room", "New room added successfull", "success")
          );
        }
      } catch (error) {
        swal.fire("Oops!", `Some network error so tryagain!!!`, "error");
      }
    } else {
      try {
        //*UPDATE THE DATA IN FIREBASE*//

        await updateDoc(
          doc(db, "Rooms", Update_id),
          {
            ...data,

            timstamp: serverTimestamp(),
          },
          getUsers(),
          setAdd_room_form_open(false),
          swal.fire("Update", "Update successfull", "success")
        );
      } catch (error) {
        swal.fire("Oops!", `Some network error so tryagain!!!`, "error");
      }
    }
  };

  ///Onchange method
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
                placeholder="Enter your mobile number"
                onChange={handleChange}
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
              {Update_id ? (
                <Form.Field
                  id="form-input-control-last-name"
                  control={Input}
                  type="file"
                  label="Replace Image"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              ) : (
                <Form.Field
                  id="form-input-control-last-name"
                  control={Input}
                  required={true}
                  type="file"
                  label="Upload Room image"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              )}
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                value={room_name}
                name="room_name"
                required={true}
                label="Room Name"
                placeholder="Enter Room Name"
                onChange={handleChange}
              />

              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                required={true}
                name="floor_size"
                label="Floor Size"
                onChange={handleChange}
                placeholder="Enter room size in sqm"
                value={floor_size}
              />
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                required={true}
                type="number"
                name="beds"
                onChange={handleChange}
                label="Number of beds"
                placeholder="Enter avaliable beds in the room"
                value={beds}
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                required={true}
                type="number"
                name="bathrooms"
                label="Number of bathrooms"
                placeholder="Enter the nunber of bathrooms"
                onChange={handleChange}
                value={bathrooms}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                required={true}
                name="min_day"
                label="Minimum days"
                type="number"
                max="29"
                placeholder="Enter the mimimum days of stay "
                onChange={handleChange}
                value={min_day}
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                required={true}
                type="number"
                name="max_day"
                label="Maximum days"
                max="30"
                placeholder="Enter the maximun days"
                onChange={handleChange}
                value={max_day}
              />
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                required={true}
                name="rend"
                type="number"
                label="Per day rent"
                onChange={handleChange}
                placeholder="Enter the rent of the room"
                value={rend}
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                label="Cancellation charge in %"
                placeholder="'0' for no cancellation charge"
                name="cancelation_charge"
                value={cancelation_charge}
                onChange={handleChange}
                type="number"
                required={true}
              />
            </Form.Group>

            <Form.Field
              id="form-textarea-control-opinion"
              control={TextArea}
              required={true}
              name="other_data"
              onChange={handleChange}
              label="Amenities in the room"
              placeholder="Enter all Amenities in the room"
              value={other_data}
            />

            <div style={{ width: "100%" }}>
              {Update_id ? (
                <Button
                  positive
                  size="huge"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  <Icon name="edit" /> Update
                </Button>
              ) : (
                <Button
                  primary
                  size="huge"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  <Icon name="home" /> Add Room
                </Button>
              )}

              <Button
                negative
                size="huge"
                onClick={() => setAdd_room_form_open(false)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Add_Room;
