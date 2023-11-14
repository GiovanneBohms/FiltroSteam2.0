console.log("./src/coletaIntervalos.js");

let item = {
  precoDeVenda: 0.25,
  ofertasListadas: 5000,
  name: "Dreams%20%26%20Nightmares%20Case",
  id: 730,
  cotacao: [],
  idBook: "",
};

async function coletaItens(intervalo) {
  let objetos = await listaDeItens(intervalo);
  const html = objetos.results_html;
  const regex =
    /steamcommunity\.com\/market\/listings\/(\d+)\/([^"]+)"[\s\S]*?data-qty="([^"]+)"[\s\S]*?data-price="([^"]+)"/g;
  let matches = html.matchAll(regex);
  let itens = [];

  for (const match of matches) {
    if(match[3]>=configuracao.ofertasMinimas){
    itens.push({
      id: match[1],
      name: match[2],
      quantidade: match[3],
      preco: match[4],
    });
    }else{
      continue;
    }
  }

  console.log(itens);
  return itens;
}

// coletaItens(100);

async function coletaIntervalos() {
  let intervalo = configuracao.quantidadeParaPesquisar;
  console.log(intervalo)
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
coletaIntervalos()

console.log("oi?")