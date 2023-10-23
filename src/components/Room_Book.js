import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Image,
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
const Room_Book = () => {
  return (
    <>
      <div className="login_model animate__animated animate__fadeInDown">
        <div className="Add_Room_Form_Container">
          <Form size="big">
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="First name"
                placeholder="First name"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                label="Last name"
                placeholder="Last name"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                label="Last name"
                placeholder="Last name"
              />
            </Form.Group>
            <div className="bellow_unterline_book_room"></div>
            <h4>Check Avaliable</h4>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="First name"
                placeholder="First name"
              />
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="First name"
                placeholder="First name"
              />
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="First name"
                placeholder="First name"
                error="Please enter your last name"
                fluid
              />
            </Form.Group>
            <div className="bellow_unterline_book_room"></div>
            <h4>Room Booked Date</h4>
            <div className="Booking_date_container">
              <Menu compact>
                <Menu.Item as="a">
                  <Label color="green" ribbon>
                    Start
                  </Label>
                  26-07-6009
                </Menu.Item>
                <Menu.Item as="a">
                  <Label color="red" ribbon>
                    End
                  </Label>
                  26-07-2002
                </Menu.Item>
              </Menu>
            </div>
            <div
              style={{ width: "100%", marginTop: "3vh", marginBottom: "-1vh" }}
            >
              <Button primary size="huge" type="submit">
                <Icon name="home" /> Add House
              </Button>
              <Button negative size="huge">
                <Icon name="home" /> Add House
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Room_Book;
