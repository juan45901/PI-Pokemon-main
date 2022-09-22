const { Router } = require('express');
const { getApiInfo, getAllPokemons, getDbInfo } = require('../modules/modules')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Pokemon, Type } = require('../db');
const { default: axios } = require('axios');
const { Op } = require('sequelize');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', async (req, res)=> {
    const { name } = req.query;
    const pokeTotal = await getAllPokemons();

    if (name){
        let pokeNames = pokeTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        pokeNames.length ? res.status(200).send(pokeNames) :
        res.status(404).send('Pokemon not found :(')
    } else {
        res.status(200).send(pokeTotal);
    }
});

router.get('/pokemons/:id', async (req, res)=> {
    try {
        const id  = req.params.id;
        const allPokemons = await getAllPokemons();
        if (id){
            const filteredPokes = allPokemons.filter(p => p.id == id)
            if (filteredPokes.length){
                return res.status(200).json(filteredPokes)
            }
            return res.status(404).send('We could not find any Pokemon by this ID') 
        }
        
    } catch (error) {
        console.log(error)
    }
        
});

router.get('/types', async(req, res)=>{
    const typesPokemons = await axios.get('https://pokeapi.co/api/v2/type')
    const types = await typesPokemons.data.results.map(el => el.name)

        types.forEach(element => {
            Type.findOrCreate({
                where: {
                    name: element,
                }
            })
         })
    const allTypes = await Type.findAll();
    res.send(allTypes)
});

router.post('/pokemons', async (req, res)=> {
    const { name, hp, attack, defense, speed, height, weight, createdinDb, types, image } = req.body;

    const createPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createdinDb,
        image
    })

    const typeDb = await Type.findAll({
        where: { name: types }
    })

    createPokemon.addType(typeDb);
    res.send('Pokemon created successfully');

});

// **DELETE POKEMON**

router.delete('/pokemons/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const erasePoke = await Pokemon.findByPk(id)
        if (erasePoke){
            erasePoke.destroy()
            return res.send('Pokemon was deleted succesfully')
        } else {
            return res.send('Introduce a valid ID')
        }
    } catch (error) {
        console.log(error)
    }
});

// **UP TO DATE**

/* router.put('/pokemons/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatePokemon = await Pokemon.findByPk(id)
        if (updatePokemon){
            updatePokemon.update({
                name: req.body.name,
                hp: req.body.hp,
                attack: req.body.attack,
                defense: req.body.defense,
                speed: req.body.speed,
                height: req.body.height, 
                weight: req.body.weight,
                img: req.body.img 
            })
            const typeDB = await Type.findAll({
                where: {
                    name: {
                        [Op.in]: req.body.types
                    }
                }
            })
            await updatePokemon.setTypes(typeDB);
        } else {
            return res.send('We need a valid ID')
        }
    } catch (error) {
        console.log('errores por volver al back')
        
    }
}) */




module.exports = router;
