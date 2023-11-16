console.log("./src/coletaCotacoes.js");

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
  let i = 0;

  while (i < itens.length) {
    let stringCotacoesEIdBook = await coletaCotacoesEIdBook(
      itens[i].id,
      itens[i].name
    );
    if (!stringCotacoesEIdBook) {
      console.log("muitas requisições, aguarde 5 minutos");
      await delay(1000 * 60 * 5);
      continue;
    }
    let cotacoes = converteStringEmCotacoes(stringCotacoesEIdBook);
    let idBook = regexIdBook(stringCotacoesEIdBook);
    itens[i].setCotacoes(cotacoes);
    itens[i].setIdBook(idBook);
    itens[i].setLink();

    console.log(i + 1, "de", itens.length, itens[i]);
    i++;
  }

  abrirLinks(itens)
}

function abrirLinks(itens) {

  for(let i = 0; i< itens.length;i++){
    let link = itens[i].link;
    window.open(link, "_blank");
  }
  console.log("fim");
}
converteStringEmCotacaoEIDBook();
