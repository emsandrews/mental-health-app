import styled from "styled-components";
import React from "react";
import * as colors from "../colors";

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
  color: ${colors.TEXT_COLOR};
  padding-bottom: 5px;
`;

const InputWrapper = styled.div`
  padding: 10px;
`;

class TextField extends React.Component {
  render() {
    return (
      <InputWrapper>
        <StyledLabel>{this.props.name}</StyledLabel>
        <StyledInput
          placeholder={this.props.placeholder}
          id={this.props.fieldId}
          type={this.props.type}
          value={this.props.value}
          onChange={this.props.handleChange}
        ></StyledInput>
      </InputWrapper>
    );
  }
}

export default TextField;
