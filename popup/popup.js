const botao = document.getElementById("botao");
const h2 = document.getElementById("texto");

function log() {
  console.log("teste");
  h2.innerHTML = "clickado";
}

botao.addEventListener("click", log);
