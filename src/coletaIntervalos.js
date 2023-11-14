console.log("./src/coletaIntervalos.js");

async function coletaItens(intervalo) {
  let objetos = await listaDeItens(intervalo);
  let matches = regexIdNamePriceQuant(objetos.results_html)
  let itens = [];

  for (const match of matches) {
    if (match[3] >= configuracao.ofertasMinimas) {
      itens.push({
        id: match[1],
        name: match[2],
        quantidade: match[3],
        preco: (match[4] / 100) * configuracao.cotacaoDolar,
      });
    } else {
      continue;
    }
  }

  return itens;
}

async function coletaIntervalos() {
  let intervalo = configuracao.quantidadeParaPesquisar;
  let todosOsItens = [];
  let i = 100;
  while (i <= intervalo) {
    let itensDoIntervalo = await coletaItens(i);
    if (!itensDoIntervalo) {
      console.log(`houve null na iteração ${i}`);
      await delay(1000 * 60 * 1);
      continue;
    }
    todosOsItens = todosOsItens.concat(itensDoIntervalo);
    console.log(todosOsItens);
    i = i + 100;
  }
}
coletaIntervalos();
