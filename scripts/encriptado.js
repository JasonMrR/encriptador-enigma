const encriptado =  {
  'a': 'ai',
  'e': 'enter',
  'i': 'imes',
  'o': 'ober',
  'u': 'ufat',
}

const desencriptado = {
  'a': encriptado['a'].length -1,
  'e': encriptado['e'].length -1,
  'i': encriptado['i'].length -1,
  'o': encriptado['o'].length -1,
  'u': encriptado['u'].length -1,
}

export {encriptado, desencriptado};