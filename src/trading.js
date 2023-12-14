console.log("./src/trading.js");

function tempoDeCompraSubtraido(bookEncomenda, volumeMedioHora) {
  let tempoAlvo = 0;
  let reducaoDoTempoDeCompra = 0;
  reducaoDoTempoDeCompra = configuracao.tempoDeCompra;

  if(volumeMedioHora*reducaoDoTempoDeCompra > bookEncomenda[bookEncomenda.length-1][1]){
    tempoAlvo = parseInt(bookEncomenda[bookEncomenda.length-1][1]/volumeMedioHora)
    console.log("tempoAlvo Corrigido:",tempoAlvo)
    return parseInt(tempoAlvo)
  }

  do {
    tempoAlvo = parseInt(((bookEncomenda.find(item => item[1] >= (volumeMedioHora * reducaoDoTempoDeCompra)))[1]) / volumeMedioHora);
    if(tempoAlvo>configuracao.tempoDeCompra && reducaoDoTempoDeCompra >1){
      reducaoDoTempoDeCompra--;
    }else{break}
  } while (tempoAlvo > configuracao.tempoDeCompra);
  if(tempoAlvo>configuracao.tempoDeCompra){tempoAlvo=configuracao.tempoDeCompra}
  console.log(tempoAlvo, configuracao.tempoDeCompra);
  return tempoAlvo
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
  const tempoAlvo = tempoDeCompraSubtraido(bookEncomenda,volumeMedioHora)
  const comprarAlvo = (bookEncomenda.find(item => item[1] >= (volumeMedioHora*tempoAlvo)))[0]
  const quantidadeAComprar = parseInt(configuracao.capital/comprarAlvo)
  const descontoTaxa = parseFloat((comprarAlvo*(configuracao.taxa+1)).toFixed(2))
  const lucro = parseFloat((((venderAlvo/comprarAlvo)-(configuracao.taxa+1))*100).toFixed(1))
  const volumeMoney = parseFloat(((comprarAlvo*(lucro/100))*volumeMedioHora).toFixed(2))

// Últimos 3 dias
  let volumeTodoUD = 0
  const ultimosDias = item.cotacoes.slice(-72)
  ultimosDias.forEach(e => {
    volumeTodoUD +=e [1]
  });
  const volumeMedioHoraUD = parseInt(volumeTodoUD/ultimosDias.length)
  const venderAlvoUD = (bookOferta.find(item => item[1] >= volumeMedioHoraUD))[0];
  const tempoAlvoUD = tempoDeCompraSubtraido(bookEncomenda, volumeMedioHoraUD)
  const comprarAlvoUD = (bookEncomenda.find(item => item[1] >= (volumeMedioHoraUD*tempoAlvoUD)))[0]
  const quantidadeAComprarUD = parseInt(configuracao.capital/comprarAlvoUD)
  const descontoTaxaUD = parseFloat((comprarAlvoUD*(configuracao.taxa+1)).toFixed(2))
  const lucroUD = parseFloat((((venderAlvoUD/comprarAlvoUD)-(configuracao.taxa+1))*100).toFixed(1))
  const volumeMoneyUD = parseFloat(((comprarAlvoUD*(lucroUD/100))*volumeMedioHoraUD).toFixed(2))

  const itemTratado = {
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
    if(itemTratado.volume>=configuracao.volumeMedioHora ){
      itemTradeData.push(itemTratado)
    }
    console.log(itemTratado)
    i++
  }
  itemTradeData.sort((a, b) => b.lucro - a.lucro);
  console.table(itemTradeData)

  printItensFiltrados(itemTradeData)
}