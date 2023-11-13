console.log("./src/APIs.js");

// Coleta Name e Id de itens
async function listaDeItens(fim) {
  try {
    let inicio = fim - 100;
    let promessa = await fetch(
      `https://steamcommunity.com/market/search/render/?query=&start=${inicio}&count=${fim}&search_descriptions=0&sort_column=popular&sort_dir=desc`
    );
    let objetoItens = await promessa.json();
    return objetoItens;
  } catch (error) {
    console.log("erro de conexão em listaDeItens");
    return null;
  }
}

// Coleta volume, preço médio e último valor ofertado utilizando Name e Id
async function coletaDadosItens(Id, Name) {
  try {
    let promessa = await fetch(
      `https://steamcommunity.com/market/priceoverview/?country=BR&currency=7&appid=${Id}&market_hash_name=${Name}`
    );
    let objetoDados = await promessa.json();
    return objetoDados;
  } catch (error) {
    console.log("erro de conexão em ColetaDadosItens");
    return null;
  }
}

// Coleta id especial para acessar api do book e dados para construir gráfico de volatilidade
async function coletaIdParaBookEGraficoDeVolatididade(id, name) {
  const url = `https://steamcommunity.com/market/listings/${id}/${name}`;
  const headers = {
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    Host: "steamcommunity.com",
    Referer: `https://steamcommunity.com/market/listings/${id}/${name}`,
    "Sec-Ch-Ua":
      '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183",
    "X-Requested-With": "XMLHttpRequest",
  };
  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  try {
    let promessa = await fetch(url, requestOptions);
    let stringVolatilidade = await promessa.text();
    return stringVolatilidade;
  } catch (error) {
    console.log("erro em coletaIdEspecialParaBook");
    return null;
  }
}

async function dadosPrimarioss(fim) {
  let inicio = fim - 100;
  try {
    let promessa = await fetch(
      `https://steamcommunity.com/market/search/render/?query=&start=${inicio}&count=${fim}&search_descriptions=0&sort_column=popular&sort_dir=desc&norender=1`
    );
    let objetoDados = await promessa.json();
    return objetoDados
  } catch (error) {
    console.log("erro de conexão em dadosPrimarios");
    return null;
  }
}

async function dadosPrimarios(fim) {
  let inicio = fim - 100;
  try {
    let promessa = await fetch(
      `https://steamcommunity.com/market/search/render/?query=&start=${inicio}&count=${fim}&search_descriptions=0&sort_column=popular&sort_dir=desc&norender=1`
    );

    // Adiciona logs para depuração
    
    let objetoDados = await promessa.json();
    console.log('Dados da API:', objetoDados);
    return objetoDados;
  } catch (error) {
    console.error("Erro de conexão em dadosPrimarios:", error);
    return null;
  }
}
