console.log("./src/webCollect/book.js")

async function coletaBook(){
  const itens = await coletaCotacoes()
  let i = 0;
  let d=0
  while(i < itens.length){
    let book = await coletaOfertaEncomendaDoBook(itens[i].idBook)

    if(!book){
      d++
      console.log(`Um delay de ${d} minutos foi aplicado a API do book`)
      await delay(1000*d)
      continue;
    }

    encomendas = []
    book.buy_order_graph.forEach(e => {
      encomendas.push([e[0],e[1]])
    });

    ofertas =[]
    book.sell_order_graph.forEach(e => {
      ofertas.push([e[0],e[1]])
    });
    let ofertasEncomendas = {
    encomendas: encomendas,
    ofertas: ofertas
    }
    itens[i].setBook(ofertasEncomendas)

    telaAtualizações(`De ${itens.length} itens ${i+1} com o book atualizado`)
    console.log("De",itens.length,"itens",i+1,"com o book atualizado")
    await delay (1000*12)
    i++
  }
  console.log("Books coletados",itens.length)
  // console.log(itens)
  return itens
}

function subtracaoPorcentagem(preco,porcentagem) {
  let result = 0;
  let y = preco
  let reducao = porcentagem
  result = y / (1 + reducao);
  return parseFloat(result.toFixed(2))
}

function calculaOfertas(itens){
  let i = 0;

  while (i < itens.length) {
    let volume = itens[i].volumeMedioPorHora;
    let j = 0;
      while(j < itens[i].book.ofertas.length) {
        if(volume < itens[i].book.ofertas[j][1]){
          itens[i].setVenderAlvo(itens[i].book.ofertas[j][0])
          itens[i].setOfertasPrecoAlvo(itens[i].book.ofertas[j][1])
          break;
        }
        j++
      }
    i++;
  }
}

 function calculaEncomendas(itens){
  let i = 0;

  while (i < itens.length) {
    let preco = itens[i].venderAlvo;
    let alvo = subtracaoPorcentagem(preco, (configuracao.taxa));
    itens[i].setDescontoTaxa(alvo)
    let j = 0;

    if(itens[i].book.encomendas.some(item => item.includes(alvo))){
      while(j < (itens[i].book.encomendas.length)) {
        
        if(alvo > itens[i].book.encomendas[j][0]){
          itens[i].setEncomendasPrecoAlvo(itens[i].book.encomendas[j][1])
          break;
        }
        j++
      }}else{
        let ultimoIndex = (itens[i].book.encomendas.length)-1
        itens[i].setEncomendasPrecoAlvo(itens[i].book.encomendas[ultimoIndex][1])
        console.log("excessão em preço alvo de:", itens[i])
      }
      
    i++;
  }
}



async function calculaBook(){
  let itens = await coletaBook();
  await restartDB(itens)
  await estrategia("calculaBook")
}