let urlLocal = new URLSearchParams(window.location.search);
let id = urlLocal.get("id");
console.log(id);

let url = "https://api-colombia.com/";
let urlFinal = url + "api/v1/Department/" + id;
let urlCities = urlFinal + "/cities";
let urlNaturalareas = urlFinal + "/naturalareas";

fetch(urlFinal)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        let name = document.getElementById("name");
        name.innerHTML += `<h1>${data.name} - Departamento de <span class="yellow">Col</span><span class="blue">om</span><span class="red">bia</span></h1>`;

        let imagen = document.getElementById("imagen");
        imagen.innerHTML += `<img src="../assets/img/departamentos/${data.name}.png" alt=""/>`;

        let description = document.getElementById("description");
        description.innerHTML += `  <p>${data.description}</p>
                                    <p>Municipios: ${data.municipalities}</p>
                                    <p>Población: ${Intl.NumberFormat("de-DE").format(data.population)}</p>`;
    });

fetch(urlCities)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        // extraer las name del array arraynaturalareas
        let arraynamesNaturalareas = data.map((naturalArea) => naturalArea.name);
        console.log(arraynamesNaturalareas);

        fetch(urlNaturalareas)
            .then((response) => response.json())
            .then((dataAN) => {
                console.log(dataAN);
                //console.log(dataAN[0].naturalAreas)

                let arraynaturalareas = dataAN[0].naturalAreas;
                //console.log(arraynaturalareas);

                // extraer name y description del array arraynaturalareas
                let arrayNaturalAreas2 = data.map((naturalArea) => {
                    return {
                        name: naturalArea.name,
                        description: naturalArea.description,
                        caption: "Cuidad",
                    };
                });
                console.log(arrayNaturalAreas2);

                let arraynamesNaturalareas = arraynaturalareas.map((naturalArea) => naturalArea.name);
                //console.log(arraynamesNaturalareas);

                // eliminar duplicados del array
                const uniqueElements = [...new Set(arraynamesNaturalareas)];
                console.log(uniqueElements);

                let arrayNaturalAreas3 = uniqueElements.map((naturalArea) => {
                    return {
                        name: naturalArea,
                        description: "",
                        caption: "Área Natural",
                    };
                });
                console.log(arrayNaturalAreas3);

                arrayfINAL = arrayNaturalAreas2.concat(arrayNaturalAreas3);
                console.log(arrayfINAL);

                let cuidades = document.getElementById("cuidades");
                cuidades.innerHTML += `<h2>${data.length} Ciudades y ${uniqueElements.length} Áreas Naturales:</h2>`;

                let contenedor = document.getElementById("contenedor");
                for (let i = 0; i < arrayfINAL.length; i++) {
                    let tarjeta = document.createElement("div");
                    tarjeta.className = "tarjeta";
                    tarjeta.innerHTML = `   <div class="card row" >
                                    <img src="https://img.freepik.com/vector-premium/icono-vector-silueta-montana-picos-rocosos-cordilleras-icono-montana-blanco-negro_574545-202.jpg" class="card-img-top-details p-2" alt=""/>
                                    <div class="card-body justify-content-center align-items-center">
                                        <p  class="${arrayfINAL[i].caption==='Cuidad' ? 'ciudad' : 'area-natural'}">${arrayfINAL[i].caption}</p>
                                        <h5 class="card-title">${arrayfINAL[i].name}</h5>
                                        <p class="card-text">${arrayfINAL[i].description}</p>
                                    </div>
                                </div>`;

                    contenedor.appendChild(tarjeta);
                }

            });
    });


