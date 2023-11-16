console.log("./src/index.js");



async function renderizador(){
    const telaInput = document.getElementById("popularItemsRows")
    const maisItens = document.getElementById("popularItemsMore")
    maisItens.innerHTML = ""
    telaInput.innerHTML = `
    <p style="text-align: center;">By: Giovanne Bohms</p>
    <div id="printConfiguracao" style="max-width: 620px;"> </div> 
    <div id="printAtualizacoes" style="max-width: 620px;"> 
    
    <form id="meuFormulario" style="display: flex; flex-direction: column; max-width: 450px; margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <label for="quantItens">Quantidade de Itens para pesquisar:</label>
        <input type="number" id="quantItens" name="quantItens" value="100">
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <label for="valorMinimo">Ofertas Mínimas:</label>
        <input type="number" id="valorMinimo" name="valorMinimo" value="5000">
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <label for="intervaloDeHoras">Intervalo De Horas Do Gráfico:</label>
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
    <button type="button" id="botaoFiltro" style="height: 50px; background-color: #1b2838; color: #8F98A0; cursor: pointer; font-weight: bold; margin-top: 10px;">Filtrar Itens</button>
</form>

    </div>
    
`
}
renderizador()
function telaAtualizações(string){
  const printAtualizacoes = document.getElementById("printAtualizacoes")
  const printConfig = document.getElementById("printConfiguracao")

  
  let printConfiguracao=`Configuração definida:<br><br> Total a Pesquisar:${configuracao.quantidadeParaPesquisar}<br> Ofertas Minimas:${configuracao.ofertasMinimas}<br> Intervalo em Horas: ${configuracao.horas}<br> Volume Médio por Hora: ${configuracao.volumeMedioHora}<br> Preço Mínimo: ${configuracao.precoMinimo}<br> Preço Mínimo: ${configuracao.precoMaximo}`

  let print=`<div style="max-width: 620px;">
  <p style="word-wrap: break-word;">${string}</p>
  </div>`

  printConfig.innerHTML = printConfiguracao
  
  printAtualizacoes.innerHTML = print
}
function capturarDados() {
  let quantidadeItens = parseInt(quantItens.value);
  let ofertasMinimas = parseInt(valorMinimo.value)
  let intervaloHora = parseInt(intervaloDeHoras.value)
  let volumeMedio = parseInt(volumeMedioPorHora.value)
  let cotacaoMinima = parseFloat(precoMinimo.value)
  let cotacaoMaxima = parseFloat(precoMaximo.value)

  config(quantidadeItens,ofertasMinimas,intervaloHora,volumeMedio,cotacaoMinima,cotacaoMaxima)
  converteStringEmCotacaoEIDBook();
}


botaoFiltro.addEventListener('click', capturarDados)