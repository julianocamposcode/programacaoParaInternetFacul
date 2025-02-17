const email = document.querySelector('.email')
const senha = document.querySelector('.senha')
const form = document.querySelector('form')
const submit = document.querySelector('.submit')
const loading = document.querySelector('.loading')
const checkbox = document.querySelector('.checkbox')
const olhoAberto = document.querySelector('.olho_aberto')
const olhoFechado = document.querySelector('.olho_fechado')
const button_cad = document.querySelector('.button_cad')
const button_cad2 = document.querySelector('.button_cad2')
const welcome = document.querySelector('.welcome')
const welcome2 = document.querySelector('.welcome2')
const formulario = document.querySelector('.form')
const formulario2 = document.querySelector('.form2')
const container = document.querySelector('.container')
const container2 = document.querySelector('.container2')
const range = document.getElementById('range')
const value_range = document.querySelector('.value_range')
const esqueceu = document.querySelector('.esqueceu')


removeErrorInvalido = () => {
    let error_auth = document.querySelector('.error_auth')
    if (error_auth) {
        error_auth.remove()
    }
}

esqueceu.onclick = () => {
    if (localStorage.email != undefined) {
        email.value = localStorage.email
        senha.value = localStorage.senha
    } else {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
        Toast.fire({ icon: "info", title: "Usuário não cadastrado" });
    }
}


document.addEventListener('click', () => {
    removeErrorInvalido()
})

form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (verificaCampos()) {
        if (email.value == localStorage.email && senha.value == localStorage.senha) {
            loading.style.display = 'block';
            submit.value = ''
            setTimeout(() => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });
                Toast.fire({ icon: "success", title: "Sucesso ao entrar" });

                loading.style.display = 'none';
                submit.value = 'ENTRAR'
                email.value = ''
                senha.value = ''
                checkbox.checked = false;
            }, 1000);
        } else {
            loading.style.display = 'block';
            submit.value = ''
            setTimeout(() => {
                loading.style.display = 'none';
                submit.value = 'ENTRAR'
                let errorAuth = document.querySelector('.error_auth')
                if (!errorAuth) {
                    let p = document.createElement('p')
                    p.innerHTML = 'E-mail ou senha inválidos'
                    p.classList.add('error_auth')
                    form.appendChild(p)
                }
            }, 1000);
        }
    }

})

function verificaCampos() {
    const emailValido = verificaCampoEmail('');
    const senhaValida = verificaCampoSenha(senha);
    return emailValido && senhaValida;
}

function verificaCampoEmail(palavra) {
    let emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    let mensagemErro1 = document.querySelector('.error')
    if (email.value == '' || !emailRegex.test(email.value)) {
        if (!mensagemErro1) {
            email.style.borderColor = 'red'
            let p = document.createElement('p')
            p.innerHTML = `Preencha este campo ${palavra}`
            p.classList.add('error')
            form.appendChild(p)
        }
        return false
    } else if (mensagemErro1) {
        email.style.borderColor = ''
        document.querySelector('.error').textContent = ''
    }
    return true
}

function verificaCampoSenha(campo) {
    let mensagemErro2 = document.querySelector('.error2')
    if (campo.value == '') {
        if (!mensagemErro2) {
            campo.style.borderColor = 'red'
            let p2 = document.createElement('p')
            p2.innerHTML = 'Preencha este campo'
            p2.classList.add('error2')
            form.appendChild(p2)
        }
        return false
    } else if (mensagemErro2) {
        campo.style.borderColor = ''
        document.querySelector('.error2').textContent = ''
    }
    return true
}

olhoFechado.addEventListener('click', () => {
    senha.type = 'text'
    olhoFechado.style.display = 'none'
    olhoAberto.style.display = 'block'
    senha.classList.add('focus')
    removeErrorInvalido()
})

olhoAberto.addEventListener('click', () => {
    senha.type = 'password'
    olhoAberto.style.display = 'none'
    olhoFechado.style.display = 'block'
    senha.classList.add('focus2')
    removeErrorInvalido()
})

senha.addEventListener('input', () => {
    verificaCampoSenha(senha)
})
email.addEventListener('input', () => {
    verificaCampoEmail('corretamente')
})

email.addEventListener('focus', () => {
    email.classList.add('focus')
    removeErrorInvalido()
})

email.addEventListener('blur', () => {
    email.classList.remove('focus')
    verificaCampoEmail('corretamente')
})

senha.addEventListener('focus', () => {
    senha.classList.add('focus')
    removeErrorInvalido()

})
senha.addEventListener('blur', () => {
    senha.classList.remove('focus')
    verificaCampoSenha(senha)
})

// -----------------------transição--------------------

button_cad.addEventListener('click', () => {
    welcome.classList.add('animation_welcome')
    formulario.classList.add('animation_form')

    welcome2.classList.remove('animation_welcome2')
    formulario2.classList.remove('animation_form2')

    localStorage.animation = 'true'

    setTimeout(() => {
        container2.style.display = 'flex'
        container.style.display = 'none'
    }, 1000)
})

button_cad2.addEventListener('click', () => {
    welcome2.classList.add('animation_welcome2')
    formulario2.classList.add('animation_form2')

    welcome.classList.remove('animation_welcome')
    formulario.classList.remove('animation_form')

    localStorage.animation = 'false'

    setTimeout(() => {
        container.style.display = 'flex'
        container2.style.display = 'none'
    }, 1000)
})

window.onload = () => {
    if (localStorage.animation == 'true') {
        container.style.display = 'none'
        container2.style.display = 'flex'
    } else {
        container2.style.display = 'none'
        container.style.display = 'flex'
    }
}

// -----------------------------------------CADASTRO----------------------------------------

