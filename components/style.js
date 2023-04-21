export default{
    showPokedex(){
        let pokedexClosed = document.querySelector("#aparece");
        let pokedex = document.querySelector(".pokedex");
        let imgPokedex = document.querySelector(".imgPokedex");

        pokedexClosed.addEventListener("click", (e)=>{
            pokedex.style.display = "block";
            imgPokedex.style.display = "none";
        })
    }
}