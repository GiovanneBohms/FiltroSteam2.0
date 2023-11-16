const configuracao = {
  // Config para coleta de API
  quantidadeParaPesquisar: 10000,
  ofertasMinimas: 5000,
  cotacaoDolar: 4.91,
  //Config após coleta de API
  horas: 336,
  //VolumeMedioHora de 700 já é considerado alto
  volumeMedioHora: 400,
  precoMinimo: 0.16,
  precoMaximo: 0.50,
  // CSGO:730 DOTA: 570 TF2: 440
  idsPermitidos: [730,570,440] 
};

class Item{
  id
  name
  ofertasQuant
  precoDeVenda
  volumeMedioPorHora
  cotacoes
  idBook
  link
  constructor(precoDeVenda, ofertasQuant, name, id){
    this.name = name;
    this.id = Number(id);
    this.precoDeVenda = parseFloat((((Number(precoDeVenda))/100)*configuracao.cotacaoDolar).toFixed(2));
    this.ofertasQuant = Number(ofertasQuant);
  }
  setCotacoes(cotacoes){
    this.cotacoes = cotacoes;
  }
  setIdBook(idBook){
    this.idBook = idBook;
  }
  setVolumeMedioPorHora(volumeMedioPorHora){
    this.setVolumeMedioPorHora = volumeMedioPorHora
  }
  setLink(){
    this.link = `https://steamcommunity.com/market/listings/${this.id}/${this.name}`
  }
}