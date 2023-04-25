let urlPokemon = "https://pokeapi.co/api/v2/pokemon";
let btnNext;
let btnPrevious;
let plantilla;

const fetchPokemon = async(url)=>{
    try{
        const respuesta = await fetch(url);
        
        const resultado = await respuesta.json();
        let pokemon = await Promise.all( resultado.results.map( async(index)=>{
            let resp = await fetch(index.url);
            let resul = await resp.json();
            plantilla = `
              <li id="${resul.id}" class="click"><img src="img/pokebolaMini.png" alt=""> ${resul.id} ${resul.name}</li>
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

let plantillaImg;

let fetchPokemonImg = async(url)=>{
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();


        let imgPokemon = await Promise.all( resultado.results.map( async(index)=>{
            let resp = await fetch(index.url);
            let resul = await resp.json();
            plantilla = `
            <img src="${resul.sprites.other.dream_world.front_default}" alt="" id="${resul.id}" class="hidden">
              `;
              
            return plantilla
           

        }));

        let imgTemplate = imgPokemon.join('');
        postMessage({ message: "imgPokemon", data: imgTemplate })
    } catch (error) {
        
    }
}

let fetchVerPokemon = async(url)=>{
    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        let verPokemon = await Promise.all(resultado.results.map( async(index)=>{
            let resp = await fetch(index.url);
            let resul = await resp.json();

            plantilla = `
            <div class="content hidden" id="${resul.id}">
                    <div class="left">
                        <div class="border3">
                            <div class="border2">
                                <div class="imgList">
                                    <img src="${resul.sprites.other.dream_world.front_default}" alt="">
                                </div>
                            </div>
                        </div>
                   </div>
                   
                    <div class="rightInfo">
                        <div class="detalle">
                            <div class="detalleContainer">
                                <p>${resul.id} ${resul.name}</p>
                            </div>
                        </div>
                        <div class="especie">
                            <div class="tipo">
                                ${resul.types.map(type => `<p>${type.type.name}</p>`).join('')}
                            </div>
                        </div>
                        <div class="dimension">
                            <p>ALT.  ${resul.height}Dm.</p>
                            <p>PESO  ${resul.weight}Hg.</p>
                        </div>
                    </div>
            </div>
            `;
            return plantilla;
        }));

        let verTemplate = verPokemon.join('');
        postMessage({ message: "verPokemon", data: verTemplate });
    } catch (error) {
        console.log(error);
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
        fetchPokemonImg(url);
        fetchVerPokemon(url);
    }
}

fetchPokemon(urlPokemon);