const configuracao = {
  // Config para coleta de API
  quantidadeParaPesquisar: 100,
  ofertasMinimas: 5000,
  precoPrimario: 10.0,
  cotacaoDolar: 4.91,
  //Config após coleta de API
  horas: 336,
  volume: 10000,
  precoMinimo: 0.16,
  precoMaximo: 2.00,
  id: !753 //cartas que levam 1 semana para poder revender
};

class Item{
  id
  name
  ofertasQuant
  precoDeVenda
  cotacoes
  idBook
  
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
}

