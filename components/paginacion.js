export default{
    show(){
        const lista = document.querySelector(".lista");
        const paginacionContainer = document.querySelector(".paginacionContainer");
        let urlPokemon = "https://pokeapi.co/api/v2/pokemon";
        let ws = new Worker("../storage/wsPaginacion.js");
        
        let listImg = document.querySelector(".imgList");

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

        let tomarId = ()=>{
           setTimeout(() => {
            click = document.querySelectorAll(".click");

            click.forEach( li=> {
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
                } else {
                    console.log(`El id no está presente en el array`); 
                }
                });
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
