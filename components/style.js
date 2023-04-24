export default{
    showPokedex(){
        const pokedexClosed = document.querySelector("#aparece");
        const pokedex = document.querySelector(".pokedex");
        const imgPokedex = document.querySelector(".imgPokedex");

        const verPokemon = document.querySelector(".verPokemon");
        const btnverPokemon = document.querySelector(".boton2");
        const btnBuscarPokemon = document.querySelector(".boton1");

        const resultadosPokedex = document.querySelector(".resultadosPokedex");

        const buscarPokemon = document.querySelector(".buscarPokemon");
        const confirmar = document.querySelector(".confirmar");

        const spaceInfo = document.querySelector(".spaceInfo");

        pokedexClosed.addEventListener("click", (e)=>{
            pokedex.style.display = "block";
            imgPokedex.style.display = "none";
        })

        btnverPokemon.addEventListener("click", ()=>{
            verPokemon.style.display = "block";
            pokedex.style.display = "none";
        })

        spaceInfo.addEventListener("click", ()=>{
            verPokemon.style.display = "none";
            pokedex.style.display = "block";
        })

        btnBuscarPokemon.addEventListener("click", ()=>{
            pokedex.style.display = "none";
            buscarPokemon.style.display = "block";
        })

        confirmar.addEventListener("click", ()=>{
            buscarPokemon.style.display = "none";
            resultadosPokedex.style.display = "block";
        })
    }
}