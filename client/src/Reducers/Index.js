import { GET_POKEMONS, GET_BY_ORIGIN, GET_BY_TYPE, ORDER_BY_ATTACK, ORDER_BY_NAME, GET_BY_NAME, GET_BY_ID, DELETE_POKEMON, RESET_POKE_DETAIL, CREATE_POKEMON, GET_ALL_TYPES } from '../Actions/actionTypes'

const initialState = {
    pokemons: [],   //estado inicial
    types: [],
    detail:[],
    pokeDetailCopy: []
    /*allPokemons: [] //estado que se modificará con el useSelector
    types: [],
    detail: []    */ 
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                types: action.payload                                    
            }
        case GET_BY_TYPE:
            let allPokes = state.types
            let allTypesOne = [];
            let allTypesTwo = [];
            allTypesOne = allPokes.filter(el => el.types[0] === action.payload)
            allTypesTwo = allTypesOne.concat(allPokes.filter(el => el.types[1] === action.payload))
            return {
                ...state,
                pokemons: allTypesTwo.length > 0 ? allTypesTwo : allPokes.concat(alert('There are no Pokemons with that type'))
            }
        case GET_BY_ORIGIN:
            let pokesToFilter = state.types
            let allOrigins = [];
            if(action.payload === 'createdByUser'){
                allOrigins = pokesToFilter.filter(el => el.createdinDb)
            } else {
                allOrigins = pokesToFilter.filter(el => !el.createdinDb)
            }
            return {
                ...state,
                pokemons: allOrigins
            }
        case ORDER_BY_ATTACK: 
            let pokesByAttack = state.types
            let orderByAttack = [];
            if (action.payload === 'attackAsc'){
                orderByAttack = pokesByAttack.sort((b, a) => {
                    if (a.attack > b.attack) return 1
                    if (a.attack < b.attack) return -1
                    return 0
                })
            }
            if (action.payload === 'attackDesc'){
                orderByAttack = pokesByAttack.sort((a, b) => {
                    if (a.attack > b.attack) return 1
                    if (a.attack < b.attack) return -1
                    return 0
                })
            }            
            return {
                ...state,
                pokemons: orderByAttack.length > 0 ? orderByAttack : pokesByAttack.concat(alert('Apparently all Pokemons are having lunch right now, come back later <3'))
            }
        case ORDER_BY_NAME:
            let pokesByName = state.types
            let orderByName = [];
            if (action.payload === 'fromZtoA'){
                orderByName = pokesByName.sort((b, a) => {
                    if (a.name > b.name) return 1
                    if (a.name < b.name) return -1
                    return 0
                })
            }
            if (action.payload === 'fromAtoZ'){
                orderByName = pokesByName.sort((a, b) => {
                    if (a.name > b.name) return 1
                    if (a.name < b.name) return -1
                    return 0
                })
            }            
            return {
                ...state,
                pokemons: orderByName.length > 0 ? orderByName : pokesByName
            }
        case GET_BY_NAME:
            let getPokeName = state.types
            let specificPoke = getPokeName.filter(el => el.name === action.payload.toLowerCase())
            let noPokeInput = getPokeName
            if (action.payload === ''){
                alert('You need to write the Pokemon name to search for it')
            }
            return {
                ...state,
                pokemons: specificPoke.length > 0 ? specificPoke : noPokeInput.concat(alert('There is no Pokemon with that name'))
            }
        case GET_BY_ID:
            return {
                ...state,
                pokemons: action.payload,                               
            }
        case CREATE_POKEMON: 
            return {
                ...state,
                pokemons: state.pokemons.concat(action.payload)
            }
        case GET_ALL_TYPES: 
        return {
            ...state,
            pokeDetailCopy: action.payload
        }
        case DELETE_POKEMON: 
            return{
                ...state,
                pokemons: state.pokemons.filter(p => p !== action.payload)
            }
        case RESET_POKE_DETAIL:
            const resetAllPokes = state.types
            return {
                ...state,
                detail: [],
                pokemon: resetAllPokes
            }
        default: 
            return state
            
    }
}

export default rootReducer;

