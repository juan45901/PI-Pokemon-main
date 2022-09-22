import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getById, deletePokemon, resetPokeDetail } from "../../Actions/Index";
import Style from './Detail.module.css'

//images
import pikachu from '../images/pokeball.b7cd3e0a.gif'


export default function PokemonDetail(props){

    const dispatch = useDispatch();
    const history = useHistory();

    
    
    useEffect(() => {
        dispatch(getById(props.match.params.id))
    }, [dispatch, props.match.params.id])
    
    const pokemonsDetail = useSelector((state) => state.pokemons);

    function handleDeletedPoke(){
        dispatch(deletePokemon(props.match.params.id))
        history.push('/home')
    }  

    function handleBackHome(){
       dispatch(resetPokeDetail())
        history.push('/home')
    }
    
    return(

        <div>
            <div className={Style.fondo}>
            <div className={Style.title} > Pokemon Stats </div>
            {/* <div>
                {props.match.params.id.length > 3 && (
                    <div>
                        <button onClick={() => handleDeletedPoke()}> Delete </button>
                    </div>
                )}
            <button onClick={() => handleBackHome()}> Go Home </button>
            </div> */}
            {
                pokemonsDetail.length === 1 ? 
                <div>
                    <div>
                        <div>
                            <button onClick={() => handleBackHome()} className={Style.button1}> Go Home </button>
                            <button onClick={() => handleDeletedPoke()} className={Style.button1}> Delete </button>
                        </div>
                        <div className={Style.name}>
                            <h1>{pokemonsDetail[0].name}</h1>
                        </div>   
                        <div className={Style.stats}>
                            <div className={Style.stats2}>

                        <h3> Id: {pokemonsDetail[0].id}</h3>
                        <h3> Hp: {pokemonsDetail[0].hp}</h3>
                        <h3> Attack: {pokemonsDetail[0].attack}</h3>
                        <h3> Defense: {pokemonsDetail[0].defense}</h3>
                        <h3> Speed: {pokemonsDetail[0].speed}</h3>
                        <h3> Height: {pokemonsDetail[0].height}</h3>
                        <h3> Weight: {pokemonsDetail[0].weight}</h3>

                        <h3> Types </h3>
                        {props.match.params.id.length > 3 ? pokemonsDetail[0].types?.map(t =>
                        ' '+ t.name + ' ') :
                        <h3> {pokemonsDetail[0].types[0]} {pokemonsDetail[0].types[1]} </h3> }
                            </div>
                        </div>

                    </div>
                    <div className={Style.img}>
                        <img src={pokemonsDetail[0].img ? pokemonsDetail[0].img : pokemonsDetail[0].image} alt=''/>
                    </div>
                </div>:
                <div className={Style.loader}>
                    <div> Loading... </div>
                    <img src={pikachu} alt="loading" />
                </div>
                
            }
            </div>   
        </div>

    )
}