const configuracao = {
  // Config para coleta de API
  quantidadeParaPesquisar: 100,
  ofertasMinimas: 1000,
  precoPrimario: 10.0,
  cotacaoDolar: 4.91,
  //Config após coleta de API
  horas: 336,
  volume: 10000,
  precoMinimo: 0.1,
  precoMaximo: 0.4,
};

class Item{
  constructor(precoDeVenda, ofertasListadas, name, id){
    this.name = name;
    this.id = Number(id);
    this.precoDeVenda = parseFloat((((Number(precoDeVenda))/100)*configuracao.cotacaoDolar).toFixed(2));
    this.ofertasListadas = Number(ofertasListadas);
  }
}

let item = {
  precoDeVenda: 0.25,
  ofertasListadas: 5000,
  name: "Dreams%20%26%20Nightmares%20Case",
  id: 730,
  cotacao: [],
  idBook: "",
};
