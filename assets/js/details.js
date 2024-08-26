//  Importamos la vista del DOM
import { viewDomDetails,viewDomDetailsVacio } from "./module/viewDom.js";

const contenedor = document.getElementById("contenedor");
// Limpiar tarjetas
function LimpiarTarjetas() {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

let urlLocal = new URLSearchParams(window.location.search);
let id = urlLocal.get("id");
//console.log(id);

let url = "https://api-colombia.com/";
let urlFinal = url + "api/v1/Department/" + id;
let urlCities = urlFinal + "/cities";
let urlNaturalareas = urlFinal + "/naturalareas";
let depa="";

fetch(urlFinal)
  .then((response) => response.json())
  .then((data) => {
    //console.log(data);
    depa=data.name

    let name = document.getElementById("name");
    name.innerHTML += `<h1>${data.name} - Departamento de <span class="yellow">Col</span><span class="blue">om</span><span class="red">bia</span></h1>`;

    let imagen = document.getElementById("imagen");
    imagen.innerHTML += `<img src="../assets/img/departamentos/${data.name}.png" alt=""/>`;

    let description = document.getElementById("description");
    description.innerHTML += `  <p>${data.description}</p>
                                    <p>${data.cityCapital.name
      }, es la capital del departamento</p>
                                    <p>Municipios: ${data.municipalities}</p>
                                    <p>Población: ${Intl.NumberFormat(
        "de-DE"
      ).format(data.population)}</p>`;
  });

fetch(urlCities)
  .then((response) => response.json())
  .then((data) => {
    //console.log(data);

    // extraer las name del array arraynaturalareas
    let arraynamesNaturalareas = data.map((naturalArea) => naturalArea.name);
    //console.log(arraynamesNaturalareas);

    fetch(urlNaturalareas)
      .then((response) => response.json())
      .then((dataAN) => {
        //console.log(dataAN);
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
        //console.log(arrayNaturalAreas2);

        let arraynamesNaturalareas = arraynaturalareas.map(
          (naturalArea) => naturalArea.name
        );
        //console.log(arraynamesNaturalareas);

        // eliminar duplicados del array
        const uniqueElements = [...new Set(arraynamesNaturalareas)];
        //console.log(uniqueElements);

        let arrayNaturalAreas3 = uniqueElements.map((naturalArea) => {
          return {
            name: naturalArea,
            description: "",
            caption: "Áreas Naturales",
          };
        });
        //console.log(arrayNaturalAreas3);

        let arrayfINAL = arrayNaturalAreas2.concat(arrayNaturalAreas3);
        console.log(arrayfINAL);

        let cuidades = document.getElementById("cuidades");
        cuidades.innerHTML += `<h2>${depa} tiene <strong>${data.length}</strong> Ciudades y <strong>${uniqueElements.length}</strong> Áreas Naturales:</h2>`;

        viewDomDetails(contenedor, arrayfINAL);

        
        /*--------------------------------buscar texto------------------------------------------------------------------*/
        document.getElementById("search").addEventListener("input", (e) => {
          let input = e.target.value.toLowerCase();
          let arregloFiltroLetra = arrayfINAL.filter((e) =>
            e.name.toLowerCase().includes(input)
          );
          //console.log(input);
          //console.log(arregloFiltroLetra);
          if (!input) {
            LimpiarTarjetas();
            viewDomDetails(contenedor, arrayfINAL);
            arregloFiltroLetra=[];
          } else {
            if (arregloFiltroLetra.length === 0) {
              LimpiarTarjetas();
              viewDomDetailsVacio(contenedor);
              arregloFiltroLetra=[];
            } else {
              // Limpiar tarjetas
              LimpiarTarjetas();
              // Cargar tarjetas filtradas
              viewDomDetails(contenedor, arregloFiltroLetra);


              document
                .getElementById("category")
                .addEventListener("change", (e) => {
                  //console.log(e.target);
                  let checkboxChekeados = document.querySelectorAll(
                    "input[type=checkbox]:checked"
                  );
                  let arreglo1 = Array.from(checkboxChekeados).map(
                    (e) => e.value
                  );
                  //console.log(arreglo);
                  let nuevoArreglo = arregloFiltroLetra.filter((e) =>
                    arreglo1.includes(e.caption)
                  );
                  //console.log(nuevoArreglo);

                  if (nuevoArreglo.length === 0) {
                    LimpiarTarjetas();
                    viewDomDetails(contenedor, arregloFiltroLetra);

                  } else {
                    // Limpiar tarjetas
                    LimpiarTarjetas(); nuevoArreglo
                    // Cargar tarjetas filtradas
                    viewDomDetails(contenedor, nuevoArreglo);

                  }
                });
            }
          }
        });

        /*--------------------------------------------------------------------------------------------------*/
        //  Filtro por categoría
        document.getElementById("category").addEventListener("change", (e) => {
          //console.log(e.target);
          let checkboxChekeados1 = document.querySelectorAll(
            "input[type=checkbox]:checked"
          );
          let arreglo1 = Array.from(checkboxChekeados1).map((e) => e.value);
          //console.log(arreglo);
          let nuevoArreglo1 = arrayfINAL.filter((e) =>
            arreglo1.includes(e.caption)
          );
          //console.log(nuevoArreglo1);

          if (nuevoArreglo1.length === 0) {
            LimpiarTarjetas();
            viewDomDetails(contenedor, arrayfINAL);

          } else {
            // Limpiar tarjetas
            LimpiarTarjetas();
            // Cargar tarjetas filtradas
            viewDomDetails(contenedor, nuevoArreglo1);


            document.getElementById("search").addEventListener("input", (e) => {
              let input1 = e.target.value.toLowerCase();
              let arregloFiltroLetra1 = nuevoArreglo1.filter((e) =>
                e.name.toLowerCase().includes(input1)
              );
              //console.log(input1);
              //console.log(arregloFiltroLetra1);
              if (!input1) {
                LimpiarTarjetas();
                viewDomDetails(contenedor, arrayfINAL);
                arregloFiltroLetra1=[];
              } else {
                if (arregloFiltroLetra1.length === 0) {
                  LimpiarTarjetas();
                  viewDomDetailsVacio(contenedor);
                  arregloFiltroLetra1=[];
                } else {
                  // Limpiar tarjetas
                  LimpiarTarjetas();
                  // Cargar tarjetas filtradas
                  viewDomDetails(contenedor, arregloFiltroLetra1);
    
                }
              }
            });
          }
        }
        );
      });
  });
