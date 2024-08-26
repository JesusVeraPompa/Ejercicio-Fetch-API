export let viewDomIndex = (idHtmlConteiner, data) => {
    for (let i = 0; i < data.length; i++) {
        let tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.innerHTML = `   <div class="card row" >
                                    <img src="./assets/img/departamentos/${data[i].name}.png" class="card-img-top p-2" alt=""/>
                                    <div class="card-body justify-content-center align-items-center">
                                        <h5 class="card-title">${data[i].name}</h5>
                                        <p class="card-text">${data[i].description}</p>
                                        <div class="row justify-content-center align-items-center">
                                            <div class="col">
                                                <a id="boton${data[i].id}" href="./pages/details.html?id=${data[i].id}" class="btn btn-primary" onClick="valorDelID('${data[i].id}')">Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
        idHtmlConteiner.appendChild(tarjeta);
    }
};

export let viewDomDetails = (idHtmlConteiner, data) => {
    for (let i = 0; i < data.length; i++) {
        let tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.innerHTML = `   <div class="card row" >
                                <img src="https://img.freepik.com/vector-premium/icono-vector-silueta-montana-picos-rocosos-cordilleras-icono-montana-blanco-negro_574545-202.jpg" class="card-img-top-details p-2" alt=""/>
                                <div class="card-body justify-content-center align-items-center">
                                    <p  class="${data[i].caption === "Cuidad"
                ? "ciudad"
                : "area-natural"
            }">${data[i].caption}</p>
                                    <h5 class="card-title">${data[i].name}</h5>
                                    <p class="card-text">${data[i].description
            }</p>
                                </div>
                            </div>`;
        idHtmlConteiner.appendChild(tarjeta);
    }
};

export let viewDomDetailsVacio = (idHtmlConteiner) => {
    let tarjeta = document.createElement("div");
    tarjeta.innerHTML = `   
                                <div >
                                    <h4 class="p-2">Lo sentimos, no hay ningún registro para mostrar..</h4>
                                </div>`;
    idHtmlConteiner.appendChild(tarjeta);
};
