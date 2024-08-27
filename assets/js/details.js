//  Importamos la vista del DOM
import { viewDomDetails, viewDomDetailsVacio } from "./module/viewDom.js";

// Limpiar tarjetas
function LimpiarTarjetas() {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}

//  Declaramos Variables y constantes
const contenedor = document.getElementById("contenedor");
let urlLocal = new URLSearchParams(window.location.search);
let id = urlLocal.get("id");
console.log(id);

let url = "https://api-colombia.com/";
let urlFinal = url + "api/v1/Department/" + id;
let urlCities = urlFinal + "/cities";
let urlNaturalareas = urlFinal + "/naturalareas";
let depa = "";

fetch(urlFinal)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    depa = data.name;

    let name = document.getElementById("name");
    name.innerHTML += `<h1>${data.name} - Departamento de <span class="yellow">Col</span><span class="blue">om</span><span class="red">bia</span></h1>`;

    let imagen = document.getElementById("imagen");
    imagen.innerHTML += `<img src="../assets/img/departamentos/${data.name}.png" alt=""/>`;

    let description = document.getElementById("description");
    description.innerHTML += `  <p>${data.description}</p>
                                    <p>${
                                      data.cityCapital.name
                                    }, es la capital del departamento</p>
                                    <p>Municipios: ${data.municipalities}</p>
                                    <p>Población: ${Intl.NumberFormat(
                                      "de-DE"
                                    ).format(data.population)}</p>`;
  });

fetch(urlCities)
  .then((response) => response.json())
  .then((dataCuidad) => {
    fetch(urlNaturalareas)
      .then((response) => response.json())
      .then((dataAN) => {
        // extraer name y description de dataCuidad y crea un array nuevo de Cuidad
        let arrayCuidad = dataCuidad.map((city) => {
          return {
            name: city.name,
            description: city.description,
            caption: "Cuidad",
          };
        });

        //  Busca dentro del array en campo de las areas naturales
        let arraynaturalareas = dataAN[0].naturalAreas;

        // extraer name de arraynaturalareas y crea un array nuevo de naturalArea
        let arrayNaturalArea = arraynaturalareas.map(
          (naturalArea) => naturalArea.name
        );

        // eliminar duplicados del array arrayNaturalArea
        const uniqueElements = [...new Set(arrayNaturalArea)];

        //  Despues de depurar nos name de arrayNaturalArea, crea un array nuevo de naturalArea
        let newArrayNaturalAreas = uniqueElements.map((naturalArea) => {
          return {
            name: naturalArea,
            description: "",
            caption: "Áreas Naturales",
          };
        });

        //  Unimos en un solo array el arrayCuidad y el arrayCuidad
        let arrayFinal = arrayCuidad.concat(newArrayNaturalAreas);
        console.log(arrayFinal);

        //  Mostramos por DOM la info del N° de cuidades y N° de areas natutales del departamento
        let cuidades = document.getElementById("cuidades");
        cuidades.innerHTML += `<h2>${depa} tiene <strong>${dataCuidad.length}</strong> Ciudades y <strong>${uniqueElements.length}</strong> Áreas Naturales:</h2>`;

        //  Cargamos por DOM los datos del array Final
        LimpiarTarjetas();
        viewDomDetails(contenedor, arrayFinal);

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
            let nuevoArreglo = arrayFinal.filter((e) =>
              arreglo.includes(e.caption)
            );
            console.log(nuevoArreglo);

            if (nuevoArreglo.length === 0) {
              LimpiarTarjetas();
              viewDomDetailsVacio(contenedor);
            } else {

            //  Cargamos por DOM los datos checkbox activamos
            LimpiarTarjetas();
            viewDomDetails(contenedor, nuevoArreglo);

            //  Escuchamos el input y lo guardamos en un array
            document.getElementById("search").addEventListener("input", (e) => {
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
                viewDomDetails(contenedor, arregloFiltroLetra);
              }
            });}
          } else {
            //  si NO hay checkbox Activados

            //  Cargamos por DOM los datos del Array Final
            LimpiarTarjetas();
            viewDomDetails(contenedor, arrayFinal);

            //  Escuchamos el input y lo guardamos en un array
            document.getElementById("search").addEventListener("input", (e) => {
              let input = e.target.value.toLowerCase();
              const arregloFiltroLetra = arrayFinal.filter((e) =>
                e.name.toLowerCase().includes(input)
              );
              console.log(arregloFiltroLetra);

              if (arregloFiltroLetra.length === 0) {
                LimpiarTarjetas();
                viewDomDetailsVacio(contenedor);
              } else {

              //  Cargamos por DOM los datos del Array Final segun el filtro del input

              LimpiarTarjetas();
              viewDomDetails(contenedor, arregloFiltroLetra);}
            });
          }
        });

        /*---------------------------------------- Filtro por Buscar ----------------------------------------*/
        //  Escuchamos el input y lo guardamos en un array
        document.getElementById("search").addEventListener("input", (e) => {
          let input = e.target.value.toLowerCase();
          const arregloFiltroLetra = arrayFinal.filter((e) =>
            e.name.toLowerCase().includes(input)
          );
          console.log(arregloFiltroLetra);

          if (arregloFiltroLetra.length === 0) {
            LimpiarTarjetas();
            viewDomDetailsVacio(contenedor);
          } else {
            //  Cargamos por DOM los datos que guardamos en un array
            LimpiarTarjetas();
            viewDomDetails(contenedor, arregloFiltroLetra);

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
                  viewDomDetails(contenedor, nuevoArreglo);}
                } else {
                  //  si NO hay checkbox Activados
                  //  Cargamos por DOM los datos del filtro del input segun lo guardamos en un array inical del input
                  LimpiarTarjetas();
                  viewDomDetails(contenedor, arregloFiltroLetra);
                }
              });
          }
        });
      });
  });
