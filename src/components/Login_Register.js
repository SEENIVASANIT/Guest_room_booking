import React from "react";
import { useEffect, useState } from "react";

import { Card, Image, Button, Grid } from "semantic-ui-react";
import "../components/Login_Register.css";
import { storage, db } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
const Login_Register = ({
  login_form_open,
  setLogin_form_open,
  login_Type,
}) => {
  const navigate = useNavigate(); //navigate to form page
  const [users, setUsers] = useState([]); //SET DATA
  const [file, setFile] = useState(null); //owner profilr upload to firebase
  const [setimg, setImg] = useState({}); //image url
  const [progress, setProgress] = useState(null);
  const usersCollectionRef = collection(db, "register_login"); //FIREBASE COLLECTION TO GET ALL DATA
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

  //get profile url
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
              // toast('Upload is pause!',{
              //   position: "top-center",
              //   autoClose: 5000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: true,
              //   draggable: true,
              //   progress: undefined,
              //   theme: "colored",
              // })
              //console.log("upload is pause");
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

  //ofter submit
  const handleSubmit = async (e) => {
    //SUBMIT THE ALL DATA

    e.preventDefault(); //AVOIDING PAGE RELOAD
    const get_registerData = new FormData(e.target); //GET DATA FROM FORM
    let Check_mail_status = true;
    await users.map((item) => {
      //CHECK USER EMAIL IS ALREADY USE OR NOT
      if (item.email === get_registerData.get("email")) {
        swal.fire("Oops!", "Email already used", "error");
        Check_mail_status = false;
      }
    });

    if (Check_mail_status) {
      try {
        {
          login_Type
            ? await addDoc(
                collection(db, "register_login"),
                {
                  name: get_registerData.get("name"),
                  email: get_registerData.get("email"),
                  mobile: get_registerData.get("mobile"),
                  pass: get_registerData.get("password"),
                  ...setimg,
                  House_owner: true,
                  timstamp: serverTimestamp(),
                },
                navigate("/HouseOwner", {
                  state: {
                    Send_name: get_registerData.get("name"),
                    Send_email: get_registerData.get("email"),
                    Send_id: null,
                  },
                }),
                // swal.fire("Oops!", "user", "success");

                // emailjs.send(
                //   "service_ywzxyxg",
                //   "template_3huhcy7",
                //   send_mail_for_Blood_Donar,
                //   "dh_ZTI21bagX5IQK7"
                // ),

                swal.fire("Oops!", "register success!", "success")
              )
            : await addDoc(
                collection(db, "register_login"),
                {
                  name: get_registerData.get("name"),
                  email: get_registerData.get("email"),
                  mobile: get_registerData.get("mobile"),
                  pass: get_registerData.get("password"),
                  House_owner: false,
                  timstamp: serverTimestamp(),
                },
                navigate("/Customer", {
                  state: {
                    Send_name: get_registerData.get("name"),
                    Send_email: get_registerData.get("email"),
                    Send_id: null,
                  },
                }),
                // emailjs.send(
                //   "service_ywzxyxg",
                //   "template_3huhcy7",
                //   send_mail_for_Blood_Donar,
                //   "dh_ZTI21bagX5IQK7"
                // ),

                swal.fire("Oops!", "register success!", "success")
              );
        }
      } catch (error) {
        swal.fire("Oops!", `Some network error so tryagain!!!`, "error");
      }
    }
  };

  //HANDLE LOGIN FORM
  const handleLogin = async (e) => {
    //SUBMIT THE ALL DATA
    e.preventDefault();
    const get_House_Owner_loginData = new FormData(e.target);
    let check_mail = true;
    {
      login_Type
        ? users.map((item) => {
            if (
              item.email === get_House_Owner_loginData.get("email") &&
              item.pass === get_House_Owner_loginData.get("password") &&
              item.House_owner === true
            ) {
              check_mail = false;
              swal.fire("Oops!", "House owner", "success");
              navigate("/HouseOwner", {
                state: {
                  Send_name: item.name,
                  Send_email: item.email,
                  Send_id: item.id,
                },
              });
            }
          })
        : users.map((item) => {
            if (
              item.email === get_House_Owner_loginData.get("email") &&
              item.pass === get_House_Owner_loginData.get("password")
            ) {
              check_mail = false;
              swal.fire("Oops!", "user", "success");
              navigate("/Customer", {
                state: {
                  Send_name: item.name,
                  Send_email: item.email,
                  Send_id: item.id,
                },
              });
            }
          });
    }

    if (check_mail) {
      swal.fire("Oops!", "Invalid gmail or password!", "error");
    }
  };
  return (
    <>
      <div className="login_model animate__animated animate__fadeInDown">
        <div className="login_container">
          <button className="">cl</button>
          <input type="checkbox" id="check" />
          <div className="login form">
            <header>
              {login_Type ? (
                <span>House Owners Login</span>
              ) : (
                <span>Counsumer Login</span>
              )}
            </header>
            <form onSubmit={handleLogin} method="POST">
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                required
              />
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                required
              />
              <a href="javascript:">Forgot password?</a>
              <Button id="form_Submit">
                <span>Login</span>
              </Button>
            </form>
            <div className="signup">
              <span className="signup">
                Don't have an account?
                <label for="check">Signup</label>
              </span>
            </div>
          </div>
          <div className="registration form">
            <header>
              {login_Type ? (
                <span>House Owners Signup</span>
              ) : (
                <span>Counsumer Signup</span>
              )}
            </header>

            <form onSubmit={handleSubmit} method="POST">
              <input
                type="text"
                placeholder="Enter your name"
                required
                name="name"
              />
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                required
              />
              <input
                type="tel"
                pattern="^[6-9]\d{9}"
                placeholder="Enter your Mobile No"
                name="mobile"
                maxLength={10}
                required
              />
              <input
                type="password"
                placeholder="create password"
                name="password"
                required
              />
              {login_Type ? (
                <input
                  type="file"
                  placeholder="Chose your image!"
                  name="img"
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                />
              ) : (
                <></>
              )}
              <Button
                id="form_Submit"
                disabled={progress !== null && progress < 100}
              >
                <span>SignUp</span>
              </Button>
            </form>
            <div className="signup">
              <span className="signup">
                Already have an account?
                <label for="check" id="again_login">
                  Login
                </label>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login_Register;
