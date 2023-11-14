const configuracao = {
  // Config para coleta de API
  quantidadeParaPesquisar: 5000,
  ofertasMinimas: 5000,
  precoPrimario: 10.0,
  cotacaoDolar: 4.91,
  //Config após coleta de API
  horas: 336,
  volume: 10000,
  precoMinimo: 0.1,
  precoMaximo: 0.4,
};

let item = {
  precoDeVenda: 0.25,
  ofertasListadas: 5000,
  name: "Dreams%20%26%20Nightmares%20Case",
  id: 730,
  cotacao: [],
  idBook: "",
};

// var nameRegex = /\/market\/listings\/\d+\/([^"]+)"/;
// var idRegex = /\/(\d+)\/([^"]+)"/;
// var quantidadeRegex = /data-qty="([^"]+)"/;
// var precoRegex = /data-price="([^"]+)"/;

console.log("oi");
console.log(configuracao.horas);
