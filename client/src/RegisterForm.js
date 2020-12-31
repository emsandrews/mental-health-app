import styled from "styled-components";
import React from "react";
import * as EmailValidator from "email-validator";
import TextField from "./components/TextField";
import axios from "axios";

const StyledForm = styled.form``;
const ButtonWrapper = styled.div`
  padding: 10px;
`;
const StyledButton = styled.button`
  height: 40px;
  width: 300px;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #9296ff;
  outline: none;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25));
  }

  &:disabled {
    background: #d1d2e7;
    &:hover {
      filter: none;
    }
  }

  &:active {
    background: #8084ff;
  }
`;

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);

    this.handleChangeLastName = this.handleChangeLastName.bind(this);

    this.handleChangeEmail = this.handleChangeEmail.bind(this);

    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(
      this
    );

    this.handleSubmit = this.handleSubmit.bind(this);

    this.formIsValid = this.formIsValid.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleChangeFirstName(event) {
    this.setState({ firstName: event.target.value });
  }

  handleChangeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  handleChangeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  formIsValid() {
    if (
      EmailValidator.validate(this.state.email) &&
      this.state.password !== "" &&
      this.state.confirmPassword !== "" &&
      this.state.firstName !== "" &&
      this.state.lastName !== "" &&
      this.state.password == this.state.confirmPassword
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.formIsValid()) {
      axios
        .post("/user/create", {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <TextField
          fieldId="firstName"
          placeholder="First Name"
          name="First Name"
          value={this.state.firstName}
          handleChange={this.handleChangeFirstName}
        ></TextField>
        <TextField
          fieldId="lastName"
          placeholder="Last Name"
          name="Last Name"
          value={this.state.lastName}
          handleChange={this.handleChangeLastName}
        ></TextField>
        <TextField
          fieldId="email"
          placeholder="your@email.ca"
          name="Email"
          value={this.state.email}
          handleChange={this.handleChangeEmail}
        ></TextField>
        <TextField
          fieldID="password"
          placeholder=""
          name="Password"
          type="password"
          value={this.state.password}
          handleChange={this.handleChangePassword}
        ></TextField>
        <TextField
          fieldID="confirmPassword"
          placeholder=""
          name="Confirm Password"
          type="password"
          value={this.state.confirmPassword}
          handleChange={this.handleChangeConfirmPassword}
        ></TextField>
        <ButtonWrapper>
          <StyledButton disabled={!this.formIsValid()}>Sign Up</StyledButton>
        </ButtonWrapper>
      </StyledForm>
    );
  }
}

export default RegisterForm;
