console.log("./src/dependencias.js");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// var nameRegex = /\/market\/listings\/\d+\/([^"]+)"/;
// var idRegex = /\/(\d+)\/([^"]+)"/;
// var quantidadeRegex = /data-qty="([^"]+)"/;
// var precoRegex = /data-price="([^"]+)"/;
function regexIdNamePriceQuant(string) {
  const regex =
    /steamcommunity\.com\/market\/listings\/(\d+)\/([^"]+)"[\s\S]*?data-qty="([^"]+)"[\s\S]*?data-price="([^"]+)"/g;
  let listaStringItensArray = [...string.matchAll(regex)];
  return listaStringItensArray;
}

function criaItem(array) {
  let itens = [];
  for (let i = 0; i < array.length; i++) {
    item = new Item(array[i][4], array[i][3], array[i][2], array[i][1]);
    itens.push(item);
  }
  return itens;
}

function regexCotacao(string) {
  const regex = /\[("[^"]+"),(\d+\.\d+),"(\d+)"\]/g;
  if (string == null) {
    return null;
  }
  const matches = string.match(regex);
  return matches;
}

function regexIdBook(string) {
  const regex = /Market_LoadOrderSpread\(\s*(\d+)\s*\)/;
  if (string == null) {
    return null;
  }
  const match = string.match(regex);
  if (match) {
    const idBook = match[1];
    return idBook;
  }
}
