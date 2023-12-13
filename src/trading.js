console.log("./src/trading.js");

function rastreiNumerosProibidos(itens) {
  let listaPrimaria = [];
  let listaProibida = [];
  let valores = 0;
  let j = 0;

  for (let i = 0; i < 1000; i++) {
    valores += 1;
    listaPrimaria.push(valores / 100);
  }
}

async function estrategia() {

  capturarFiltro("estrategia")
  let itens = await visualizaDB();

  let itemTradeData =[]
  let i = 0
  while(i<itens.length){
  const item = itens[i]
  const link =`https://steamcommunity.com/market/listings/${item.itemId}/${item.itemName}`
  const name = item.itemName
  const bookOferta = item.bookOferta
  const bookEncomenda = item.bookEncomenda
  const volumeMedioHora = item.volumeMedioHora

  const venderAlvo = (bookOferta.find(item => item[1] >= volumeMedioHora))[0];
  const comprarAlvo = (bookEncomenda.find(item => item[1] >= (volumeMedioHora*configuracao.tempoDeCompra)))[0]
  const quantidadeAComprar = parseInt(configuracao.capital/comprarAlvo)
  const descontoTaxa = parseFloat((comprarAlvo*(configuracao.taxa+1)).toFixed(2))
  const lucro = parseFloat((((venderAlvo/comprarAlvo)-(configuracao.taxa+1))*100).toFixed(1))
  const volumeMoney = parseFloat(((comprarAlvo*(lucro/100))*volumeMedioHora).toFixed(2))
  const tempoAlvo = parseInt(((bookEncomenda.find(item => item[1] >= (volumeMedioHora*configuracao.tempoDeCompra)))[1])/volumeMedioHora)
  
 
  let volumeTodo = 0
  const ultimosDias = item.cotacoes.slice(-72)
  ultimosDias.forEach(e => {
    volumeTodo +=e [1]
  });
  let volumeMedioHoraUD = parseInt(volumeTodo/ultimosDias.length)
  const venderAlvoUD = (bookOferta.find(item => item[1] >= volumeMedioHoraUD))[0];
  const comprarAlvoUD = (bookEncomenda.find(item => item[1] >= (volumeMedioHoraUD*configuracao.tempoDeCompra)))[0]
  const tempoAlvoUD = parseInt(((bookEncomenda.find(item => item[1] >= (volumeMedioHoraUD*configuracao.tempoDeCompra)))[1])/volumeMedioHoraUD)
  const quantidadeAComprarUD = parseInt(configuracao.capital/comprarAlvoUD)
  const descontoTaxaUD = parseFloat((comprarAlvoUD*(configuracao.taxa+1)).toFixed(2))
  const lucroUD = parseFloat((((venderAlvoUD/comprarAlvoUD)-(configuracao.taxa+1))*100).toFixed(1))
  const volumeMoneyUD = parseFloat(((comprarAlvoUD*(lucroUD/100))*volumeMedioHoraUD).toFixed(2))
  ///

  const objetos = {
    'nome': decodeURIComponent(name),
    'link':link,
    'venda': venderAlvo,
    'zeroAZero': descontoTaxa,
    'compra': comprarAlvo,
    'quantidade': quantidadeAComprar,
    'lucro': lucro,
    'volume': volumeMedioHora,
    'dinheiro':volumeMoney,
    'tempoAlvo':tempoAlvo,

    'volumeUD': volumeMedioHoraUD,
    'tempoAlvoUD':tempoAlvoUD,
    'vendaUD': venderAlvoUD,
    'zeroAZeroUD': descontoTaxaUD,
    'compraUD': comprarAlvoUD,
    'quantidadeUD': quantidadeAComprarUD,
    'lucroUD': lucroUD,
    'dinheiroUD':volumeMoneyUD,
    }
    if(objetos.volume>=configuracao.volumeMedioHora && (lucro >=15 || lucroUD >= 15)){
      itemTradeData.push(objetos)
    }
    console.log(objetos)
    i++
  }
  itemTradeData.sort((a, b) => b.lucro - a.lucro);
  console.table(itemTradeData)

  printItensFiltrados(itemTradeData)
}



