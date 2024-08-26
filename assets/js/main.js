//  Importamos la vista del DOM
import { viewDomIndex } from "./module/viewDom.js";

const contenedor = document.getElementById("contenedor");
// Limpiar tarjetas
function LimpiarTarjetas() {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

let url = "https://api-colombia.com/";
let urlFinal = url + "/api/v1/Department";

fetch(urlFinal)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        let departamentos = document.getElementById("departamentos");
        departamentos.innerHTML += `<h2>Colombia tiene <strong>${data.length}</strong> Departamentos:</h2>`;

        viewDomIndex(contenedor, data);

        document.getElementById("search").addEventListener("input", (e) => {
            let input = e.target.value.toLowerCase();
            let arregloFiltroLetra = data.filter((e) =>
                e.name.toLowerCase().includes(input)
            );
            //console.log(input);
            if (!input) {
                LimpiarTarjetas();
                viewDomIndex(contenedor, data);
            } else {
                if (arregloFiltroLetra.length === 0) {
                    LimpiarTarjetas();
                    let tarjeta = document.createElement("div");
                    tarjeta.innerHTML = `   
                                        <div >
                                                <h4 class="p-2">Lo sentimos, no hay ningún registro para mostrar..</h4>
                                    </div>`;
                    contenedor.appendChild(tarjeta);
                } else {
                    // Limpiar tarjetas
                    LimpiarTarjetas();
                    // Cargar tarjetas filtradas
                    viewDomIndex(contenedor, arregloFiltroLetra);
                }
            }
        });
    });

