import React from "react";


//styles
import Style from './Card.module.css';

export default function Card({ name, id, types, image, createdinDb }) {
    //console.log(name, types, img, createdinDb)
    if(createdinDb){
    return(
        
    <div className={Style.div}>
        <div className={Style.firstDiv}>
            <h3 className={Style.idStyle}> {id} </h3>
            <h1 className={Style.name}> {name} </h1>   
        </div>
        <div className={Style.photto}>            
            <img src={image} alt="img not found" width='300px' height='550px' />            
        </div>
        <div className={Style.thirdDiv}>
            <h3>Types</h3>
            {types.map(t =>' ' + t.name + ' ')}
        </div>
    </div>
    )}
    else{
        return(
            <div className={Style.div}>
                <div className={Style.firstDiv}>
                    <h3 className={Style.idStyle}> {id} </h3>
                    <h1 className={Style.name}> {name} </h1>   
                </div>
                <div className={Style.photto}>                    
                    <img src={image} alt="img not found"/>                    
                </div>
                <div className={Style.thirdDiv}>
                    <h3> Types: </h3> 
                    <h3> {types[0]} {types[1]} </h3>
                </div>
            </div>
        )}
};