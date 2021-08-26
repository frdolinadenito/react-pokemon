import {combineReducers} from 'redux'

import pokemonReducer from './PokemonReducer'

const allReducer = combineReducers({
    pokemonReducer
})

export default allReducer