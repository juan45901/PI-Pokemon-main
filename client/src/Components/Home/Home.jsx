import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getByOrigin, getByType, orderByAttack, orderByName, getByName } from "../../Actions/Index";
import { Link } from 'react-router-dom'
import Card from "../PokemonCard/Card";
import Paginado from "./Paginado";

//Images loading
import pikachu from '../images/pokeball.b7cd3e0a.gif'

//styles
import styles from '../Home/Home.module.css'

export default function Home (){

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const [ input, setInput ] = useState('');

    const [/* reload */, setReload ] = useState(false)

    //console.log(allPokemons)
    //Se hace el paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, /* setPokemonsPerPage */] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getPokemons())
    }, [dispatch])

    //seateamos los handlers de los eventos de la página

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
        setCurrentPage(1)
    }

    function handleByType(e){
        e.preventDefault();
        dispatch(getByType(e.target.value))
        setCurrentPage(1)
    }

    function handleByCreation(e){
        e.preventDefault();
        dispatch(getByOrigin(e.target.value))
        setCurrentPage(1)
    }

    function handleByAttack(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setReload((prevState) => !prevState);
        setCurrentPage(1)
    }

    function handleByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setReload((prevState) => !prevState);
        setCurrentPage(1)
    }
    
    function handleChange(e){
        setInput(e.target.value)
    }

    function handleGetByName(e){
        e.preventDefault();
        dispatch(getByName(input))
        setInput('')
        setCurrentPage(1)
    }


    
    return (
        <div>
            <div className={styles.bground}>
            {
                allPokemons.length < 1 ? 
                
                <div className={styles.loader}>
                    <div> Loading... </div>
                    <img src={pikachu} alt="loading" />
                </div> : 
                
                <div>
                    <div className={styles.titleStyle}>                        
                        <Link to='/createpokemon'  className={styles.lists}>       
                            <p>
                                Create new Pokemon                             
                            </p>                     
                        </Link>                                                
                    </div>
                            
                            <div>
                            <button onClick={e=> {handleClick(e)}} className={styles.button1}>
                                Refresh Pokemons
                            </button> 
                            </div>                           

                                <div>
                                    <form onSubmit={(e) => handleGetByName(e)}>
                                        <div>
                                            <input type="text" placeholder="Pokemon name" onChange={(e) => handleChange(e)} value={input} className={styles.input1}/>
                                            <input type="submit" value='Search' className={styles.input2}/>
                                        </div>
                                    </form>
                                </div>
                                
                                <div className={styles.filters}>
                                <div>
                                    <select onChange={(e) => handleByCreation(e)} >
                                        <option> Filter by origin </option>
                                        <option value='createdByUser'> Created by user </option>
                                        <option value='createdByPokeApi'> Created by PokeApi </option>
                                    </select>
                                </div>
            
                                <div>
                                    <select onChange={(e) => handleByType(e)}>
                                        <option> Filter by type </option>
                                        <option value="normal">Normal</option>
                                        <option value="fighting">Fighting</option>
                                        <option value="flying">Flying</option>
                                        <option value="poison">Poison</option>
                                        <option value="ground">Ground</option>
                                        <option value="rock">Rock</option>
                                        <option value="bug">Bug</option>
                                        <option value="ghost">Ghost</option>
                                        <option value="steel">Steel</option>
                                        <option value="fire">Fire</option>
                                        <option value="water">Water</option>
                                        <option value="grass">Grass</option>
                                        <option value="electric">Electric</option>
                                        <option value="psychic">Psychic</option>
                                        <option value="ice">Ice</option>
                                        <option value="dragon">Dragon</option>
                                        <option value="dark">Dark</option>
                                        <option value="fairy">Fairy</option>
                                        <option value="unknown">Unknown</option>
                                        <option value="shadow">Shadow</option>
                                    </select>
                                </div>

                                <div>
                                    <select onChange={(e) => handleByAttack(e)}>
                                        <option> Order by attack </option>
                                        <option value='attackAsc'> Highest </option>
                                        <option value='attackDesc'> Lowest </option>
                                    </select>
                                </div>

                                <div>
                                    <select onChange={(e) => handleByName(e)}>
                                        <option> Order by name </option>
                                        <option value='fromAtoZ'> A - Z </option>
                                        <option value='fromZtoA'> Z - A </option>
                                    </select>
                                </div>
                                </div>
                                <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} />
                                
                                <div className={styles.orderP}>
                                {
                                    currentPokemons?.map((el) => {
                                        return (
                                            <div key={el.id}>
                                                <Link to={'/pokemons/' + el.id}>
                                                    <Card name={el.name} image={el.img ? el.img : el.image} types={el.types} id={el.id} createdinDb={el.createdinDb}/> 
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                                </div>

                                <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} />
                </div>
                
            }
            </div>
        </div>
    )

};