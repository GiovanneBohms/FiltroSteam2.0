console.log("./src/coletaIdNamePriceQuant.js");

async function coletaItensComConfig(intervalo) {
  const objetos = await listaDeItens(intervalo);
  if(!objetos){
    return null
  }
  const matches = regexIdNamePriceQuant(objetos.results_html);
  const arrayObjetosItens = criaItem(matches);
  let itens = [];
  for (let i = 0; i < arrayObjetosItens.length; i++) {
    if (
      arrayObjetosItens[i].ofertasQuant >= configuracao.ofertasMinimas &&
      arrayObjetosItens[i].precoDeVenda >= configuracao.precoMinimo &&
      arrayObjetosItens[i].precoDeVenda <= configuracao.precoMaximo 
      && configuracao.idsPermitidos.includes(arrayObjetosItens[i].id)
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
      console.log(`houve null na iteração ${i} Delay de 1 minutos foi aplicado`);
      telaAtualizações(`houve null na iteração ${i} Delay de 1 minutos foi aplicado`)
      await delay(1000 * 60 * 1);
      continue;
    }
    todosOsItens = todosOsItens.concat(itensDoIntervalo);
    
    i = i + 100;
    let porcentagem = parseFloat((((todosOsItens.length)/(i-100))*100).toFixed(2))
    console.log('de',i-100,'itens',todosOsItens.length, 'foram filtrados em uma relação de',porcentagem,"%")

    telaAtualizações(`de ${i-100} itens ${todosOsItens.length} foram filtrados em uma relação de ${porcentagem} %`)
    if(configuracao.quantidadeParaPesquisar > 100){
      await delay(12000)
    }
  }
    return todosOsItens
}

