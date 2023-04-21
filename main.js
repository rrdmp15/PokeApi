import style from "../components/style.js"
import paginacion from "../components/paginacion.js"


style.showPokedex();



const lista = document.querySelector(".lista");
const paginacionContainer = document.querySelector(".paginacionContainer");
let urlPokemon = "https://pokeapi.co/api/v2/pokemon";
let btnNext;
let btnPrevious;
let plantilla;

const fetchPokemon = async(url)=>{
    try{
        const respuesta = await fetch(url);
        
        const resultado = await respuesta.json();

        console.log(resultado);
        dataPokemons(resultado.results)

        btnNext = resultado.next ? `<button class="btn next" data-url=${resultado.next}><i class="fa-solid fa-forward-fast"></i></button>` : "";
         btnPrevious = resultado.previous ? `<button class="previuos btn" data-url=${resultado.previous}><i class="fa-solid fa-backward-fast"></i></button>` : "";

        paginacionContainer.innerHTML = btnNext + "" +btnPrevious;
    }catch(error){
        console.error(error);
    }  
}

const dataPokemons = async(data)=>{
    lista.innerHTML = "";
    try {
        for(let i of data){
            const resp = await fetch(i.url);
            const resul = await resp.json();

            console.log(resul) 

            plantilla = `
            <li><img src="img/pokebolaMini.png" alt=""> ${resul.id} ${resul.name}</li>
            `;
            
            lista.innerHTML += plantilla;
        }
        
    } catch (error) {
        console.error(error);
    }
}

paginacionContainer.addEventListener("click", (e)=>{
    if(e.target.classList.contains("btn")){
        let value = e.target.dataset.url;
        console.log(value)
        fetchPokemon(value)
    }
})

fetchPokemon(urlPokemon);
//``