console.log("./src/trading.js");

async function estrategia() {
  dadosJaColetados()
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
  // const lucro =  parseFloat((parseFloat((parseFloat((venderAlvo/descontoTaxa).toFixed(3))-1).toFixed(3))*100).toFixed(2))
  const lucro = parseFloat((((venderAlvo/comprarAlvo)-(configuracao.taxa+1))*100).toFixed(1))
  const volumeMoney = parseFloat(((comprarAlvo*(lucro/100))*volumeMedioHora).toFixed(2))
  
  console.log(item);
  const objetos = {
    'name':name,
    'link':link,
    'Venda': venderAlvo,
    '0a0': descontoTaxa,
    'compra': comprarAlvo,
    'quantidade': quantidadeAComprar,
    'lucro': lucro,
    'volume': volumeMedioHora,
    'Dinheiro':volumeMoney
    }
    if(lucro >=7){
      itemTradeData.push(objetos)
    }
    
    i++
  }
  itemTradeData.sort((a, b) => b.lucro - a.lucro);
  console.table(itemTradeData)

  return itemTradeData
}
function dadosJaColetados(){
  let quantidadeItens = parseInt(quantItens.value);
  let ofertasMinimas = parseInt(valorMinimo.value);
  let intervaloHora = parseInt(intervaloDeHoras.value);
  let volumeMedio = parseInt(volumeMedioPorHora.value);
  let cotacaoMinima = parseFloat(precoMinimo.value);
  let cotacaoMaxima = parseFloat(precoMaximo.value);
  let TempoDeCompra = parseInt(tempoDeCompra.value)
  let capital = parseFloat(capitalCaixa.value)
  config(
    quantidadeItens,
    ofertasMinimas,
    intervaloHora,
    volumeMedio,
    cotacaoMinima,
    cotacaoMaxima,
    TempoDeCompra,
    capital
  );
}

botaoDadosColetados.addEventListener("click", estrategia);
