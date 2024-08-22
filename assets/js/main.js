let url="https://api-colombia.com/"
let urlFinal=url+"/api/v1/Department"

fetch(urlFinal).then(response => response.json()).then(data => {
    console.log(data)

    let contenedor = document.getElementById("contenedor");
    for (let i = 0; i < data.length; i++) {
        let tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.innerHTML = `   <div class="card row" >
                                <img src="/assets/img/departamentos/${data[i].name}.png" class="card-img-top p-2" alt=""/>
                                <div class="card-body justify-content-center align-items-center">
                                    <h5 class="card-title">${data[i].name}</h5>
                                    <p class="card-text">${data[i].description}</p>
                                    <div class="row justify-content-center align-items-center">
                                        <div class="col">
                                            <a id="boton" href="#" class="btn btn-primary" onClick="valorDelID('')">Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

        contenedor.appendChild(tarjeta);
    }
}) 