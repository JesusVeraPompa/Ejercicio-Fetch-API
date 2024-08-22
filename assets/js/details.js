let urlLocal = new URLSearchParams(window.location.search);
let id = urlLocal.get("id");
console.log(id);

let url="https://api-colombia.com/"
let urlFinal=url+"api/v1/Department/"+id
let urlCities = urlFinal+"/cities"
let urlNaturalareas = urlFinal+"/naturalareas"


fetch(urlFinal).then(response => response.json()).then(data => {
    console.log(data)
    console.log(data)
    
    let name = document.getElementById("name");
    name.innerHTML += `<h1>${data.name} - Departamento de <span class="yellow">Col</span><span class="blue">om</span><span class="red">bia</span></h1>`

    let imagen = document.getElementById("imagen");
    imagen.innerHTML += `<img src="../../assets/img/departamentos/${data.name}.png" class="card-img-top p-2" alt=""/>`

    let description = document.getElementById("description");
    description.innerHTML += `<p>${data.description}</p>`


}) 


fetch(urlCities).then(response => response.json()).then(data => {
    console.log(data)
    let ncities = data.length

    fetch(urlNaturalareas).then(response => response.json()).then(dataAN => {
        console.log(dataAN)
        console.log(dataAN[0].naturalAreas)

        let nnaturalareas = dataAN[0].naturalAreas.length

        
    
        let cuidades = document.getElementById("cuidades");
        cuidades.innerHTML += `<h2>${ncities} Ciudades y ${nnaturalareas} Áreas Naturales:</h2>`
        
        
        let contenedor = document.getElementById("contenedor");
        for (let i = 0; i < data.length; i++) {
            let tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta";
            tarjeta.innerHTML = `   <div class="card row" >
                                    <img src="https://img.freepik.com/vector-premium/icono-vector-silueta-montana-picos-rocosos-cordilleras-icono-montana-blanco-negro_574545-202.jpg" class="card-img-top-details p-2" alt=""/>
                                    <div class="card-body justify-content-center align-items-center">
                                        <p  class="ciudad">Ciudad</p>
                                        <h5 class="card-title">${data[i].name}</h5>
                                        <p class="card-text">${data[i].description}</p>
                                    </div>
                                </div>`;
    
            contenedor.appendChild(tarjeta);
        }

        let contenedor2 = document.getElementById("contenedor");
        for (let i = 0; i < dataAN[0].naturalAreas.length; i++) {
            let tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta";
            tarjeta.innerHTML = `   <div class="card row" >
                                    <img src="https://img.freepik.com/vector-premium/icono-vector-silueta-montana-picos-rocosos-cordilleras-icono-montana-blanco-negro_574545-202.jpg" class="card-img-top-details p-2" alt=""/>
                                    <div class="card-body justify-content-center align-items-center">
                                        <p class="area-natural">Área Natural</p>    
                                        <h5 class="card-title">${dataAN[0].naturalAreas[i].name}</h5>
                                    </div>
                                </div>`;
    
            contenedor2.appendChild(tarjeta);
        }
    })


})

/*
fetch(urlNaturalareas).then(response => response.json()).then(data => {
    console.log(data)

    

})

*/


