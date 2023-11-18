console.log("./src/coletaCotacoes.js");
function filtraVolumeCotacoes(arrayCotacoes){
  let volumeTotal = 0
  for(let i =0; i<arrayCotacoes.length; i++){
    volumeTotal += arrayCotacoes[i][2]
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

async function converteStringEmCotacaoEIDBook() {
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
    let idBook = regexIdBook(stringCotacoesEIdBook);
    // refatorar a partir daqui
    itens[i].setCotacoes(cotacoes);
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
    printItensFiltrados(itensOrdenados)
    // abrirLinks(itensFiltradosCotacao)
  }else{
    console.log("Nenhum item encontrado")
    telaAtualizações(`Nenhum item encontrado`)
  }
}

function ordenaItens(arrayDesordenado){
 return arrayDesordenado.sort((a, b) => b.volumeMedioPorHora - a.volumeMedioPorHora);
}

async function abrirLinks(itens) {
  console.log("Em 5 minutos as abas serão abertas")
  telaAtualizações(`Em 5 minutos as abas serão abertas`)
  await delay(1000*60*5)
  for(let i = 0; i< itens.length;i++){
    let link = itens[i].link;
    window.open(link, "_blank");
  }
  console.log("fim");
}

