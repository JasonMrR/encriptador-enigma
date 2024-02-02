import {encriptado, desencriptado} from './scripts/encriptado.js'

const btnEncriptar = document.querySelector('#btnEncriptar');
const btnDesencriptar = document.querySelector('#btnDesencriptar');
const btnCopiar = document.querySelector('#btnCopiar');
const barraDeCarga = document.querySelector('#barraDeCarga');
const mensajeSecreto = document.querySelector('#mensajeSecreto');
const txtResultado = document.querySelector('#txtResultados');

let mensaje = "";
let mensajeEncriptado = "";
let mensajeDesencriptado = "";


function capturarMsSecreto(e) {
  let nuevoTexto = e.target.value;

  // Eliminar caracteres no permitidos (acentos y mayúsculas)
  nuevoTexto = nuevoTexto.replace(/[áéíóúüÁÉÍÓÚÜ]/g, ''); // Eliminar acentos
  nuevoTexto = nuevoTexto.toLowerCase(); // Convertir a minúsculas

  // Permitir espacios
  nuevoTexto = nuevoTexto.replace(/[^a-z ]/g, '');

  // Actualizar el valor del textarea
  e.target.value = nuevoTexto;
  mensaje = nuevoTexto;
}


function moverScroll() {
  resultados.scrollIntoView({
    behavior: 'smooth'
  });
}

function obtenerPalabraEncriptada() {
  const longitudMensaje = mensaje.length;
  mensajeEncriptado = "";

  for (let i = 0; i < longitudMensaje; i++) {
    const letra = mensaje[i];
    if(encriptado[letra]) {
      mensajeEncriptado += encriptado[letra];
    } else {
      mensajeEncriptado += mensaje[i];
    }
  }
}

function presentarMensaje (mensaje) {
  setTimeout(() => { 
    barraDeCarga.classList.remove('cargando');
    txtResultado.innerHTML = mensaje
  }, 2000);
}

function encriptarTexto() {
  //1. ajustamos el scroll para ver la animación 
  moverScroll();
  //2. asignamos la animación de carga
  barraDeCarga.classList.add('cargando');
  //3. obtenemos el resultado de encriptado
  obtenerPalabraEncriptada();
  //4. simulamos tiempo de espera para presentar el resultado 
  presentarMensaje(mensajeEncriptado)
  //5 habilitar el boton de copiado
  btnCopiar.disabled = false;
}

function comprobarDesencriptadoPorPalabra(indiceIzquierdo, indiceDerecho) {

  const porcionEncriptada = mensaje.slice(indiceIzquierdo, indiceDerecho+1);
  
  if(encriptado[mensaje[indiceIzquierdo]] !== porcionEncriptada) {
    return false;
  } else {
    return true;
  }
}

function obtenerPalabraDesencriptada() {
  const longitudMensaje = mensaje.length;
  mensajeDesencriptado = "";

  for (let i = 0; i < longitudMensaje; i++) {
    const letra = mensaje[i];

    if (encriptado[letra]) {
      //Obtenemos el indice derecho de la porcion encriptada
      const indiceDerecho = i + desencriptado[letra];
      if(comprobarDesencriptadoPorPalabra(i, indiceDerecho)){
        mensajeDesencriptado += letra;
        i += desencriptado[letra];
      } else {
        return false;
      }
    } else {
      mensajeDesencriptado += letra; 
    }
  }

  return true;
}

function desencriptarTexto(e) {
  //1. ajustamos el scroll para ver la animación 
  moverScroll();
  //2. obtenemos el resultado de desencriptado
  if (obtenerPalabraDesencriptada()){
    //3. asignamos la animación de carga
    barraDeCarga.classList.add('cargando');   
    //4. simulamos tiempo de espera para presentar el resultado 
    presentarMensaje(mensajeDesencriptado);
  } else {
    alert("La palabra no se encuentra encriptada con enigma");
    txtResultado.innerHTML = "Ingresa el texto que desees encriptar o desencriptar.";
  }
  //5 habilitar el boton de copiado
  btnCopiar.disabled = false;
}

function copiarTexto() {
  console.log("clic:");
  navigator.clipboard.writeText(txtResultado.innerHTML);
  btnCopiar.value = "Texto copiado";
  btnCopiar.disabled = true;
  setTimeout(() => {
    btnCopiar.value = "Copiar texto";
    btnCopiar.disabled = false;
  }, 1500);
}


mensajeSecreto.addEventListener('input', capturarMsSecreto);
btnEncriptar.addEventListener('click', encriptarTexto);
btnDesencriptar.addEventListener('click', desencriptarTexto);
btnCopiar.addEventListener('click', copiarTexto);