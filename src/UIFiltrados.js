console.log("./src/UIFIltrados.js")

function printItensFiltrados(itens) {
  let itensFiltrados = document.getElementById("printItensFiltrados");
  const css =`style=" text-align: left; cursor: pointer ;" onmouseover="this.style.backgroundColor='#0E141B'" onmouseout="this.style.backgroundColor='transparent'"`
  itensFiltrados.innerHTML = `
  <div style="max-width: 640px;">
    <table id="listaFiltrada" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr >
          <th id="nome-UIFiltrado" ${css}>Nome</th>
          <th id="vendasUIFiltrado" ${css}>Venda</th>
          <th id="zeroAZero-UIFiltrado" ${css}>0a0</th>
          <th id="compra-UIFiltrado" ${css}>Compra</th>
          <th id="quantidade-UIFiltrado" ${css}>Quantidade</th>
          <th id="lucro-UIFiltrado" ${css}>Lucro</th>
          <th id="volume-UIFiltrado" ${css}>Volume</th>
          <th id="liquidez-UIFiltrado" ${css}>Liquidez</th>
        </tr>
    </div>`;

  let tabelaFiltrada = document.getElementById("listaFiltrada");

  for (let i = 0; i < itens.length; i++) {
    let itemFiltrado = itens[i]
    tabelaFiltrada.innerHTML += `
    <tr>  
          <th style=" text-align: left; ;">${itemFiltrado.nome}</th>
          <th style=" text-align: left; ;">${itemFiltrado.venda}</th>
          <th style=" text-align: left; ;">${itemFiltrado.zeroAZero}</th>
          <th style=" text-align: left; ;">${itemFiltrado.compra}</th>
          <th style=" text-align: left; ;">${itemFiltrado.quantidade}</th>
          <th style="text-align: left;"><a href="${itemFiltrado.link}" target="_blank">${itemFiltrado.lucro}%</a></th>
          <th style=" text-align: left; ;">${itemFiltrado.volume}</th>
          <th style=" text-align: left; ;">R$: ${itemFiltrado.dinheiro}</th>
    </tr>`;
  }
}


document.addEventListener('DOMContentLoaded', function() {
  // Seu código JavaScript que depende do DOM vai aqui
  console.log('O DOM foi totalmente carregado e está pronto para ser manipulado!');
});