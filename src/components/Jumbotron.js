import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "@emotion/styled";
import boatImage from "../assets/pokemon-banner.jpg";

const Styles = styled.div`
  background: url(${boatImage});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  color: #efefef;
  height: 370px;
  z-index: -2;
`;
const Jumbotron = () => (
  <Styles>
    <Jumbo>
      <Container>
        <h1>Welcome</h1>
        <p>Information about Pokemon</p>
      </Container>
    </Jumbo>
  </Styles>
);

export default Jumbotron;
