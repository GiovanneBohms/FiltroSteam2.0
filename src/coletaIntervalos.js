console.log("./src/coletaIntervalos.js");

async function coletaItensComConfig(intervalo) {
  const objetos = await listaDeItens(intervalo);
  const matches = regexIdNamePriceQuant(objetos.results_html);
  const arrayObjetosItens = criaItem(matches);
  let itens = [];
  for (let i = 0; i < arrayObjetosItens.length; i++) {
    if (
      arrayObjetosItens[i].ofertasListadas >= configuracao.ofertasMinimas &&
      arrayObjetosItens[i].precoDeVenda >= configuracao.precoMinimo &&
      arrayObjetosItens[i].precoDeVenda <= configuracao.precoMaximo
      ) {
      itens.push(arrayObjetosItens[i]);
    }
  }
  return itens;
}

async function coletaIntervalos() {
  const intervalo = configuracao.quantidadeParaPesquisar;
  let todosOsItens = [];
  let i = 100;
  while (i <= intervalo) {
    const itensDoIntervalo = await coletaItensComConfig(i);
    if (!itensDoIntervalo) {
      console.log(`houve null na iteração ${i}`);
      await delay(1000 * 60 * 1);
      continue;
    }
    todosOsItens = todosOsItens.concat(itensDoIntervalo);
    
    i = i + 100;
    console.log('de',i-100,'',todosOsItens.length, 'itens foram filtrados')
  }
    console.log(todosOsItens[0])
    console.log(todosOsItens)
}
coletaIntervalos();
