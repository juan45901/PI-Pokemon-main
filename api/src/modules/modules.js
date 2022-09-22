//const { axios } = require('axios');
const  axios  = require('axios')
const { Pokemon, Type } = require('../db');

const getApiInfo = async ()=> {
    let pokeArray = [];
    // pokeapi "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
    const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=80`);
    const apiInfo = apiUrl.data.results.map( p => axios.get(p.url));

    let results = axios.all(apiInfo)
    .then( pokemon => { pokemon.map( p => { pokeArray.push({
            id: p.data.id,
            name: p.data.name,
            hp: p.data.stats[0].base_stat,
            attack: p.data.stats[1].base_stat,
            defense: p.data.stats[2].base_stat,
            speed: p.data.stats[5].base_stat,
            height: p.data.height,
            weight: p.data.weight,
            types: p.data.types.map(t=>t.type.name),
            img: p.data.sprites.other.home.front_default, 
        })
    })
    return pokeArray;
})
return results;
       
};

const getDbInfo = async () => {
    let pokeDb = await Pokemon.findAll({
        include : {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    return pokeDb;
};

const getAllPokemons = async () => {
    const pokeApi = await getApiInfo();
    const pokeDataB = await getDbInfo();
    const allPokemons = [...pokeApi, ...pokeDataB];
    return allPokemons;
};




module.exports = {
    getApiInfo,
    getAllPokemons,
    getDbInfo
           
}

