console.log("./webCollect/coletaCotacoes.js");
function filtraVolumeCotacoes(arrayCotacoes){
  let volumeTotal = 0
  for(let i =0; i<arrayCotacoes.length; i++){
    volumeTotal += arrayCotacoes[i][1]
  }
  if(volumeTotal/arrayCotacoes.length >= configuracao.volumeMedioHora){
    return [true, volumeTotal/arrayCotacoes.length]
  }else{
    return [false, volumeTotal/arrayCotacoes.length]
  }
}

function converteStringEmCotacoes(stringCotacoesEIdBook) {
  const horas = configuracao.horas;
  let cotacoes = [];
  let arrayStringCotacoes = regexCotacao(stringCotacoesEIdBook);
  if(!arrayStringCotacoes){
    return null
  }
  arrayStringCotacoes = arrayStringCotacoes.slice(-horas);
  for (let i = 0; i < arrayStringCotacoes.length; i++) {
    let stringCotacao = arrayStringCotacoes[i];
    const jsonStringSemEscape = stringCotacao.replace(/\\/g, "");
    let cotacao = JSON.parse(jsonStringSemEscape);
    cotacao[2] = parseInt(cotacao[2], 10);
    cotacoes.push(cotacao);
  }
  return cotacoes;
}

async function coletaCotacoes() {
  let itens = await coletaIntervalos();
  let itensFiltradosCotacao=[]
  let i = 0;
  while (i < itens.length) {
    let stringCotacoesEIdBook = await coletaCotacoesEIdBook(
      itens[i].id,
      itens[i].name
    );
    if (!stringCotacoesEIdBook) {
      console.log("muitas requisições, aguarde 5 minutos");
      telaAtualizações(`muitas requisições, aguarde 5 minutos`)
      await delay(1000 * 60 * 5);
      continue;
    }
    let cotacoes = converteStringEmCotacoes(stringCotacoesEIdBook);
    if(!cotacoes){
      console.log("houve exceção na iteração e foi pulada",i)
      telaAtualizações(`houve exceção na iteração e foi pulada${i}`)
      ++i
      continue;
    }
    let idBook = regexIdBook(stringCotacoesEIdBook);
    
    let contacoesSemDate = []
    cotacoes.forEach(e => {
      contacoesSemDate.push([e[1],e[2]])
    });
    itens[i].setCotacoes(contacoesSemDate);
    itens[i].setIdBook(idBook);
    itens[i].setLink();
    let arraySegundoFiltro = filtraVolumeCotacoes(itens[i].cotacoes)

    if(arraySegundoFiltro[0]){
      itens[i].setVolumeMedioPorHora(arraySegundoFiltro[1])
      console.log("Volume Médio de:",parseInt(itens[i].volumeMedioPorHora),itens[i])
      telaAtualizações(`"Volume Médio de${parseInt(itens[i].volumeMedioPorHora)} ${itens[i]}`)
      itensFiltradosCotacao.push(itens[i])
    }
    console.log("segundo filtro de",itens.length,"itens",i+1,"foram verificados e",itensFiltradosCotacao.length,"passaram no teste")
    telaAtualizações(`segundo filtro de ${itens.length} itens ${i+1} foram verificados e ${itensFiltradosCotacao.length} passaram no teste`)
    await delay(13200);
    i++;
  }
  if(itensFiltradosCotacao.length >0){
    let itensOrdenados = ordenaItens(itensFiltradosCotacao)
    // printItensFiltrados(itensOrdenados)
    return itensOrdenados
  }else{
    console.log("Nenhum item encontrado")
    telaAtualizações(`Nenhum item encontrado`)
  }

}


function ordenaItens(arrayDesordenado){
 return arrayDesordenado.sort((a, b) => b.volumeMedioPorHora - a.volumeMedioPorHora);
}



