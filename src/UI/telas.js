console.log("./src/UI/telas,js");

async function renderizador() {
  const telaInput = document.getElementById("popularItemsRows");
  const maisItens = document.getElementById("popularItemsMore");
  maisItens.innerHTML = "";
  telaInput.innerHTML = `
  <div id="printConfiguracao" style="max-width: 620px;"> </div> 
  <div id="printAtualizacoes" style="max-width: 620px; "> 
  <form id="meuFormulario" style="display: flex; flex-direction: column; max-width: 450px; margin: 16px auto 64px auto;">

  
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <label for="capital">Capital de Trade:</label>
      <input type="number" id="capitalCaixa" name="capital" value="1000">
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <label for="quantItens">Quantidade de Itens para pesquisar:</label>
      <input type="number" id="quantItens" name="quantItens" value="1000">
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <label for="valorMinimo">Ofertas Mínimas:</label>
      <input type="number" id="valorMinimo" name="valorMinimo" value="1000">
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <label for="intervaloDeHoras">Intervalo Em Horas:</label>
      <input type="number" id="intervaloDeHoras" name="intervaloDeHoras" value="168">
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
  <label for="tempoDeCompra">Tempo de Compra:</label>
  <input type="number" id="tempoDeCompra" name="tempoDeCompra" value="24">
</div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <label for="volumeMedioPorHora">Volume Medio De Negociação Por Hora:</label>
      <input type="number" id="volumeMedioPorHora" name="volumeMedioPorHora" value="300">
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <label for="precoMinimo">Preço Mínimo:</label>
      <input type="number" id="precoMinimo" name="precoMinimo" value="0.15">
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <label for="precoMaximo">Preço Máximo:</label>
      <input type="number" id="precoMaximo" name="precoMaximo" value="10">
  </div>
  <button type="button" id="botaoColetarDados" style="height: 50px; background-color: #1b2838; color: #ebebeb; cursor: pointer; font-weight: bold; margin-top: 10px;">Coletar Dados</button>

  <button type="button" id="botaoDadosColetados" style="height: 50px; background-color: #1b2838; color: #ebebeb; cursor: pointer; font-weight: bold; margin-top: 10px;">Utilizar Dados Já Coletados</button>
</form>

  </div>
  <div id="printItensFiltrados" style="font-size: 10px "></div>
  <p style="text-align: center; font-size: 12px; margin-top:40px;">By: Giovanne Bohms</p>
  
`
botaoColetarDados.addEventListener('click', function(){capturarFiltro("coletarDados")} )
botaoDadosColetados.addEventListener("click", estrategia);
}

function telaAtualizações(string) {
  const printAtualizacoes = document.getElementById("printAtualizacoes");
  const printConfig = document.getElementById("printConfiguracao");

  let printConfiguracao = `
  <span style="font-weight: bold;">Configuração definida:<span><br><br>
  Capital de Trade: R$:${configuracao.capital}<br>
  Total a Pesquisar:  ${configuracao.quantidadeParaPesquisar}<br>
  Ofertas Minimas:  ${configuracao.ofertasMinimas}<br>
  Intervalo em Horas:  ${configuracao.horas}<br>
  Tempo de Compra: ${(configuracao.tempoDeCompra)}<br>
  Volume Médio por Hora:  ${configuracao.volumeMedioHora}<br>
  Preço Mínimo:  ${configuracao.precoMinimo}<br>
  Preço Máximo:  ${configuracao.precoMaximo}<br><br>
  <span style="font-weight: 700;">Aguarde a coleta de dados:</span><br>`;

  let print = `
  <div style="max-width: 620px;">
  <p style="word-wrap: break-word;">${string}</p>
  </div>`;

  printConfig.innerHTML = printConfiguracao;
  printAtualizacoes.innerHTML = print;
}

function capturarFiltro(origem) {

  let quantidadeItens = parseInt(quantItens.value);
  let ofertasMinimas = parseInt(valorMinimo.value);
  let intervaloHora = parseInt(intervaloDeHoras.value);
  let volumeMedio = parseInt(volumeMedioPorHora.value);
  let cotacaoMinima = parseFloat(precoMinimo.value);
  let cotacaoMaxima = parseFloat(precoMaximo.value);
  let TempoDeCompra = parseInt(tempoDeCompra.value)
  let capital = parseFloat(capitalCaixa.value)
  config(
    quantidadeItens,
    ofertasMinimas,
    intervaloHora,
    volumeMedio,
    cotacaoMinima,
    cotacaoMaxima,
    TempoDeCompra,
    capital
  );
  if(origem==="coletarDados"){
    calculaBook();
    botaoColetarDados.removeEventListener("click", capturarFiltro);
  }
}