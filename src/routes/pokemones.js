//Se trae el framework express para utilizar sus metodos.
const express = require('express');
//Se importa router de express para gestionar adecuadamente la estructura de las rutas
const router = express.Router();

//Se traen los metodos para proteger las rutas
const {isLoggedIn} = require('../lib/auth');

//Función para traer la Api de los pokemones
async function loadAllPokemon(){
    //A través de fetch se traen los datos que contiene la API
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    //Se guardan los resultados en formato JSON
    const data = await response.json();
    //Retorno de solo el elemento que contiene a los pokemones
    return data.results;
}

//Funcion para traer las caracteristicas de cada pokemon
//El parametro es el nombre del pokemon previamente seleccionado en la pagina.
async function loadPokemon(pokemonName){
    //A través de fetch se traen los datos que contiene la API
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    //Se guardan los resultados en formato JSON
    const data = await response.json();
    //Solo se retorna las caracteristicas del pokemon seleccionado
    return data.results.find(pokemon => pokemon.name === pokemonName)
}


//Renderiza todos los pokemones
router.get('/', async (req, res) =>{
    //Se trae la funcion de todos los pokemones.
    const pokemonlist = await loadAllPokemon();
    //Por medio de la constante se envian los datos de los pokemones a la vista de handlebars.
    res.render('pokemons/list', {pokemonlist})
});

//Renderiza las caracteristicas del pokemon seleccionado
router.get('/:pokemonName',isLoggedIn, async (req, res) =>{
    //Se toma el nombre del pokemon seleccionado
    const pokemonName = req.params.pokemonName;
    //Pasamos como parametro el nombre del pokemon a la funcion que trae el nombre y la API que contiene las caracteristicas del pokemon
    const pokemon = await loadPokemon(pokemonName);
    //A traves de fetch traemos las habilidades e imagen del pokemon
    const response = await fetch(pokemon.url);
    //Se guardan los resultados en formato JSON
    const data = await response.json();
    //Seleccionamos la imagen
    const image = data.sprites.front_default;
    //Seleccionamos las habilidades
    const abilities = data.abilities;
    //Arreglo para almacenar todas las habilidades del pokemón
    const abilityNames = [];

    //Las habilidades al encontrarse almacenadas en un objeto, se trae una por una y son agregadas al arreglo
    for (let i = 0; i < abilities.length; i++) {
        const ability = abilities[i];
        const abilityName = ability.ability
        abilityNames.push(abilityName);
    }
    //Se renderiza la vista de las habilidades del pokemon y se le pasa los elementos traidos de la API
    //(Nombre, Imagen y habilidades)
    res.render('pokemons/ability', {pokemonName,image,abilityNames})
})

//Se exporta router para que funcione las renderizaciones
module.exports = router;