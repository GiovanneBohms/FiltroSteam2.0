console.log("./src/UI/UIFIltrados.js")

function printItensFiltrados(itens) {
  let itensFiltrados = document.getElementById("printItensFiltrados");
  const css =`style=" text-align: left; cursor: pointer ;" onmouseover="this.style.backgroundColor='#0E141B'" onmouseout="this.style.backgroundColor='transparent'"`
  itensFiltrados.innerHTML = `
  <div style="max-width: 640px;">
    <table id="listaFiltrada" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr >
          <th id="nome-UIFiltrado" ${css}>Nome</th>
          <th id="vendasUIFiltrado" ${css}>Sell</th>
          <th id="zeroAZero-UIFiltrado" ${css}>0a0</th>
          <th id="compra-UIFiltrado" ${css}>Buy</th>
          <th id="quantidade-UIFiltrado" ${css}>Qnt</th>
          <th id="volume-UIFiltrado" ${css}>Vol</th>
          <th id="lucro-UIFiltrado" ${css}>Lucro</th>
          
          <th id="lucro-UIFiltradoUD" ${css}>LUD</th>
          <th id="volume-UIFiltradoUD" ${css}>VUD</th>
          
          <th id="vendasUIFiltradoUD" ${css}>SUD</th>
          <th id="zeroAZero-UIFiltradoUD" ${css}>0UD</th>
          <th id="compra-UIFiltradoUD" ${css}>BUD</th>
          <th id="quantidade-UIFiltradoUD" ${css}>QUD</th>
          
          
        </tr>
    </div>`;

  let tabelaFiltrada = document.getElementById("listaFiltrada");

  const green = "background-color: green; color: white;"
  const red = "background-color: #ff3333; color: white;"

  for (let i = 0; i < itens.length; i++) {
    let itemFiltrado = itens[i]
    let diferencaLucro = parseFloat((itemFiltrado.lucroUD-itemFiltrado.lucro).toFixed(2))

    const StringDiferencaLucro = ()=>{
      if(diferencaLucro!=0){
        return `${parseFloat((itemFiltrado.lucroUD-itemFiltrado.lucro).toFixed(2))}%`
      }else{
        return ""
      }
    }

    const diferenciaLucro = (diferencaLucro) => {
      if (diferencaLucro > 0) {
        return green;
      } else if (diferencaLucro < 0) {
        return red;
      } else {
        return "";
      }
    };

    const diferenciaVolume = (volumeUD, volume )=>{
      if(itemFiltrado.volumeUD > itemFiltrado.volume ){
        return green
      }else if (itemFiltrado.volumeUD < itemFiltrado.volume ){
        return red
      }

    }
    
    
    tabelaFiltrada.innerHTML += `
    <tr>  
          <th style=" text-align: left; ;">${itemFiltrado.nome}</th>
          <th style=" text-align: left; ;">${itemFiltrado.venda}</th>
          <th style=" text-align: left; ;">${itemFiltrado.zeroAZero}</th>
          <th style=" text-align: left; ;">${itemFiltrado.compra}</th>
          <th style=" text-align: left; ;">${itemFiltrado.quantidade}</th>
          <th style=" text-align: left; ;">${itemFiltrado.volume}</th>
          <th style="text-align: left;"><a href="${itemFiltrado.link}" target="_blank">${itemFiltrado.lucro}%</a></th>
          <th style="text-align: left; ${diferenciaLucro(diferencaLucro)}"><a href="${itemFiltrado.link}" target="_blank">${StringDiferencaLucro()}</a></th>
          <th style=" text-align: left;${diferenciaVolume(itemFiltrado.volumeUD, itemFiltrado.volume )} ;">${itemFiltrado.volumeUD}</th>
          <th style=" text-align: left; ;">${itemFiltrado.vendaUD}</th>
          <th style=" text-align: left; ;">${itemFiltrado.zeroAZeroUD}</th>
          <th style=" text-align: left; ;">${itemFiltrado.compraUD}</th>
          <th style=" text-align: left; ;">${itemFiltrado.quantidadeUD}</th>
          
    </tr>`;
  }
  const nomeTabela = document.getElementById('nome-UIFiltrado')
  
  nomeTabela.addEventListener('click',function(){
    verificaClick("nome")
  })

}
function verificaClick(nome){

  if(nome ==="nome"){
    console.log("é nome")
  }else{
    console.log("não é nome")
  }
  
}


// nomeTabela.addEventListener("click", verificaClick);