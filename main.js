import style from "../components/style.js"

style.showPokedex();



const pokemonContainer = document.querySelector(".pokemonContainer")
let pokemon = [];
const fetchPokemon = async()=>{
    try{
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0`);
        
        const data = await respuesta.json();
        console.log(data);

    }catch(error){
        console.error(error);
    }
    
}

fetchPokemon();
//``