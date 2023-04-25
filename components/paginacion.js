export default{
    
    show(){
        const lista = document.querySelector(".lista");
        const paginacionContainer = document.querySelector(".paginacionContainer");
        let urlPokemon = "https://pokeapi.co/api/v2/pokemon";
        let ws = new Worker('./storage/wsPaginacion.js');
        
        let listImg = document.querySelector(".imgList");
        let insertDetalle = document.querySelector("#insertDetalle");

        ws.onmessage = (e) =>{
            let {message, data} = e.data;
            
            if(message === "pokemon"){
                lista.innerHTML = data;
                tomarId();
            } else if (message === "btn"){
                paginacionContainer.innerHTML = data;
            } else if (message === "imgPokemon"){
                listImg.innerHTML = data;
                tomarImgId();
            } else if(message === "verPokemon"){
                insertDetalle.insertAdjacentHTML("beforeend", data);
            }
        }

        paginacionContainer.addEventListener("click", (e)=>{
            if(e.target.classList.contains("btn")){
                let value = e.target.dataset.url;
                
                ws.postMessage({ message: "fetchPokemon", url: value })
            }
        })

        
        let click;
        var id;
        let elementoVisible = null;
        let posicionActual = 1;
        let elementoVisibleDiv = null;

        let tomarId = ()=>{
           setTimeout(() => {
            click = document.querySelectorAll(".click");

            click.forEach((li, index)=> {
                if (li.getAttribute('data-evento-agregado') !== 'true'){
                    li.addEventListener("click", (e) => {
                        id = e.target.getAttribute("id");
                        
                        if (allId.includes(id)) {
                            let imgVisible = document.querySelector(`img[id="${id}"]`);

                            if (elementoVisible !== null) {
                                elementoVisible.classList.add("hidden");
                            }
                            imgVisible.classList.remove("hidden");
                            elementoVisible = imgVisible;
                            imgVisible.classList.remove(`hidden`);

                            let divVisible = document.querySelector(`div[id="${id}"]`);
                            if (elementoVisibleDiv !== null) {
                                elementoVisibleDiv.classList.add("hidden");
                            }
                            divVisible.classList.remove("hidden");
                            elementoVisibleDiv = divVisible;
                            posicionActual = index;
                        } else {
                            console.log(`El id no está presente en el array`); 
                        }
                    });  
                    li.setAttribute('data-evento-agregado', 'true');
                }
            });

            let botonSiguiente = document.querySelector("#siguiente");
            botonSiguiente.addEventListener("click", () => {
            if (posicionActual < click.length - 1) {
                let siguiente = click[posicionActual + 1];
                let idSiguiente = siguiente.getAttribute("id");
                if (allId.includes(idSiguiente)) {
                let divSiguiente = document.querySelector(`div[id="${idSiguiente}"]`);
                if (elementoVisibleDiv !== null) {
                    elementoVisibleDiv.classList.add("hidden");
                }
                divSiguiente.classList.remove("hidden");
                elementoVisibleDiv = divSiguiente;
                posicionActual++;
                console.log(posicionActual)
                } else {
                console.log(`El id no está presente en el array`);
                }
            }
            });

            let botonAnterior = document.querySelector("#anterior");
            botonAnterior.addEventListener("click", () => {
            if (posicionActual > 0) {
                let anterior = click[posicionActual - 1];
                let idAnterior = anterior.getAttribute("id");
                if (allId.includes(idAnterior)) {
                let divAnterior = document.querySelector(`div[id="${idAnterior}"]`);
                if (elementoVisibleDiv !== null) {
                    elementoVisibleDiv.classList.add("hidden");
                }
                divAnterior.classList.remove("hidden");
                elementoVisibleDiv = divAnterior;
                posicionActual--;
                console.log(posicionActual)
                } else {
                console.log(`El id no está presente en el array`);
                }
            }
            });
            
            }, 2000); 
        }
        
        let allId = [];
        var idImg;
        let imgs;

        let tomarImgId = ()=>{
            setTimeout(() => {
            imgs = document.querySelectorAll(".hidden");

            imgs.forEach( img => {
                idImg = img.getAttribute("id");
                allId.unshift(idImg);
            });
            }, 2000); 
         }
        ws.postMessage({ message: "fetchPokemon", url: urlPokemon }) 
    }
}
