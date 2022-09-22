import axios from 'axios';
import { GET_POKEMONS, GET_BY_ORIGIN, GET_BY_TYPE, ORDER_BY_ATTACK, ORDER_BY_NAME, GET_BY_NAME, GET_BY_ID, DELETE_POKEMON, RESET_POKE_DETAIL, CREATE_POKEMON, GET_ALL_TYPES } from './actionTypes'

export function getPokemons(){ 
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/pokemons")
        return dispatch({
            type: GET_POKEMONS,
            payload: json.data
        });
    }
}

export function getByType(payload){
    return {
        type: GET_BY_TYPE,
        payload
    }
}

export function getByOrigin(payload){
    return {
        type: GET_BY_ORIGIN,
        payload
    }
}

export function orderByAttack(payload){
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function getByName(payload){
    return {
        type: GET_BY_NAME,
        payload
    }
}

export function getById(id){
    return async function(dispatch){
        try {
            const pokiId = await axios.get("http://localhost:3001/pokemons/" + id);
            //console.log(pokiId)
            
            return dispatch({
                type: GET_BY_ID,
                payload: pokiId.data
            })
            
        } catch (error) {
            console.log(error)
        }
    }    
}

export function resetPokeDetail(){
    return{
        type: RESET_POKE_DETAIL
    }
}

export function deletePokemon(payload){
    return async function(dispatch){
        const deletePoke = await axios.delete('http://localhost:3001/pokemons/'+ payload)
        return dispatch({
            type: DELETE_POKEMON,
            payload: deletePoke
        })
    }
}

/* export function updatePokemon(id, payload){
    return async function(dispatch){
        await axios.put
    }
} */

/* CREATE_POKEMON */
export function createPokemon(payload){
    return async function(dispatch){
        const createPoke = await axios.post('http://localhost:3001/pokemons', payload)
        return dispatch({
            type: CREATE_POKEMON,
            payload: createPoke
        })
    }
}

/* TRAER TODOS LOS TIPOS  */
export function getAllTypes(){
    return async function(dispatch){
        const allTypes = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: GET_ALL_TYPES,
            payload: allTypes.data
        })
    }
}
