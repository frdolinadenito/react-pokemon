let INITIAL_STATE = {
    dataListPokemon: [],
    dataDetailPokemon: null,
    dataCatchPokemon:[]
};

const pokemonReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "GET_LIST_POKEMON":
        return{
          ...state,
          dataListPokemon: action.payload
        }
      case "GET_DETAIL_POKEMON":
        return {
          ...state,
          dataDetailPokemon: action.payload
        }
        case "GET_CATCH_POKEMON":
        return {
          ...state,
          dataCatchPokemon: action.payload
        }
      default:
        return state
    }
  }
  


  export default pokemonReducer;