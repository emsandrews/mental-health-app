import styled from "styled-components";
import React, { Component } from "react";
import LoginForm from "./LoginForm";
import * as colors from "./colors";

const StyledText = styled.div`
  color: ${colors.TEXT_COLOR};
  font-size: 12px;
  padding: 0px 10px 5px 10px;
`;
const StyledHeader = styled.h1`
  color: ${colors.TEXT_COLOR};
  padding: 10px;
  font-size: 20px;
`;
const Wrapper = styled.div`
  flex-direction: row;
  display: flex;
  height: 100vh;
`;

const LeftPane = styled.div`
  height: 100%;
  width: 50%;
  background: linear-gradient(
    151.45deg,
    rgba(146, 150, 255, 1) 4.23%,
    rgba(205, 207, 254, 1) 57.67%
  );
  align-items: center;
  justify-content: center;
  display: flex;
`;
const RightPane = styled.div`
  width: 50%;
  height: 100%;
  background-color: #f8f8fd;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  display: flex;
  text-align: left;
  justify-content: left;
  flex-direction: column;
`;

const WomanMeditating = styled.img`
  max-width: 100%;
`;

const StyledLink = styled.a`
  color: ${colors.LINK_COLOR};
  text-decoration: none;
  &:visited {
    color: ${colors.LINK_COLOR};
  }
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginText: "",
    };

    this.manageAPIResponse = this.manageAPIResponse.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then((res) => this.manageAPIResponse(res))
      .catch((err) => console.log(err));
  }

  manageAPIResponse(res) {
    console.log("success");
    console.log(res);
    this.setState({ loginText: res.loginTextFromServer });
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <Wrapper>
        <LeftPane>
          <WomanMeditating src="/meditating-woman.png" />
        </LeftPane>
        <RightPane>
          <FormWrapper>
            <StyledHeader>Log In</StyledHeader>
            <LoginForm />
            <StyledText>
              Don't have an account?{" "}
              <StyledLink href="/register">Sign Up</StyledLink>
            </StyledText>
            <StyledText>
              <StyledLink href="/forgotPassword">Forgot Password?</StyledLink>
            </StyledText>
          </FormWrapper>
        </RightPane>
      </Wrapper>
    );
  }
}

export default Login;
