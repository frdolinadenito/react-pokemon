import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";


import { Link, Redirect } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import {
    getListPokemon,
    getDetailPokemon
  } from "../../action/ListPokemonAction";


  
  export default function DetailPokemon() {
    const authResult = new URLSearchParams(window.location.search);
    const nama_pokemon = authResult.get("id");
    const {
         listPokemon,
        detailPokemon }
          = useSelector((state) => {
        return {
            listPokemon: state.pokemonReducer.dataListPokemon,
            detailPokemon: state.pokemonReducer.dataDetailPokemon,
        };
      });

      const dispatch = useDispatch();
      React.useEffect(() => {
        const fetchDataReducer = async () => {
          await dispatch(getDetailPokemon(nama_pokemon));
        };
    
        fetchDataReducer();
      }, []);
      return (
          <div>
             
            

              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src= {detailPokemon?.sprites["front_default"]} />
                <Card.Body>
                    <Card.Title>{detailPokemon?.name}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                {detailPokemon?.abilities.map((item,index)=> {
                    return(

                        <ListGroup.Item action > {item.ability["name"]} </ListGroup.Item>
                    )
                })}
                    {/* <ListGroup.Item>{detailPokemon?.abilities["name"]}</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
                </Card>
                
          </div>
      )
  }
  
