import React from 'react';
import { Link } from 'react-router-dom';

import pokemon from '../images/International_Pokémon_logo.svg.png'

import Styles from './Landing.module.css'

export default function LandingPage(){
    return(
        <div className={Styles.bgimage}>
            <div>

                <Link to ='/home'>
                    <img src={pokemon}  alt="entrada" className={Styles.title}/>                   
                </Link>
            </div>

        </div>
    )
};