console.log("./src/index.js");

const configuracao = {
  // Config para coleta de API
  quantidadeParaPesquisar: 5000,
  ofertasMinimas: 5000,
  precoPrimario: 10.0,
  cotacaoDolar: 4.91,
  //Config após coleta de API
  horas: 336,
  volume: 10000,
  precoMinimo: 0.1,
  precoMaximo: 0.4,
};

async function coletaItens(intervalo) {
  let objetos = await dadosPrimarios(intervalo);

  if (!objetos) {
    console.log("houve erro em coletaItens");
    return null;
  }
  let itens = [];
  for (let i = 0; i < objetos.results.length; i++) {
    let item = {
      precoDeVenda:
        (objetos.results[i].sell_price / 100) * configuracao.cotacaoDolar,
      ofertasListadas: objetos.results[i].sell_listings,
      name: encodeURIComponent(objetos.results[i].hash_name),
      id: objetos.results[0].asset_description.appid,
      cotacao: [],
      idBook: "",
    };
    if (item.ofertasListadas >= configuracao.ofertasMinimas) {
      itens.push(item);
    } else {
      continue;
    }
  }
  return itens;
}

// coletaItens(200)

async function coletaIntervalos() {
  let intervalo = configuracao.quantidadeParaPesquisar;
  let todosOsItens = [];
  let i = 0;
  while (i < intervalo) {
    let itensDoIntervalo = await coletaItens(i);
    
    if (!itensDoIntervalo) {
      console.log(`houve null na iteração ${i}`);
      await delay(1000 * 60 * 1);
      continue;
    }
    todosOsItens = todosOsItens.concat(itensDoIntervalo);
    console.log(todosOsItens);
    console.log(i);
    i = i + 100;
  }
  console.log(todosOsItens[101]);
}
coletaIntervalos();
