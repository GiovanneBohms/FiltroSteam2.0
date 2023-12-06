console.log("./src/db.js");

async function openDatabase() {
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
      objectStore.createIndex("Cotacoes", "cotacoes", { unique: false });
      objectStore.createIndex("BookOferta", "bookOferta", { unique: false });
      objectStore.createIndex("BookEncomenda", "bookEncomenda", { unique: false });
      objectStore.createIndex("VolumeMedioHora", "volumeMedioHora", { unique: false });
     
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
  cotacoes:[0.25, 0.26, 0.29, 0.23, 0.22],
  bookOferta:[[3.35, 2],[3.36, 6],[3.37, 8]],
  bookEncomenda:[[3.31,1],[3.29,721],[3.26,741]]
};

async function adicionaitens(arrayItens){
  const db = await openDatabase();
  const transaction = db.transaction(["Itens"], "readwrite");
  const objectStore = transaction.objectStore("Itens");
  objectStore.clear();
  arrayItens.forEach(item => {
   let itemDB = {
      itemName: item.name,
      itemId: item.id,
      cotacoes:item.cotacoes,
      bookOferta: item.book.ofertas,
      bookEncomenda:item.book.encomendas,
      volumeMedioHora: item.volumeMedioPorHora
    }
    adicionarItem(itemDB);
  });
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

async function excluirBancoDeDados() {
  const nomeDoBancoDeDados = "PricesSteam";

  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(nomeDoBancoDeDados);

    request.onsuccess = function () {
      console.log("Banco de dados excluído com sucesso.");
      resolve();
    };

    request.onerror = function (event) {
      console.error("Erro ao excluir o banco de dados:", event.target.error);
      reject(event.target.error);
    };
  });
}

async function restartDB(itens) {

  await openDatabase()
  await adicionaitens(itens)
  let itensInDB = await obterItens()
  console.log(itensInDB)
  await estrategia()
  return itensInDB
}

async function visualizaDB(){
  await openDatabase()
  let itensInDB = await obterItens()
  return itensInDB
}
