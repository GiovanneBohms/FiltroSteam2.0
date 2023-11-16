console.log("./src/index.js");



async function renderizador(){
    const telaInput = document.getElementById("popularItemsRows")
    const maisItens = document.getElementById("popularItemsMore")
    const botaoFiltro = document.getElementById("botaoFiltro")
    // const quantItens = document.getElementById("quantItens")
    // const padrao = document.getElementById("padrao")
    maisItens.innerHTML = ""
    telaInput.innerHTML = `<p style="text-align: center;">By: Giovanne Bohms</p><form id="meuFormulario" style="display: flex; flex-direction: column; max-width: 450px; margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <label for="quantItens">Quantidade de Itens para pesquisar:</label>
        <input type="number" id="quantItens" name="quantItens">
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <label for="valorMinimo">Ofertas Mínimas:</label>
        <input type="number" id="valorMinimo" name="valorMinimo">
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <label for="intervaloDeHoras">Intervalo De Horas Do Gráfico:</label>
        <input type="number" id="intervaloDeHoras" name="intervaloDeHoras">
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <label for="volumeMedioPorHora">Volume Medio De Negociação Por Hora:</label>
        <input type="number" id="volumeMedioPorHora" name="volumeMedioPorHora">
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <label for="precoMinimo">Preco Mínimo:</label>
        <input type="number" id="precoMinimo" name="precoMinimo">
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <label for="precoMaximo">Preco Máximo:</label>
        <input type="number" id="precoMaximo" name="precoMaximo">
    </div>
    <button type="button" id="botaoFiltro" style="height: 50px; background-color: #1b2838; color: #8F98A0; cursor: pointer; font-weight: bold; margin-top: 10px;">Filtrar Itens</button>
</form>
`
}
renderizador()
function capturarDados() {
  let quantidadeItens = parseInt(quantItens.value);
  let ofertasMinimas = parseInt(valorMinimo.value)
  let intervaloHora = parseInt(intervaloDeHoras.value)
  let volumeMedio = parseInt(volumeMedioPorHora.value)
  let cotacaoMinima = parseFloat(precoMinimo.value)
  let cotacaoMaxima = parseFloat(precoMaximo.value)

  config(quantidadeItens,ofertasMinimas,intervaloHora,volumeMedio,cotacaoMinima,cotacaoMaxima)
  console.log(`A seguinte configuração foi inserida na filtragem`,configuracao)
  converteStringEmCotacaoEIDBook();
}


botaoFiltro.addEventListener('click', capturarDados)