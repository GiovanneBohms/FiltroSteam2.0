console.log("./src/telas,js")

async function renderizador(){
  const telaInput = document.getElementById("popularItemsRows")
  const maisItens = document.getElementById("popularItemsMore")
  maisItens.innerHTML = ""
  telaInput.innerHTML = `
  <div id="printConfiguracao" style="max-width: 620px;"> </div> 
  <div id="printAtualizacoes" style="max-width: 620px;"> 
  <form id="meuFormulario" style="display: flex; flex-direction: column; max-width: 450px; margin: 16px auto 64px auto;">
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <label for="quantItens">Quantidade de Itens para pesquisar:</label>
      <input type="number" id="quantItens" name="quantItens" value="100">
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <label for="valorMinimo">Ofertas Mínimas:</label>
      <input type="number" id="valorMinimo" name="valorMinimo" value="5000">
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <label for="intervaloDeHoras">Intervalo Em Horas no Gráfico:</label>
      <input type="number" id="intervaloDeHoras" name="intervaloDeHoras" value="168">
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <label for="volumeMedioPorHora">Volume Medio De Negociação Por Hora:</label>
      <input type="number" id="volumeMedioPorHora" name="volumeMedioPorHora" value="100">
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <label for="precoMinimo">Preço Mínimo:</label>
      <input type="number" id="precoMinimo" name="precoMinimo" value="0.04">
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <label for="precoMaximo">Preço Máximo:</label>
      <input type="number" id="precoMaximo" name="precoMaximo" value="0.25">
  </div>
  <button type="button" id="botaoFiltro" style="height: 50px; background-color: #1b2838; color: #ebebeb; cursor: pointer; font-weight: bold; margin-top: 10px;">Filtrar Itens</button>
</form>

  </div>
  <div id="printItensFiltrados"></div>
  <p style="text-align: center; font-size: 12px; margin-top:40px;">By: Crow</p>
  
`
}
renderizador()
function telaAtualizações(string){
const printAtualizacoes = document.getElementById("printAtualizacoes")
const printConfig = document.getElementById("printConfiguracao")

let printConfiguracao=`<span style="font-weight: bold;">Configuração definida:</span><br><br> Total a Pesquisar:  ${configuracao.quantidadeParaPesquisar}<br>
Ofertas Minimas:  ${configuracao.ofertasMinimas}<br>
Intervalo em Horas:  ${configuracao.horas}<br>
Volume Médio por Hora:  ${configuracao.volumeMedioHora}<br>
Preço Mínimo:  ${configuracao.precoMinimo}<br>
Preço Mínimo:  ${configuracao.precoMaximo}<br><br>
<span style="font-weight: 700;">Aguarde a coleta de dados:</span><br>`

let print=`<div style="max-width: 620px;">
<p style="word-wrap: break-word;">${string}</p>
</div>`

printConfig.innerHTML = printConfiguracao
printAtualizacoes.innerHTML = print
}

function printItensFiltrados(itens){
  let itensFiltrados = document.getElementById("printItensFiltrados")
  itensFiltrados.innerHTML = `
  <div style="max-width: 640px;">
    <table id="listaFiltrada" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr >
          <th style=" text-align: left; padding: 8px;">Nome</th>
          <th style=" text-align: left; padding: 8px;">Preço de Venda</th>
          <th style=" text-align: left; padding: 8px;">Volume</th>
        </tr>
    </div>
  `
    let tabelaFiltrada = document.getElementById('listaFiltrada')


  for(let i =0;i<itens.length;i++){
    const nomeDecodificado = decodeURIComponent(itens[i].name)
    const preco = itens[i].precoDeVenda
    const volume = itens[i].volumeMedioPorHora
    const volumeTratado = volume.toFixed(2)

     tabelaFiltrada.innerHTML += `
    <tr>
     <td style=" text-align: left; padding: 8px;"><a href="${itens[i].link}">${nomeDecodificado}</a></td>
     <td style=" text-align: left; padding: 8px;">${preco}</td>
     <td style=" text-align: left; padding: 8px;">${volumeTratado}</td>
   </tr>
     `
  } 
}

function capturarDados() {
botaoFiltro.removeEventListener('click', capturarDados);
let quantidadeItens = parseInt(quantItens.value);
let ofertasMinimas = parseInt(valorMinimo.value)
let intervaloHora = parseInt(intervaloDeHoras.value)
let volumeMedio = parseInt(volumeMedioPorHora.value)
let cotacaoMinima = parseFloat(precoMinimo.value)
let cotacaoMaxima = parseFloat(precoMaximo.value)
config(quantidadeItens,ofertasMinimas,intervaloHora,volumeMedio,cotacaoMinima,cotacaoMaxima)
converteStringEmCotacaoEIDBook();
}
