import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Image, Button, Grid } from "semantic-ui-react";
import "../pages/Landing_pages.css";
import Login_Register from "../components/Login_Register";
const Landing_pages = () => {
  const [login_form_open, setLogin_form_open] = useState(false); //login form model
  const [login_type, setLogin_type] = useState(false); //SET LOGIN TYPE
  const getForm_Type = (type) => {
    setLogin_form_open(true);
    setLogin_type(type);
  };
  return (
    <>
      <Button primary onClick={() => getForm_Type(false)}>
        Counsumer
      </Button>
      {login_form_open && (
        <Login_Register
          login_form_open={login_form_open}
          setLogin_form_open={setLogin_form_open}
          login_Type={login_type}
        />
      )}
      <Button primary onClick={() => getForm_Type(true)}>
        House woner
      </Button>
    </>
  );
};
export default Landing_pages;
