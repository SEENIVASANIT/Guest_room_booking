import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
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
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Icon,
  Message,
} from "semantic-ui-react";
import "../components/Add_new_house.css";
const Add_new_house = ({
  setAdd_house_form_open,
  single_user_name,
  single_user_email,
  single_user_mobile,
  single_user_id,
  single_user_img,
  getHouse,
<<<<<<< HEAD
}) => {
=======
<<<<<<< HEAD
}) => {
=======
<<<<<<< HEAD
}) => {
=======
  update_id,
}) => {
  const initialState = {
    house_address: "",
    total_room: "",
    house_no: "",
    house_name: "",
    house_city: "",
    img: "",
  };

  const [data, setData] = useState(initialState);
  const { house_address, total_room, house_name, house_no, house_city, img } =
    data;
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
  const [setdistric_lis, setDistric_list] = useState([]);
  const [file, setFile] = useState(null); //upload house image
  const [setimg, setImg] = useState({}); //image url
  const [progress, setProgress] = useState(null);
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
  const [users, setUsers] = useState([]); //SET DATA
  const [getCityname, setCityName] = useState("");
  const usersCollectionRef = collection(db, "Houses"); //FIREBASE COLLECTION TO GET ALL DATA
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
    getUsers();
  }, []);

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
  const [getCityname, setCityName] = useState("");
  //page landing to get all datas
  useEffect(() => {
    update_id && getSingle_House_data();
  }, [update_id]);
  const getSingle_House_data = async () => {
    const docRef = doc(db, "Houses", update_id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  /////Call API FOR SCLECT CITY
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
  useEffect(() => {
    fetch(`https://sheetdb.io/api/v1/31wbs450fjjw9`)
      .then((response) => response.json())
      .then((data) => setDistric_list(data))
      .catch((err) =>
        swal.fire("Oops!", "Some network error so try again!!!", "error")
      );
  }, []);
  ///get select input data
  const get_city_name = async (e, { value }) => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
    if (update_id) {
      setData((prev) => ({ ...prev, house_city: value }));
    }
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
    setCityName(value);
  };
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
<<<<<<< HEAD

            setImg((prev) => ({ ...prev, img: downloadURL })); //Upload DATA TO FIRSTORE
=======
<<<<<<< HEAD

            setImg((prev) => ({ ...prev, img: downloadURL })); //Upload DATA TO FIRSTORE
=======
<<<<<<< HEAD

            setImg((prev) => ({ ...prev, img: downloadURL })); //Upload DATA TO FIRSTORE
=======
            update_id
              ? setData((prev) => ({ ...prev, img: downloadURL }))
              : setImg((prev) => ({ ...prev, img: downloadURL })); //Upload DATA TO FIRSTORE
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  //HANDLE SUMBIT FOR ADD HOUSE
  const House_deatails_add = async (e) => {
    e.preventDefault(); //AVOIDING PAGE RELOAD
    const get_Submit_form_data = new FormData(e.target); //GET DATA FROM FORM
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)

    try {
      {
        await addDoc(
          collection(db, "Houses"),
          {
            house_address: get_Submit_form_data.get("house_address"),
            house_city: getCityname,
            total_room: get_Submit_form_data.get("total_room"),
            house_no: get_Submit_form_data.get("house_no"),
            house_name: get_Submit_form_data.get("house_name"),
            ...setimg,
            House_owner_name: single_user_name,
            House_owner_email: single_user_email,
            House_owner_mobile: single_user_mobile,
            House_owner_profile: single_user_img,
            House_owner_id: single_user_id,
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
    if (!update_id) {
      try {
        {
          await addDoc(
            collection(db, "Houses"),
            {
              house_address: get_Submit_form_data.get("house_address"),
              house_city: getCityname,
              total_room: get_Submit_form_data.get("total_room"),
              house_no: get_Submit_form_data.get("house_no"),
              house_name: get_Submit_form_data.get("house_name"),
              ...setimg,
              House_owner_name: single_user_name,
              House_owner_email: single_user_email,
              House_owner_mobile: single_user_mobile,
              House_owner_profile: single_user_img,
              House_owner_id: single_user_id,
              timstamp: serverTimestamp(),
            },
            getHouse(),
            setAdd_house_form_open(false),
            swal.fire("SUCCESS!!!", "New house add success", "success")
          );
        }
      } catch (error) {
        swal.fire("Oops!", `Some network error so tryagain!!!`, "error");
      }
    } else {
      try {
        //*UPDATE THE DATA IN FIREBASE*//

        await updateDoc(
          doc(db, "Houses", update_id),
          {
            ...data,

>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
            timstamp: serverTimestamp(),
          },
          getHouse(),
          setAdd_house_form_open(false),
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
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
=======
          swal.fire("SUCCESS!!!", "Update success", "success")
        );
      } catch (error) {
        swal.fire("Oops!", "Some network error so tryagain!!!", "error");
      }
    }
  };
  ///API FOR SELECT CITY
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
  const friend_District = setdistric_lis.map((list, index) => ({
    key: index,
    text: `${list.d_name}`,
    value: `${list.d_name}`,
  }));
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
        <div className="addHouse_form_container">
          <Form onSubmit={House_deatails_add} size="huge">
            <Form.Group widths="equal">
              <Form.Field
<<<<<<< HEAD
                id="form-input-control-house-name"
=======
<<<<<<< HEAD
                id="form-input-control-house-name"
=======
<<<<<<< HEAD
                id="form-input-control-house-name"
=======
                className="input_placeholder_design"
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
                control={Input}
                required={true}
                name="house_name"
                label="House name"
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
                placeholder="Your house name"
              />
              <Form.Field
                id="form-input-control-dorNo-name"
                control={Input}
                required={true}
                label="Dour Number"
                name="house_no"
                placeholder="Your house dour number"
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
                value={house_name}
                onChange={handleChange}
                placeholder="Your house name"
              />
              <Form.Field
                className="input_placeholder_design"
                control={Input}
                required={true}
                value={house_no}
                label="Dour Number"
                name="house_no"
                placeholder="Your house dour number"
                onChange={handleChange}
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
<<<<<<< HEAD
                id="form-input-control-Rooms"
=======
<<<<<<< HEAD
                id="form-input-control-Rooms"
=======
<<<<<<< HEAD
                id="form-input-control-Rooms"
=======
                className="input_placeholder_design"
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
                control={Input}
                required={true}
                label="Total Room"
                type="number"
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
                name="total_room"
                placeholder="How many room avalible"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                required={true}
                label="Upload your house image"
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                placeholder="Your house dour number"
              />
            </Form.Group>

            <Form.Field
              control={Select}
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
                value={total_room}
                onChange={handleChange}
                name="total_room"
                placeholder="How many room avalible"
              />
              {update_id ? (
                <Form.Field
                  className="input_placeholder_design"
                  control={Input}
                  name="img"
                  label="Update image chose"
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  placeholder="Your house dour number"
                />
              ) : (
                <Form.Field
                  className="input_placeholder_design"
                  control={Input}
                  required={true}
                  name="img"
                  label="Upload your house image"
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  placeholder="Your house dour number"
                />
              )}
            </Form.Group>

            <Form.Field
              className="input_placeholder_design"
              control={Select}
              value={house_city}
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
              options={friend_District}
              required={true}
              label={{
                children: "Select City",
                htmlFor: "form-select-control-gender",
              }}
              placeholder="Select your house city"
              search
              searchInput={{ id: "form-select-control-gender" }}
              onChange={get_city_name}
            />
            <Form.Field
<<<<<<< HEAD
              id="form-textarea-control-opinion"
              control={TextArea}
=======
<<<<<<< HEAD
              id="form-textarea-control-opinion"
              control={TextArea}
=======
<<<<<<< HEAD
              id="form-textarea-control-opinion"
              control={TextArea}
=======
              className="input_placeholder_design"
              control={TextArea}
              value={house_address}
              onChange={handleChange}
>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
              required={true}
              label="House Address"
              placeholder="Enter your house address"
              name="house_address"
            />

            <Form.Group>
              <div style={{ width: "100%" }}>
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
                <Button
                  primary
                  size="huge"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  <Icon name="home" /> Add House
                </Button>
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
                {update_id ? (
                  <Button
                    positive
                    size="huge"
                    type="submit"
                    disabled={progress !== null && progress < 100}
                  >
                    <Icon name="home" /> Update
                  </Button>
                ) : (
                  <Button
                    primary
                    size="huge"
                    type="submit"
                    disabled={progress !== null && progress < 100}
                  >
                    <Icon name="home" /> Add House
                  </Button>
                )}

>>>>>>> 8485769 (Complete user book room function and work some small change)
>>>>>>> 732563c (Complete user book room function and work some small change)
>>>>>>> ab51e5e (Complete user book room function and work some small change)
                <Button
                  negative
                  size="huge"
                  onClick={() => setAdd_house_form_open(false)}
                >
                  Add House
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Add_new_house;
