console.log("./src/trading.js");

async function estrategia() {
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
  const descontoTaxa = parseFloat((comprarAlvo*(configuracao.taxa+1)).toFixed(2))
  const lucro =  parseFloat((parseFloat((parseFloat((venderAlvo/descontoTaxa).toFixed(3))-1).toFixed(3))*100).toFixed(2))
  
  console.log(item);
  // console.log("vender Alvo:",venderAlvo)
  // console.log("0a0:",descontoTaxa)
  // console.log("comprar Alvo:",comprarAlvo)
  // console.log("porcentagem de lucro:",lucro)

  const objetos = {
    'link':link,
    'Vender Alvo': venderAlvo,
    '0a0': descontoTaxa,
    'compra Alvo': comprarAlvo,
    'lucro': lucro,
    'volume': volumeMedioHora
  }
  
  itemTradeData.push(objetos)
  i++
  }
  
  console.table(itemTradeData)
}
botaoDadosColetados.addEventListener("click", estrategia);
