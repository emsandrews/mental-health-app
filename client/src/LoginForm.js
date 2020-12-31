import styled from "styled-components";
import React from "react";
import * as EmailValidator from "email-validator";
import TextField from "./components/TextField";

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

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);

    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.disableButton = this.disableButton.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  disableButton() {
    if (
      EmailValidator.validate(this.state.email) &&
      this.state.password != ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <StyledForm>
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
        <ButtonWrapper>
          <StyledButton disabled={this.disableButton()}>Sign In</StyledButton>
        </ButtonWrapper>
      </StyledForm>
    );
  }
}

export default LoginForm;
