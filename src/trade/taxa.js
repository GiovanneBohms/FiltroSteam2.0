function subtraiTaxa(entrada){
  let intervalos = [0.02,0.21,0.32,0.43]
  let taxas =[0.02,0.03,0.04,0.05,0.07,0.09]

    while (entrada >intervalos[intervalos.length -1]){
      const ultimoElemento = intervalos[intervalos.length -1]
      if (intervalos.length % 2 === 0) {
       intervalos.push(parseFloat((ultimoElemento+0.12).toFixed(2)))
      } else {
        intervalos.push(parseFloat((ultimoElemento+0.11).toFixed(2)))
      }
    }
    while(intervalos.length > taxas.length){
      const ultimoElemento = taxas[taxas.length -1]
      if (taxas.length % 2 === 0) {
       taxas.push(parseFloat((ultimoElemento+0.01).toFixed(2)))
      } else {
        taxas.push(parseFloat((ultimoElemento+0.02).toFixed(2)))
      }
    }

  const primeiroMaior = intervalos.find((valor) => valor >= entrada)
  const indicePrimeiroMaior = intervalos.indexOf(primeiroMaior)
  const resultadoSubtracao = parseFloat((entrada - taxas[indicePrimeiroMaior-1]).toFixed(2))

    console.log(entrada,resultadoSubtracao)
  }
  

  function somaTaxa(entrada){
    let intervalos =[0.19]
    let taxas = [0.02,0.03,0.04,0.06,0.07,0.09]

    while(entrada > intervalos[intervalos.length -1]){
      intervalos.push(parseFloat((intervalos[intervalos.length -1]+0.1).toFixed(2)))
    }
    while(intervalos.length > taxas.length){
      const ultimoElemento = taxas[taxas.length -1]
      if (taxas.length % 2 === 0) {
       taxas.push(parseFloat((ultimoElemento+0.01).toFixed(2)))
      } else {
        taxas.push(parseFloat((ultimoElemento+0.02).toFixed(2)))
      }
    }
    const taxaSoma = entrada+taxas[taxas.length-1]
    console.log(entrada,taxaSoma)
    
  }
  const number = 5
  somaTaxa(number)
  subtraiTaxa(number)