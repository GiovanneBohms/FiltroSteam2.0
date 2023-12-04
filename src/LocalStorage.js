console.log("./src/db.js");

function openDatabase() {
  return new Promise((resolve, reject) => {
    var request = indexedDB.open("PricesSteam", 1);

    request.onupgradeneeded = function (event) {
      var db = event.target.result;
      var objectStore = db.createObjectStore("Itens", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("ItemName", "itemName", { unique: false });
      objectStore.createIndex("IdName", "idName", { unique: false });
      objectStore.createIndex("Price", "price", { unique: false });
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

async function adicionarItem(item) {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(["Itens"], "readwrite");
    const objectStore = transaction.objectStore("Itens");

    // Transforma a IDBRequest em uma Promise
    const requestAdd = new Promise((resolve, reject) => {
      const request = objectStore.add(item);
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    });

    // Aguarda a conclusão da operação de adição
    const idDoNovoItem = await requestAdd;
    console.log(`Item adicionado com sucesso! ID: ${idDoNovoItem}`);
  } catch (error) {
    console.error("Erro na operação de adição: ", error);
  }
}

// Exemplo de uso
const novoItem = {
  itemName: "CaixaPoderosa",
  itemId:"740",
  prices: [0.25, 0.26, 0.29, 0.23, 0.22],
};
const velhoItem = {
  ItemName: "CaixaFraca",
  itemId: "740",
  prices: [0.45, 0.56, 0.99, 0.63, 0.32],
};

async function adicionaitens(){
  adicionarItem(novoItem);
  adicionarItem(velhoItem);
}


async function obterItens() {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(["Itens"], "readonly");
    const objectStore = transaction.objectStore("Itens");

    // Obtém todos os itens no objeto de armazenamento
    const requestGetAll = objectStore.getAll();

    // Transforma a IDBRequest em uma Promise
    const itens = await new Promise((resolve, reject) => {
      requestGetAll.onsuccess = (event) => resolve(event.target.result);
      requestGetAll.onerror = (event) => reject(event.target.error);
    });
    return itens;
  } catch (error) {
    console.error("Erro ao obter itens: ", error);
  }
}

// Exemplo de uso

async function printItens() {
  const arrayItens = await obterItens();
  console.log(arrayItens)
  console.log(arrayItens[0])
  console.log(arrayItens[0].itemName);
}

// printItens();