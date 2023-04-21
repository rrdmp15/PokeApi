export default{
    show(){
        const lista = document.querySelector(".lista");
        const paginacionContainer = document.querySelector(".paginacionContainer");
        let urlPokemon = "https://pokeapi.co/api/v2/pokemon";
        let ws = new Worker("../storage/wsPaginacion.js");

        
        ws.onmessage = (e) =>{
            let {message, data} = e.data;
            
            if(message === "pokemon"){
                lista.innerHTML = data;
            } else if (message === "btn"){
                paginacionContainer.innerHTML = data;
            }
        }

        paginacionContainer.addEventListener("click", (e)=>{
            if(e.target.classList.contains("btn")){
                let value = e.target.dataset.url;
                
                ws.postMessage({ message: "fetchPokemon", url: value })
            }
        })
        
        ws.postMessage({ message: "fetchPokemon", url: urlPokemon })
    }
}