const formCad = document.querySelector('.formCad')
const nomeCad = document.querySelector('.nomeCad')
const emailCad = document.querySelector('.emailCad')
const senhaCad = document.querySelector('.senhaCad')
const loadingCad = document.querySelector('.loadingCad')
const olhoAbertoCad = document.querySelector('.olhoabertoCad')
const olhoFechadoCad = document.querySelector('.olhofechadoCad')
const submitCad = document.querySelector('.submitCad')



formCad.addEventListener('submit', (event) => {
    event.preventDefault()

    if (verificaCamposCad()) {
        loadingCad.style.display = 'block';
        submitCad.value = ''
        setTimeout(() => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({ icon: "success", title: "Cadastro realizado com sucesso" });

            loadingCad.style.display = 'none';
            submitCad.value = 'CADASTRAR'
            nomeCad.value = ''
            emailCad.value = ''
            senhaCad.value = ''
        }, 1000);

        localStorage.nome = nomeCad.value
        localStorage.senha = senhaCad.value
        localStorage.email = emailCad.value
    }

})

function verificaCamposCad() {
    const nomeValidoCad = verificaCampoNomeCad('');
    const emailValidoCad = verificaCampoEmailCad('');
    const senhaValidaCad = verificaCampoSenhaCad(senhaCad);
    return emailValidoCad && senhaValidaCad && nomeValidoCad
}

function verificaCampoNomeCad(palavra) {
    let nomeRegex = /^[A-Za-zÁ-Úá-ú]+(?: [A-Za-zÁ-Úá-ú]+)*\s*$/;
    let mensagemErroNome = document.querySelector('.error_nome')
    if (nomeCad.value == '' || !nomeRegex.test(nomeCad.value)) {
        if (!mensagemErroNome) {
            nomeCad.style.borderColor = 'red'
            let p2 = document.createElement('p')
            p2.innerHTML = `Preencha este campo ${palavra}`
            p2.classList.add('error_nome')
            formCad.appendChild(p2)
        }
        return false
    } else if (mensagemErroNome) {
        nomeCad.style.borderColor = ''
        document.querySelector('.error_nome').textContent = ''
    }
    return true
}

function verificaCampoEmailCad(palavra) {
    let emailRegexCad = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    let mensagemErroEmail = document.querySelector('.error_email')
    if (emailCad.value == '' || !emailRegexCad.test(emailCad.value)) {
        if (!mensagemErroEmail) {
            emailCad.style.borderColor = 'red'
            let p = document.createElement('p')
            p.innerHTML = `Preencha este campo ${palavra}`
            p.classList.add('error_email')
            formCad.appendChild(p)
        }
        return false
    } else if (mensagemErroEmail) {
        emailCad.style.borderColor = ''
        document.querySelector('.error_email').textContent = ''
    }
    return true

}
// function verificaCampoTelCad(palavra) {
//     let telRegexCad = /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;
//     let mensagemErroTel = document.querySelector('.error_tel')
//     if (tel.value == '' || !telRegexCad.test(tel.value)) {
//         if (!mensagemErroTel) {
//             tel.style.borderColor = 'red'
//             let p = document.createElement('p')
//             p.innerHTML = `Preencha este campo ${palavra}`
//             p.classList.add('error_tel')
//             formCad.appendChild(p)
//         }
//         return false
//     } else if (mensagemErroTel) {
//         tel.style.borderColor = ''
//         document.querySelector('.error_tel').textContent = ''
//     }
//     return true
// }

function verificaCampoSenhaCad(campo) {
    let mensagemErroSenha = document.querySelector('.error_senha')
    if (campo.value == '') {
        if (!mensagemErroSenha) {
            campo.style.borderColor = 'red'
            let p2 = document.createElement('p')
            p2.innerHTML = 'Preencha este campo'
            p2.classList.add('error_senha')
            formCad.appendChild(p2)
        }
        return false
    } else if (mensagemErroSenha) {
        campo.style.borderColor = ''
        document.querySelector('.error_senha').textContent = ''
    }
    return true
}

olhoFechadoCad.addEventListener('click', () => {
    senhaCad.type = 'text'
    olhoFechadoCad.style.display = 'none'
    olhoAbertoCad.style.display = 'block'
    senhaCad.classList.add('focus')
})

olhoAbertoCad.addEventListener('click', () => {
    senhaCad.type = 'password'
    olhoAbertoCad.style.display = 'none'
    olhoFechadoCad.style.display = 'block'
    senhaCad.classList.add('focus2')
})

nomeCad.addEventListener('input', () => {
    verificaCampoNomeCad('corretamente')
})

nomeCad.addEventListener('focus', () => {
    nomeCad.classList.add('focus')
})

nomeCad.addEventListener('blur', () => {
    nomeCad.classList.remove('focus')
    verificaCampoNomeCad('corretamente')
})

senhaCad.addEventListener('input', () => {
    verificaCampoSenhaCad(senhaCad)
})

emailCad.addEventListener('input', () => {
    verificaCampoEmailCad('corretamente')
})

emailCad.addEventListener('focus', () => {
    emailCad.classList.add('focus')
})

emailCad.addEventListener('blur', () => {
    emailCad.classList.remove('focus')
    verificaCampoEmailCad('corretamente')
})

senhaCad.addEventListener('focus', () => {
    senhaCad.classList.add('focus')
})

senhaCad.addEventListener('blur', () => {
    senhaCad.classList.remove('focus')
    verificaCampoSenhaCad(senhaCad)
})

// tel.addEventListener('focus', () => {
//     tel.classList.add('focus')
// })

// tel.addEventListener('blur', () => {
//     tel.classList.remove('focus')
//     verificaCampoTelCad('corretamente')
// })

// tel.addEventListener('input', () => {
//     verificaCampoTelCad('corretamente')
// })


