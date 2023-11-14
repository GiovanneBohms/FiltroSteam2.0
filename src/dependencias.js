console.log("./src/dependencias.js");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function regexIdNamePriceQuant(string) {
  const regex =
    /steamcommunity\.com\/market\/listings\/(\d+)\/([^"]+)"[\s\S]*?data-qty="([^"]+)"[\s\S]*?data-price="([^"]+)"/g;
  let listaStringItens = string.matchAll(regex);
  let listaStringItensArray = [...string.matchAll(regex)];
  criaItem(listaStringItensArray);
  return listaStringItens;
}

function criaItem(array) {
  let itens = [];
  for (let i = 0; i < array.length; i++) {
    item = new Item(array[i][4], array[i][3], array[i][2], array[i][1]);
    itens.push(item);
  }
  return itens;
}