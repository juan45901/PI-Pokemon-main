import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getById, getAllTypes } from '../../Actions/Index';
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

//styles
import style from './CreatePoke.module.css'


export default function CreatePokemon(){

    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();

    const pokeTypes = useSelector((state) => state.pokeDetailCopy)
    const [kind, /* setKind */] = useState([]);
    
    useEffect(() => {
        dispatch(getAllTypes())
        id && dispatch(getById(id))
    }, [dispatch, id])


    const [input, setInput] = useState({
        name: '',
        hp: '',
        weight: '',
        height: '',
        speed: '',
        defense: '',
        attack: '',
        img: '',
        types: []
    });

    const [error, setError] = useState({
        name: '',
        hp: '',
        weight: '',
        height: '',
        speed: '',
        defense: '',
        attack: ''        
    });

    var count = 1;

    //**VALIDATIONS**

    function validating(state){

        const errors = {};
        
        if (!state.name){
            errors.name = "Name is required";
        } else if(!/^[a-zA-Z]{3,10}$/.test(state.name)){
            errors.name = 'Name can only contain letters';
        }
        if (!state.hp){
            errors.hp = "Hp is required";
        } else if(!/^[0-9]{1,2}$/.test(state.hp)){
            errors.hp = 'Hp must cointain values between 0 and 99 and must be numbers';
        }
        if (!state.weight){
            errors.weight = "Weight is required";
        } else if(!/^[0-9]{1,2}$/.test(state.weight)){
            errors.weight = 'Weight must cointain values between 0 and 99 and must be numbers';
        }
        if (!state.height){
            errors.height = "Height is required";
        } else if(!/^[0-9]{1,2}$/.test(state.height)){
            errors.height = 'Height must cointain values between 0 and 99 and must be numbers';
        }
        if (!state.speed){
            errors.speed = "Speed is required";
        } else if(!/^[0-9]{1,2}$/.test(state.speed)){
            errors.speed = 'Speed must cointain values between 0 and 99 and must be numbers';
        }
        if (!state.defense){
            errors.defense = "Defense is required";
        } else if(!/^[0-9]{1,2}$/.test(state.defense)){
            errors.defense = 'Defense must cointain values between 0 and 99 and must be numbers';
        }
        if (!state.attack){
            errors.attack = "Attack is required";
        } else if(!/^[0-9]{1,2}$/.test(state.attack)){
            errors.attack = 'Attack must cointain values between 0 and 99 and must be numbers';
        }
        return errors;
    }

    // **DELETE 'EM ALL**

    function handleDeletePoke(e){
        e.preventDefault();
        if(kind.length > 0){
            kind.pop()
        }
        setInput({
            ...input,
            types: kind
        })
    }

    // **HANDLE CHANGES ON INPUTS**

    function handleChangeCreate(e){
        e.preventDefault();
        setInput(prevState => {
            const newState = {
                ...prevState,
                [e.target.name]: e.target.value
            }
            setError(validating(newState))
            return newState
        })
    }

    // **TYPES I CHOSE YOU**

    function handleTypes(e){
        e.preventDefault();
        if (kind.length === 2) {
            alert('Pokemons can only have two types')
        } else if (kind.length < 2) {
            kind.push(e.target.value)
        }
        setInput({
            ...input,
            types: kind
        })
    }

    
    // **PUSH THE BUTTON AND CREATE POKEMONS**

    function handleCreatePokemon(e){
        e.preventDefault();
        setError(validating(input))
        if(Object.keys(error).length === 0 && input.types.length !== 0){
            dispatch(createPokemon(input))
            setInput({
                name: '',
                hp: '',
                weight: '',
                height: '',
                speed: '',
                defense: '',
                attack: '',
                image: '',
                types: []
            })
            alert('Pokemon created successfully')
            history.push('/home')
        } else if (input.types.length === 0) {
            alert('You need to pick a pokemon type at least')
            return;
        }
        return;
    }

    function handleBackHome(){
        history.push('/home')
     }
        


    return (
    <div className={style.bgg}>
        <div>
            <button onClick={() => handleBackHome()} className={style.button1}> Go Home </button>
            
            <div className={style.title}>
            <h1> Create your pokemon </h1>
            </div>            

            <form className={style.forms}>
                
            <label> Name </label>
            <input type="text" placeholder="Enter Pokemon name" name={'name'} onChange={(e) => handleChangeCreate(e)} value={input.name} className={style.input1}/>
            {error.name && <p>{error.name}</p>}
                

            <label> Hp </label>
            <input type="text" placeholder="Enter Health points" name={'hp'} onChange={(e) => handleChangeCreate(e)} value={input.hp} className={style.input1}/>
            {error.hp && <p>{error.hp}</p>}
            
            <label> Weight </label>
            <input type="text" placeholder="Enter weight" name={'weight'} onChange={(e) => handleChangeCreate(e)} value={input.weight} className={style.input1}/>
            {error.weight && <p>{error.weight}</p>}

            <label> Height </label>
            <input type="text" placeholder="Enter height" name={'height'} onChange={(e) => handleChangeCreate(e)} value={input.height} className={style.input1}/>
            {error.height && <p>{error.height}</p>}

            <label> Speed </label>
            <input type="text" placeholder="Enter Speed points" name={'speed'} onChange={(e) => handleChangeCreate(e)} value={input.speed} className={style.input1}/>
            {error.speed && <p>{error.speed}</p>}

            <label> Defense </label>
            <input type="text" placeholder="Enter Defense points" name={'defense'} onChange={(e) => handleChangeCreate(e)} value={input.defense} className={style.input1}/>
            {error.defense && <p>{error.defense}</p>}

            <label> Attack </label>
            <input type="text" placeholder="Enter Attack points" name={'attack'} onChange={(e) => handleChangeCreate(e)} value={input.attack} className={style.input1}/>
            {error.attack && <p>{error.attack}</p>}

            <label> Image </label>
            <input type="text" placeholder="Enter image url" name={'image'} onChange={(e) => handleChangeCreate(e)} value={input.image} className={style.input1}/>
        
            <select onChange={(e) => handleTypes(e)}>
            <option> Chose types </option>
                { pokeTypes.map(type => {
                    return(
                        <option value={type.name} key={type.id}> {type.name} </option>
                    )
                })}
            </select>
            <div className={style.title}> Look at the types you choose </div>
            <ul>

                {
                    input.types.map(t => {
                        count = count + 1;
                        return (
                            <p key={t + count}> {t} </p>
                            )
                        })
                    }              
                
            </ul> 
            <div>
                <button onClick={(e) => handleDeletePoke(e)} className={style.button1}> Delete types </button>
            </div>

            {id && id.length > 3 ?
                <input type="submit" placeholder="Update" value='UpdatePokemon'/> :
                <input type="submit" placeholder="Create" onClick={(e) => handleCreatePokemon(e)} value='CreatePokemon' className={style.button1} />            
            }        
        </form>
        </div>
        </div>

    )

};