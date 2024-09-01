let myChart;
const obtenerInformacion = async () => {
  try {
    const resultado = document.querySelector("#resultado");
    const monedaCLP = document.querySelector("#monedaCLP");
    let elSelect = document.querySelector("#elSelect");
    let url = elSelect.value;
    // console.log(url);
    const res = await fetch(`https://mindicador.cl/api/${url}`);
    const data = await res.json();
    //Variables para el grafico
    //slice trae un rango del 0 al 9 del arreglo
    let series = data.serie.slice(0, 9);
    //utilizo la variable serie que contiene el rango para el cabio de formato de fechas
    let fecha = series.map((seriess) => {
      return new Date(seriess.fecha).toLocaleDateString("en-GB");
    });
    // console.log(series);
    // console.log(fecha);

    const x = fecha.reverse();

    //uso la variable series que eh elegido un rango  con splice para iterarlo con map
    let valores = series.map((item) => item.valor);
    const y = valores.reverse();
    // console.log(y);

    //una vez seleccionadas el rango de las X y Y usamos char.js para mostrarlo en el grafico

    //Variables para los valores captar los valores de moneda

    let eldato = data.serie[0];
    let moneda = eldato["valor"];

    // console.log(moneda);
    let CLP = Number(monedaCLP.value);
    if (CLP === 0) {
      alert("Ingresa una cantidad");
    } else {
      let resultadoPesopordolar = CLP * 1;
      let totalMonedas = resultadoPesopordolar / moneda
      resultado.innerHTML = `$${parseFloat(totalMonedas.toFixed(2))}`;
      // console.log(CLP);
    }
    lasXY(x, y);
  } catch (error) {
    console.log(error);
  }
};
//se crea una funcion para destruir el grafico anterior y usar uno nuevo al hacer click
//se crea una variable global myChart
function lasXY(x, y) {
  var ctx = document.getElementById("myChart").getContext("2d");
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: x,
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: y,
        },
      ],
    },
  });
}