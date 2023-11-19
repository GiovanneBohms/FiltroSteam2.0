async function coletaBook(){
  const itens = await coletaCotacoes()
  let i = 0;
  let d=0
  while(i < itens.length){
    const book = await coletaOfertaEncomendaDoBook(itens[i].idBook)

    if(!book){
      d++
      console.log(`Um delay de ${d} minutos foi aplicado a API do book`)
      await delay(1000*d)
      continue;
    }

    const ofertasEncomendas = {
    encomendas: book.buy_order_graph,
    ofertas: book.sell_order_graph
    }
    itens[i].setBook(ofertasEncomendas)
    console.log(itens[i].name,itens[i].book)
    i++
  }
  console.log("Books coletados",itens.length)
}