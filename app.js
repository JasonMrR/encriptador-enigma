const btnEncriptar = document.querySelector('#btnEncriptar');
const btnDesencriptar = document.querySelector('#btnDesencriptar');
const btnCopiar = document.querySelector('#btnCopiar');
const barraDeCarga = document.querySelector('#barraDeCarga');


function encriptarTexto(e) {
  barraDeCarga.classList.add('cargando');
  setTimeout(() => { 
    barraDeCarga.classList.remove('cargando');
  }, 3000);
}

function desencriptarTexto(e) {
  console.log('Desencriptando');
}

function copiarTexto() {
  console.log('Copiar');
}


btnEncriptar.addEventListener('click', encriptarTexto);
btnDesencriptar.addEventListener('click', desencriptarTexto);
btnCopiar.addEventListener('click', copiarTexto);