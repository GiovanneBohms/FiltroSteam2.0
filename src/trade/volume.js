console.log("./src/trade/volume.js")

function volumeMedioReal(cotacoes){
  let volumeTotal = 0;
  let volumeMedioHora = 0;

  cotacoes.forEach(cotacao => {
    volumeTotal += cotacao[1]
  });
  volumeMedioHora = parseInt(volumeTotal/cotacoes.length)
  console.log(volumeMedioHora)
  const descrepancias = cotacoes.filter(cotacao => cotacao[1] >= volumeMedioHora*1)
  console.log(descrepancias)
  descrepancias.forEach(cotacao => {
    volumeTotal = volumeTotal - cotacao[1]
  });

  const volumeMedioHoraReal = parseInt(volumeTotal/(cotacoes.length - descrepancias.length))

  console.log(volumeMedioHoraReal)
  
}

function venderAlvoCalculo(bookOferta,volumeMedioHora,bookEncomenda){

  if(volumeMedioHora >  bookOferta[(bookOferta.length)-1][1]){
    console.log(bookOferta, bookEncomenda)
    return ""
  }
  const venderAlvo = (bookOferta.find(item => item[1] >= volumeMedioHora))[0];
  return venderAlvo

}