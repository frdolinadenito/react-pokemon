import fetch from "./Fetch";

export const getListPokemon = (limit, offset) => {
  return async (dispatch) => {
    try {
      const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
                pokemons(limit: $limit, offset: $offset) {
                  count
                  next
                  previous
                  status
                  message
                  results {
                    id
                    url
                    name
                    image
                  }
                }
              }`;

      const gqlVariables = {
        limit: 9,
        offset: offset,
      };

      fetch({
        url: "https://graphql-pokeapi.graphcdn.app/",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          query: gqlQuery,
          variables: gqlVariables,
        },
      }).then((result) => {
        const list = result.data.pokemons.results;
        console.log("List pokemon", list);

        if (list) {
          dispatch({
            type: "GET_LIST_POKEMON",
            payload: list,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getDetailPokemon = (nama_pokemon) => {
  return async (dispatch) => {
    try {
      const gqlQuery = `query pokemon($name: String!) {
                pokemon(name: $name) {
                  id
                  name
                  abilities {
                    ability {
                      name
                    }
                  }
                  moves {
                    move {
                      name
                    }
                  }
                  types {
                    type {
                      name
                    }
                  }
                  sprites {
                    back_default
                    front_default
                    back_shiny
                    front_shiny
                  }
                  message
                  status
                }
              }`;

      const gqlVariables = {
        name: nama_pokemon,
      };

      fetch({
        url: "https://graphql-pokeapi.graphcdn.app/",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          query: gqlQuery,
          variables: gqlVariables,
        },
      }).then((result) => {
        const list = result.data.pokemon;
        console.log("detail pokemon", list);

        if (list) {
          dispatch({
            type: "GET_DETAIL_POKEMON",
            payload: list,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCatchPokemon = (list) => {
  return async (dispatch) => {
    try {
      
      dispatch({
        type: "GET_LIST_POKEMON",
        payload: list,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
