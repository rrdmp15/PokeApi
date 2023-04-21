let urlPokemon = "https://pokeapi.co/api/v2/pokemon";
let btnNext;
let btnPrevious;
let plantilla;

const fetchPokemon = async(url)=>{
    try{
        const respuesta = await fetch(url);
        
        const resultado = await respuesta.json();
        console.log(resultado);
        let pokemon = await Promise.all( resultado.results.map( async(index)=>{
            let resp = await fetch(index.url);
            let resul = await resp.json();
            console.log(resul)
            plantilla = `
              <li><img src="img/pokebolaMini.png" alt=""> ${resul.id} ${resul.name}</li>
              `;
              
            return plantilla

        }));

        let template = pokemon.join('');
        let btn = createBtn(resultado);

        postMessage({ message: "pokemon", data: template })
        postMessage({ message: "btn", data: btn })
    }catch(error){
        console.error(error);
    }  
}

let createBtn = (resultado)=>{
    btnNext = resultado.next ? `<button class="btn next" data-url=${resultado.next}><i class="fa-solid fa-forward-fast"></i></button>` : "";
    btnPrevious = resultado.previous ? `<button class="previuos btn" data-url=${resultado.previous}><i class="fa-solid fa-backward-fast"></i></button>` : "";

    return btnNext + "" +btnPrevious;
}

onmessage = (e) =>{
    let {message, url} = e.data;

    if(message === "fetchPokemon"){
        fetchPokemon(url);
    }
}

fetchPokemon(urlPokemon);