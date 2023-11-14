console.log("./src/coletaIntervalos.js");

async function coletaItensComOfertasMinimas(intervalo) {
  let objetos = await listaDeItens(intervalo);
  let matches = regexIdNamePriceQuant(objetos.results_html);
  let arrayObjetosItens = criaItem(matches);
  let itens = [];
  for (let i = 0; i < arrayObjetosItens.length; i++) {
    if (arrayObjetosItens[i].ofertasListadas >= configuracao.ofertasMinimas) {
      itens.push(arrayObjetosItens[i]);
    }
  }
  return itens;
}

async function coletaIntervalos() {
  let intervalo = configuracao.quantidadeParaPesquisar;
  let todosOsItens = [];
  let i = 100;
  while (i <= intervalo) {
    let itensDoIntervalo = await coletaItensComOfertasMinimas(i);
    if (!itensDoIntervalo) {
      console.log(`houve null na iteração ${i}`);
      await delay(1000 * 60 * 1);
      continue;
    }
    todosOsItens = todosOsItens.concat(itensDoIntervalo);
    
    i = i + 100;
    console.log("Quanntidade de itens filtrados com ofertas mínias",todosOsItens.length, "de um total de",i-100);
  }
}
coletaIntervalos();
