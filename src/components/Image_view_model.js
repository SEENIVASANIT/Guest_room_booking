import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import "../components/Image_view_model.css";

const Image_view_model = ({ setImageview, image }) => {
  return (
    <>
      <div className="login_model animate__animated animate__fadeInDown">
        <div className="image_view_con">
          <div className="bag_image">
            {" "}
            <img src={image} alt="Image"></img>
            <div className="close_view_img">
              <div className="round_border" onClick={() => setImageview(false)}>
                <Icon name="close" id="close_view_img_bttn" size="big"></Icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Image_view_model;
