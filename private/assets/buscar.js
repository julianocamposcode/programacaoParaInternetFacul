let form = document.querySelector('form')
let nome = document.querySelector('.nome')
let text_button = document.querySelector('.text_button')
let load = document.querySelector('.load')
let buscado = document.querySelector('.buscado')
let error = document.querySelector('.error')

nome.addEventListener('input', () => {
  if (nome.value) {
    error.textContent = ''
  }
})

function css(elemento, propriedade) {
  elemento.style.display = propriedade
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  css(text_button, 'none')
  css(load, 'block')
  buscado.textContent = ''
  error.textContent = ''
  let buscarNome = (nome) => {
    return new Promise((resolve, reject) => {
      if (nome) {
        setTimeout(() => {
          css(text_button, 'block')
          css(load, 'none')
          resolve(nome)
        }, 2000);
      } else {
        setTimeout(() => {
          css(text_button, 'block')
          css(load, 'none')
          reject('Erro! Por favor digite um nome')
        }, 2000);
      }
    })
  };

  (async () => {
    try {
      let nome_async = await buscarNome(nome.value)
      buscado.textContent = nome_async
    } catch (erro) {
      error.textContent = erro
    }
  })()
})
