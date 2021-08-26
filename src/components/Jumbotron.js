import React from 'react';
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
//import styled from 'styled-components';
import styled from '@emotion/styled'
import boatImage from '../assets/pokemon-banner.jpg';

const Styles = styled.div`
    background: url(${boatImage});
     background-repeat:no-repeat;
    background-attachment: fixed;
    background-position:center;
      background-size: cover;
     color: #efefef;
     height: 370px;
     z-index: -2;
  `

//   const overlay = styled.div`
//     background-color: #000;
//     opacity: 0.6;
//     position: absolute;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     right: 0;
//     z-index: -1;
// `;


export const Jumbotron = () => (
  <Styles>
    <Jumbo  >
      {/* <overlay> */}
      <Container>
        <h1>Welcome</h1>
        <p>Information about Pokemon</p>
      </Container>
      {/* </overlay> */}
    </Jumbo>
  </Styles>
)
