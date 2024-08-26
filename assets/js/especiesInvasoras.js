let url = "https://api-colombia.com/";
let urlFinal = url + "/api/v1/InvasiveSpecie";

fetch(urlFinal)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);

        let contenedor = document.getElementById("contenedor2");
        for (let i = 0; i < data.length; i++) {
            let tarjeta = document.createElement("tr");

            if (data[i].riskLevel === 2) {
                tarjeta.className = "verde";
            } else if (data[i].riskLevel === 1) {
                tarjeta.className = "azul";
            } else {
                tarjeta.className = "blanco";
            }
            tarjeta.innerHTML = `
        

      <th scope="row" >${[i + 1]}</th>
      <td data-label="Nombre:"><strong>${data[i].name} </strong></td>
      <td data-label="Nombre Cientifico:">${data[i].scientificName}</td>
      <td data-label="Impacto:">${data[i].impact}</td>
      <td data-label="Manejo:">${data[i].manage}</td>
      <td data-label="Nivel de riesgo:"><strong>${data[i].riskLevel}</strong></td>
      <td data-label="Imagen:"><div><img class="img-div" src="${data[i].urlImage}"></div></td>

`;

            contenedor.appendChild(tarjeta);
        }
    });

("${data[i].riskLevel===2 ? 'verde' : 'area-natural'}");
