import styled from "styled-components";
import React from "react";
import * as EmailValidator from "email-validator";

const StyledInput = styled.input`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  width: 300px;
  padding: 0px 10px 0px 10px;
`;

const StyledForm = styled.form``;

const StyledLabel = styled.label`
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  color: #4f4f4f;
  padding-bottom: 5px;
`;

const InputWrapper = styled.div`
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
        <InputWrapper>
          <StyledLabel for="email">Email</StyledLabel>
          <StyledInput
            placeholder="your@email.ca"
            id="email"
            value={this.state.email}
            onChange={this.handleChangeEmail}
          ></StyledInput>
        </InputWrapper>
        <InputWrapper>
          <StyledLabel for="password">Password</StyledLabel>
          <StyledInput
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChangePassword}
          ></StyledInput>
        </InputWrapper>
        <InputWrapper>
          <StyledButton disabled={this.disableButton()}>Sign In</StyledButton>
        </InputWrapper>
      </StyledForm>
    );
  }
}

export default LoginForm;
