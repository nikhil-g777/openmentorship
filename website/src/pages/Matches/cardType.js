import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding-top: 14px;
  -webkit-box-shadow: 0px 6px 12px -9px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 6px 12px -9px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 6px 7px -9px rgba(0, 0, 0, 0.75);
`;

const Text = styled.p`
  ${(props) => (props.pending === true ? "color: #51B6A5" : "")}
  ${(props) => (props.active === true ? "color: #51B6A5" : "")}
  ${(props) => (props.closed === true ? "color: #51B6A5" : "")}
`;

const CardType = ({ handleSecondaryTab, props }) => {
  return (
    <Wrapper>
      <Text
        pending={props.pending}
        onClick={() => handleSecondaryTab("pending")}
      >
        Pending
      </Text>
      <Text active={props.active} onClick={() => handleSecondaryTab("active")}>
        Active
      </Text>
      <Text closed={props.closed} onClick={() => handleSecondaryTab("closed")}>
        Closed
      </Text>
    </Wrapper>
  );
};

export default CardType;
