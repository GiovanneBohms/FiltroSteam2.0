async function coletaBook(){
  const itens = await coletaCotacoes()
  const book = await coletaOfertaEncomendaDoBook(itens[0].idBook)
  console.log(book.buy_order_graph)
  console.log(book.sell_order_graph)


}