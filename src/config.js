console.log("./src/config.js")
let configuracao = {
  // Config para coleta de API
  quantidadeParaPesquisar: 200,
  ofertasMinimas: 5000,
  cotacaoDolar: 1,
  horas: 168,
  volumeMedioHora: 200,
  precoMinimo: 0.04,
  precoMaximo: 0.30,
  porcentagemDeLucro:0.15,
  taxa:0.15,
  // CSGO:730 DOTA: 570 TF2: 440
  idsPermitidos: [730,570,440],
  capital: 1000
};

function config(quantPesquisa,ofMinimas,horasTotais,volumeMedioPorHora,valorMinimo,valorMaximo,lucroPorcentagem,capital){

    configuracao.quantidadeParaPesquisar = quantPesquisa,
    configuracao.ofertasMinimas = ofMinimas,
    configuracao.cotacaoDolar = 1
    configuracao.horas = horasTotais
    configuracao.volumeMedioHora = volumeMedioPorHora
    configuracao.precoMinimo = valorMinimo,
    configuracao.precoMaximo = valorMaximo
    configuracao.porcentagemDeLucro = lucroPorcentagem
    // CSGO:730 DOTA: 570 TF2: 440
    // idsPermitidos= [730,570,440] 
    configuracao.capital = capital
  };

class Item{
  id
  name
  ofertasQuant
  precoDeVenda
  CompraAlvo
  encomendasPrecoAlvo
  venderAlvo
  ofertasPrecoAlvo
  volumeMedioPorHora
  cotacoes
  book
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
    this.volumeMedioPorHora = volumeMedioPorHora
  }
  setLink(){
    this.link = `https://steamcommunity.com/market/listings/${this.id}/${this.name}`
  }
  setBook(book){
    this.book = book;
  }
  setCompraAlvo(CompraAlvo){
    this.CompraAlvo = CompraAlvo
  }
  setEncomendasPrecoAlvo(encomendasPrecoAlvo){
    this.encomendasPrecoAlvo = encomendasPrecoAlvo
  }
  setOfertasPrecoAlvo(ofertasPrecoAlvo){
    this.ofertasPrecoAlvo = ofertasPrecoAlvo
  }
  setVenderAlvo(venderAlvo){
    this.venderAlvo = venderAlvo;
  }
}