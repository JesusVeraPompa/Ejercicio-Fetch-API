//  Importamos la vista del DOM
import { viewDomIndex, viewDomDetailsVacio } from "./module/viewDom.js";

const contenedor = document.getElementById("contenedor");
// Limpiar tarjetas
function LimpiarTarjetas() {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

let url = "https://api-colombia.com/";
let urlFinal = url + "/api/v1/Department";
let urlRegions = url + "/api/v1/Region";

fetch(urlFinal)
  .then((response) => response.json())
  .then((dataFinal) => {
    console.log(dataFinal);

    fetch(urlRegions)
      .then((response) => response.json())
      .then((dataRegions) => {
        console.log(dataRegions);
        let category = document.getElementById("category");
        for (let i = 0; i < dataRegions.length; i++) {
          let check = document.createElement("div");
          check.className = "check";
          check.innerHTML = ` <div class="form-check-inline py-2">
                        <input class="form-check-input" type="checkbox" id="${dataRegions[i].id}" value="${dataRegions[i].id}" />
                        <label class="form-check-label" for="flexCheckDefault1"> ${dataRegions[i].name} </label>
                        </div>
                        `;

          category.appendChild(check);
        }

        let departamentos = document.getElementById("departamentos");
        departamentos.innerHTML += `<h2>Colombia tiene <strong>${dataFinal.length}</strong> Departamentos:</h2>`;

        viewDomIndex(contenedor, dataFinal);

        /*---------------------------------------- Filtro por Categoría ----------------------------------------*/
        //  escuchamos el cambio del checkbox y lo guardamos en un array
        document.getElementById("category").addEventListener("change", (e) => {
          let checkboxChekeados = document.querySelectorAll(
            "input[type=checkbox]:checked"
          );
          let arreglo = Array.from(checkboxChekeados).map((e) => e.value);
          console.log(arreglo);

          //  si hay checkbox Activados
          if (arreglo.length > 0) {
            // creamos un array en base a los checkbox activamos
            let nuevoArreglo = dataFinal.filter((e) =>
              arreglo.includes(e.regionId.toString())
            );
            console.log(nuevoArreglo);

            if (nuevoArreglo.length === 0) {
              LimpiarTarjetas();
              viewDomDetailsVacio(contenedor);
            } else {
              //  Cargamos por DOM los datos checkbox activamos
              LimpiarTarjetas();
              viewDomIndex(contenedor, nuevoArreglo);

              //  Escuchamos el input y lo guardamos en un array
              document
                .getElementById("search")
                .addEventListener("input", (e) => {
                  let input = e.target.value.toLowerCase();
                  const arregloFiltroLetra = nuevoArreglo.filter((e) =>
                    e.name.toLowerCase().includes(input)
                  );
                  console.log(arregloFiltroLetra);
                  if (arregloFiltroLetra.length === 0) {
                    LimpiarTarjetas();
                    viewDomDetailsVacio(contenedor);
                  } else {
                    //  Cargamos por DOM los datos checkbox activamos segun el filtro del input
                    LimpiarTarjetas();
                    viewDomIndex(contenedor, arregloFiltroLetra);
                  }
                });
            }
          } else {
            //  si NO hay checkbox Activados

            //  Cargamos por DOM los datos del Array Final
            LimpiarTarjetas();
            viewDomIndex(contenedor, dataFinal);

            //  Escuchamos el input y lo guardamos en un array
            document.getElementById("search").addEventListener("input", (e) => {
              let input = e.target.value.toLowerCase();
              const arregloFiltroLetra = dataFinal.filter((e) =>
                e.name.toLowerCase().includes(input)
              );
              console.log(arregloFiltroLetra);

              if (arregloFiltroLetra.length === 0) {
                LimpiarTarjetas();
                viewDomDetailsVacio(contenedor);
              } else {
                //  Cargamos por DOM los datos del Array Final segun el filtro del input
                LimpiarTarjetas();
                viewDomIndex(contenedor, arregloFiltroLetra);
              }
            });
          }
        });

        /*---------------------------------------- Filtro por Buscar ----------------------------------------*/
        //  Escuchamos el input y lo guardamos en un array
        document.getElementById("search").addEventListener("input", (e) => {
          let input = e.target.value.toLowerCase();
          const arregloFiltroLetra = dataFinal.filter((e) =>
            e.name.toLowerCase().includes(input)
          );
          console.log(arregloFiltroLetra);

          if (arregloFiltroLetra.length === 0) {
            LimpiarTarjetas();
            viewDomDetailsVacio(contenedor);
          } else {
            //  Cargamos por DOM los datos que guardamos en un array
            LimpiarTarjetas();
            viewDomIndex(contenedor, arregloFiltroLetra);

            //  escuchamos el cambio del checkbox y lo guardamos en un array
            document
              .getElementById("category")
              .addEventListener("change", (e) => {
                let checkboxChekeados = document.querySelectorAll(
                  "input[type=checkbox]:checked"
                );
                let arreglo = Array.from(checkboxChekeados).map((e) => e.value);
                console.log(arreglo);

                //  si hay checkbox Activados
                if (arreglo.length > 0) {
                  // creamos un array en base a los checkbox activamos
                  let nuevoArreglo = arregloFiltroLetra.filter((e) =>
                    arreglo.includes(e.caption)
                  );
                  console.log(nuevoArreglo);

                  if (nuevoArreglo.length === 0) {
                    LimpiarTarjetas();
                    viewDomDetailsVacio(contenedor);
                  } else {
                    //  Cargamos por DOM los datos del filtro del input segun el checkbox activo
                    LimpiarTarjetas();
                    viewDomIndex(contenedor, nuevoArreglo);
                  }
                } else {
                  //  si NO hay checkbox Activados
                  //  Cargamos por DOM los datos del filtro del input segun lo guardamos en un array inical del input
                  LimpiarTarjetas();
                  viewDomIndex(contenedor, arregloFiltroLetra);
                }
              });
          }
        });
      });
  });
