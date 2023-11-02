import React from "react";
import { useEffect, useState } from "react";
import swal from "sweetalert2";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Icon,
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
  const [setdistric_lis, setDistric_list] = useState([]);
  const [file, setFile] = useState(null); //upload house image
  const [setimg, setImg] = useState({}); //image url
  const [progress, setProgress] = useState(null);

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

  //page landing to get all datas
  useEffect(() => {
    update_id && getSingle_House_data();
    if(update_id){
      setCityName(data.house_city)
    }
  }, [update_id]);
  const getSingle_House_data = async () => {
    const docRef = doc(db, "Houses", update_id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  /////Call API FOR SCLECT CITY

  useEffect(() => {
    fetch(`https://sheetdb.io/api/v1/w65xc545pbsn3`)
      .then((response) => response.json())
      .then((data) => setDistric_list(data))
      .catch((err) =>
        swal.fire("Oops!", "Some network error so try again!!!", "error")
      );
  }, []);
  ///get select input data
 
  const get_city_name = async (e, { value }) => {
    
    setData((prev) => ({ ...prev, house_city: value }));
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
            update_id
              ? setData((prev) => ({ ...prev, img: downloadURL }))
              : setImg((prev) => ({ ...prev, img: downloadURL })); //Upload DATA TO FIRSTORE
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
            swal.fire("Added!!!", "New house add successfully", "success")
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

            timstamp: serverTimestamp(),
          },
          getHouse(),
          setAdd_house_form_open(false),
          swal.fire("Updated!!!", "Details updated successfully", "success")
        );
      } catch (error) {
        swal.fire("Oops!", `Some network error so tryagain!!!`, "error");
      }
    }
  };

  ///API FOR SELECT CITY
  const friend_District = setdistric_lis.map((list, index) => ({
    key: index,
    text: `${list.d_name}`,
    value: `${list.d_name}`,
  }));
  ///Onchange method
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="login_model animate__animated animate__fadeInDown">
        <div className="addHouse_form_container">
          <Form onSubmit={House_deatails_add} size="huge">
            <Form.Group widths="equal">
              <Form.Field
                className="input_placeholder_design"
                control={Input}
                required={true}
                name="house_name"
                value={house_name}
                label="House name"
                onChange={handleChange}
                placeholder="Enter your house name"
              />
              <Form.Field
                id="form-input-control-dorNo-name"
                control={Input}
                required={true}
                label="Door number"
                name="house_no"
                placeholder="Enter your house door number"
                value={house_no}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                className="input_placeholder_design"
                control={Input}
                required={true}
                label="Total Rooms"
                type="number"
                value={total_room}
                name="total_room"
                onChange={handleChange}
                placeholder="How many rooms are available in your house"
              />
              {update_id ? (
                <Form.Field
                  id="form-input-control-last-name"
                  control={Input}
                  label="Replace image"
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  placeholder="Your house door number"
                />
              ) : (
                <Form.Field
                  id="form-input-control-last-name"
                  control={Input}
                  required={true}
                  label="Upload your house image"
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  placeholder="Your house door number"
                />
              )}
            </Form.Group>

            <Form.Field
              className="input_placeholder_design"
              control={Select}
              value={house_city}
              options={friend_District}
              required={true}
              label={{
                children: "Select City",
                htmlFor: "form-select-control-gender",
              }}
              placeholder="Enter the city where your house located"
              search
              searchInput={{ id: "form-select-control-gender" }}
              onChange={get_city_name}
            />
            <Form.Field
              className="input_placeholder_design"
              control={TextArea}
              value={house_address}
              onChange={handleChange}
              required={true}
              label="House Address"
              placeholder="Enter your house address"
              name="house_address"
            />

            <Form.Group>
              <div style={{ width: "100%" }}>
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

                <Button
                  negative
                  size="huge"
                  onClick={() => setAdd_house_form_open(false)}
                >
                  Cancel
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
