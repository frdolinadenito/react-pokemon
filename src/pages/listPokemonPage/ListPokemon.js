/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
//react bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

//icons & picture
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake, faSmileWink } from "@fortawesome/free-solid-svg-icons";
import loadingPokemon from "../../assets/pokeball.gif";

//emotions
import styled from "@emotion/styled";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import "../../css/list.css";

import {
  getListPokemon,
  getDetailPokemon,
} from "../../action/ListPokemonAction";

export default function ListPokemon() {
  const { listPokemon, detailPokemon } = useSelector((state) => {
    return {
      listPokemon: state.pokemonReducer.dataListPokemon,
      detailPokemon: state.pokemonReducer.dataDetailPokemon,
    };
  });

  const dispatch = useDispatch();

  const [counter, setCounter] = useState(0);
  const [tempName, setTempName] = useState(null);
  const [show, setShow] = useState(false);
  const [showPrevButton, setshowPrevButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const [nickname, setNickname] = useState(false);
  const [limit, setLimit] = useState(9);
  const [offset, setOffset] = useState(0);
  const [disbledButton, setDisbledButton] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    dispatch(getListPokemon(limit, offset));
  }, [limit, offset]);

  function cekOffset(param) {
    if (param > 0) {
      setshowPrevButton(true);
    } else {
      setshowPrevButton(false);
    }
  }

  useEffect(() => {
    if (detailPokemon !== null) {
      setShow(true);
    }
  }, [detailPokemon]);

  const handleToDetail = (e, nama_pokemon) => {
    e.preventDefault();
    setTempName(nama_pokemon);
    dispatch(getDetailPokemon(nama_pokemon));
  };

  const handleClose = () => setShow(false);
  const LoaderShow = () => (
    <div
      css={css`
        position: fixed !important;
        position: fixed;
        top: 0 !important;
        top: 0;
        z-index: 1055;
        display: flex;
        justify-content: center !important;
        align-items: center !important;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
      `}
    >
      <Image src={loadingPokemon} />
    </div>
  );

  const Badge = styled.span`
    background-color: ${(props) =>
      props.VariantColor ? props.VariantColor : "grey"};
    color: #fff;
    padding: 7px;
    border-radius: 13px;
  `;

  const hotpink = css({
    color: "hotpink",
  });
  const hotpinkHoverOrFocus = css({
    "&:hover,&:focus": hotpink,
    marginTop: 20,
  });

  const PrevButton = () => (
    <Button
      onClick={() => {
        setLimit(limit - 9);
        setOffset(offset - 9);
        cekOffset(offset - 9);
        setLoader(true);
        setTimeout(() => {
          setLoader(false);
        }, 500);
      }}
      className="previous"
    >
      Previous
    </Button>
  );

  const NextButton = () => (
    <Button
      onClick={() => {
        setLimit(limit + 9);
        setOffset(offset + 9);
        cekOffset(offset + 9);
        setLoader(true);
        setTimeout(() => {
          setLoader(false);
        }, 500);
      }}
      className="next"
    >
      Next
    </Button>
  );

  function setLocalStorageMyPokemon(value) {
    localStorage.setItem("MY_POKEMON", JSON.stringify(value));
  }

  function getLocalStorageMyPokemon() {
    const value = localStorage.getItem("MY_POKEMON");
    return JSON.parse(value);
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    let nickNamePokemon = data.nickName;
    if (nickNamePokemon.length > 0) {
      let tempPokedex = listPokemon.filter((poke) => {
        if (poke.name === tempName) {
          return poke;
        }
      });

      const object2 = {
        ...tempPokedex[0],
        nickname: nickNamePokemon,
      };
      let arrayPokemon = [];
      arrayPokemon.push(object2);
      setLocalStorageMyPokemon(arrayPokemon);
    }
  };

  const ImputUsername = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("nickName")} placeholder="Pokemon Nickname" />

      <input type="submit" />
    </form>
  );

  const AlertFailedCatch = () => (
    <Badge VariantColor="#FF6B6B">
      Failed catch the pokemon, try again{" "}
      <FontAwesomeIcon icon={faSmileWink} size="lg" />
    </Badge>
  );

  const succesWith50PercentChance = () => {
    setLoader(true);
    if (Math.random() < 0.5) {
      setCounter((p) => p + 1);
      setNickname(true);
      setDisbledButton(true);
      setAlert(false);
    } else {
      setAlert(true);
      setNickname(false);
    }
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  return (
    <div>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Pokemon List">
          <Container>
            <h1>List pokemon</h1>

            <Row xs={1} md={3} className="g-4">
              {listPokemon?.map((item, index) => {
                return (
                  <Col key={index}>
                    <Card
                      css={css({
                        backgroundColor: "#00C1D4",
                      })}
                      onClick={(e) => handleToDetail(e, item.name)}
                    >
                      <Card.Img variant="top" src={item.image} />
                      <Card.Body>
                        <Card.Title
                          css={css({
                            margin: -15,
                            padding: 10,
                            textAlign: "center",
                            backgroundColor: "#eee",
                            textTransform: "capitalize",
                          })}
                        >
                          <h1>{item.name}</h1>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <div>
              {showPrevButton && <PrevButton />}
              <NextButton />
            </div>
          </Container>
        </Tab>
        <Tab eventKey="profile" title="My Pokemon List">
          <Container>
            <h1>My pokemon</h1>
            {getLocalStorageMyPokemon().map((item, i) => {
              return (
                <Col key={i}>
                  <Card
                    css={css({
                      backgroundColor: "#00C1D4",
                    })}
                    onClick={(e) => handleToDetail(e, item.name)}
                  >
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title
                        css={css({
                          margin: -15,
                          padding: 10,
                          textAlign: "center",
                          backgroundColor: "#eee",
                          textTransform: "capitalize",
                        })}
                      >
                        <h1>{item.name}</h1>
                      </Card.Title>
                      <Card.Text
                        css={css({
                          margin: -15,
                          padding: 10,
                          textAlign: "center",
                          backgroundColor: "#eee",
                          textTransform: "capitalize",
                        })}
                      >
                        <h1>Nickname : {item.nickname}</h1>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}

            <div>
              {showPrevButton && <PrevButton />}
              <NextButton />
            </div>
          </Container>
        </Tab>
      </Tabs>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{detailPokemon?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3
            css={css({
              paddingBottom: 10,
            })}
          >
            Ability
          </h3>
          {detailPokemon?.abilities.map((item, index) => {
            return (
              <Badge
                VariantColor="green"
                css={css({
                  margin: 15,
                  padding: 10,
                  paddingTop: 10,
                  textAlign: "center",
                  textTransform: "capitalize",
                })}
              >
                {item.ability.name}
              </Badge>
            );
          })}
          <Carousel
            css={css({
              background: "#FFC93C",
            })}
          >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={detailPokemon?.sprites.front_default}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={detailPokemon?.sprites.back_default}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={detailPokemon?.sprites.front_shiny}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={detailPokemon?.sprites.back_shiny}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
          <Container>
            <Row>
              <br></br>
              <Col>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Move</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailPokemon?.moves.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.move.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
              <Col>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailPokemon?.types.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.type.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>

                <h2>Pokemon caught : {counter}</h2>
                {alert && (
                  <div>
                    <AlertFailedCatch />
                  </div>
                )}

                <Button
                  disabled={!!disbledButton}
                  css={hotpinkHoverOrFocus}
                  onClick={() => {
                    succesWith50PercentChance();
                  }}
                >
                  <FontAwesomeIcon icon={faHandshake} size="lg" /> Catch Pokemon
                </Button>
                {nickname && <ImputUsername />}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
        {loader && <LoaderShow />}
      </Modal>
      {loader && <LoaderShow />}
    </div>
  );
}
