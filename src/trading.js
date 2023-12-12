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
  // console.clear
  // dadosJaColetados()
  capturarFiltro("estrategia")
  let itens = await visualizaDB();
  // rastreiNumerosProibidos(itens)
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
  

  const objetos = {
    'nome': decodeURIComponent(name),
    'link':link,
    'venda': venderAlvo,
    'zeroAZero': descontoTaxa,
    'compra': comprarAlvo,
    'quantidade': quantidadeAComprar,
    'lucro': lucro,
    'volume': volumeMedioHora,
    'dinheiro':volumeMoney
    }

    itemTradeData.push(objetos)
    i++
  }
  itemTradeData.sort((a, b) => b.lucro - a.lucro);
  console.table(itemTradeData)

  printItensFiltrados(itemTradeData)
}

// function dadosJaColetados(){
//   // console.clear()
//   if(typeof quantItens !== 'undefined' && quantItens !== null){
//   let quantidadeItens = parseInt(quantItens.value);
//   let ofertasMinimas = parseInt(valorMinimo.value);
//   let intervaloHora = parseInt(intervaloDeHoras.value);
//   let volumeMedio = parseInt(volumeMedioPorHora.value);
//   let cotacaoMinima = parseFloat(precoMinimo.value);
//   let cotacaoMaxima = parseFloat(precoMaximo.value);
//   let TempoDeCompra = parseInt(tempoDeCompra.value)
//   let capital = parseFloat(capitalCaixa.value)
//   config(
//     quantidadeItens,
//     ofertasMinimas,
//     intervaloHora,
//     volumeMedio,
//     cotacaoMinima,
//     cotacaoMaxima,
//     TempoDeCompra,
//     capital
//   );
//   }
// }


