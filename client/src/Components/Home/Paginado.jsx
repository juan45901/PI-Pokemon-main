import React from "react";

import Styles from './Paginado.module.css'

export default function Paginado ( {pokemonsPerPage, allPokemons, paginado} ){
    const pageNumber = [];

    for (let i = 1 ; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumber.push(i)
    }

    return(
        <nav>        
            <ul className={Styles.text}>
                {pageNumber &&
                pageNumber.map(number=>(
                    <ul className={Styles.page} key={number}>
                        <button onClick={()=>paginado(number)}> {number} </button>
                    </ul>
                    
                ))}
            </ul>
        </nav>
    )
};