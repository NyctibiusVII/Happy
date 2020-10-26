//create map
const map = L.map('mapid').setView([-27.2109325,-49.6448719], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',).addTo(map)

const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29,68],
})

let marker

map.on('click', (event) => {
    const lat = event.latlng.lat
    const lng = event.latlng.lng

    document.querySelector('[name=lat]').value = lat
    document.querySelector('[name=lng]').value = lng

    //verifica se existe um marker e se tiver remove
    marker && map.removeLayer(marker)

    //add icon layer
    marker = L.marker([lat, lng], { icon })
    .addTo(map)
})



//adicionar o campo de fotos
function addPhotoField() {
    const container = document.querySelector('#images');

    const fieldsContainer = document.querySelectorAll('.new-upload')

    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)

    const input = newFieldContainer.children[0]

    //se nada esta escrito, não adiciona novo campo
    if(input.value == "") {
        return
    }

    input.value = ""

    container.appendChild(newFieldContainer)//adiciona em baixo do filho
}
//deletar o campo de fotos
function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    //se tiver só 1 campo, não deleta o campo, apenas limpa!
    if(fieldsContainer.length <= 1) {
        span.parentNode.children[0].value = ""
        return 
    }

    span.parentNode.remove()//deleta
}



//alterna a seleção dos botões
function toggleSelect(event) {
    document.querySelectorAll('.button-select button')
    .forEach((button) => button.classList.remove('active'))


    const button = event.currentTarget
    button.classList.add('active')

    const input = document.querySelector('[name="open_on_weekends"]')
    input.value = button.dataset.value
}



//validação
function wantToSendData (event) {
    const numFields = 6

    const name = document.querySelector('input#name').value
    const limitName = 30
    const about = document.querySelector('textarea#about').value
    const limitAbout = 300
    const whatsapp = document.querySelector('input#whatsapp').value
    const limitWhatsapp = 16
    const linkImg = document.querySelector('input#link-img').value
    //if (linkImg == "") {
    //    linkImg = "https://independente.com.br/wp-content/uploads/2019/07/Floresta-1.jpg" //img PADRÃO
    //}
    const minLinkImg = 10
    const instructions = document.querySelector('textarea#instructions').value
    const limitInstructions = 1000
    const opening_hours = document.querySelector('input#opening_hours').value
    const limitOpening_hours = 20

    const verify = new Array(numFields).fill(false)
    let trueValue = 0

    if (name != null && name != "") {
        if (name.length <= limitName) {
            verify[0] = true
            //console.log("TUDO (ok) p:0"+verify[0])
            if (about != null && about != "") {
                if (about.length <= limitAbout) {
                    verify[1] = true
                    //console.log("TUDO (ok) p:1"+verify[1])
                    if (whatsapp != null && whatsapp != "") {
                        if (whatsapp.length <= limitWhatsapp) {
                            verify[2] = true
                            //console.log("TUDO (ok) p:2"+verify[2])
                            if (linkImg != null && linkImg != "") {
                                if (linkImg.length >= minLinkImg) {
                                    verify[3] = true
                                    //console.log("TUDO (ok) p:3"+verify[3])
                                    if (instructions != null && instructions != "") {
                                        if (instructions.length <= limitInstructions) {
                                            verify[4] = true
                                            //console.log("TUDO (ok) p:4"+verify[4])
                                            if (opening_hours != null && opening_hours != "") {
                                                if (opening_hours.length <= limitOpening_hours) {
                                                    verify[5] = true
                                                    //console.log("TUDO (ok) p:5"+verify[5])

                                                    //popup
                                                        wantToSendDataPopups(event, whatsapp, name)         

                                                } else {
                                                    event.preventDefault()
                                                    verify[5] = false
                                                    x0p('Ops!', 'Parece que o horário preenchido é MAIOR que o limite de ( '+limitOpening_hours+' ) caracteres. \n\n Por favor preencha novamente dentro do limite.')
                                                    //console.warn("opening_hours preenchido mas é MAIOR que o limite (NOT)"+verify[5])
                                                }
                                            }
                                        } else {
                                            event.preventDefault()
                                            verify[4] = false
                                            x0p('Ops!', 'Parece que o texto das instruções preenchido é MAIOR que o limite de ( '+limitInstructions+' ) caracteres. \n\n Por favor preencha novamente dentro do limite.')
                                            //console.warn("instructions preenchido mas é MAIOR que o limite (NOT)"+verify[4])
                                        }
                                    }
                                } else {
                                    event.preventDefault()
                                    verify[3] = false
                                    x0p('Ops!', 'Parece que o link da imagem preenchido é MENOR que o minimo de ( '+minLinkImg+' ) caracteres. \n\n Por favor preencha novamente dentro do limite.')
                                    //console.warn("linkImg preenchido mas é MAIOR que o limite (NOT)"+verify[3])
                                }
                            }
                        } else {
                            event.preventDefault()
                            verify[2] = false
                            x0p('Ops!', 'Parece que o número de whatsapp excedeu o limite de ( '+limitWhatsapp+' ) caracteres. \n\n Por favor preencha novamente dentro do limite.')
                            //console.warn("whatsapp preenchido mas é MAIOR que o limite (NOT)"+verify[2])
                        }
                    }
                } else {
                    event.preventDefault()
                    verify[1] = false
                    x0p('Ops!', 'Parece que o texto "sobre" foi preenchido MAIS que o limite de ( '+limitAbout+' ) caracteres. \n\n Por favor preencha novamente dentro do limite.')
                    //console.warn("about preenchido mas é MAIOR que o limite (NOT)"+verify[1])
                }
            }
        } else {
            event.preventDefault()
            verify[0] = false
            x0p('Ops!', 'Parece que o nome preenchido é MAIOR que o limite de ( '+limitName+' ) caracteres. \n\n Por favor preencha novamente dentro do limite.')
            //console.warn("nome preenchido mas é MAIOR que o limite (NOT)"+verify[0])
        }
    }
}
function wantToSendDataPopups (event, whatsapp, name){
    event.preventDefault()
    x0p({
        title: 'Confirmar',
        text: 'Tem certeza de que todos os dados estão preenchidos corretamente?',
        icon: 'warning',
        animationType: 'fadeIn',
        buttons: [
            {
                type: 'cancel'
            },
            {
                type: 'warning',
                text: 'Confirmar',
                showLoading: true
            }
        ]
    }).then(
        function(data) {
        if(data.button == 'warning') {
            const lat = document.querySelector('[name=lat]').value;
            const lng = document.querySelector('[name=lng]').value;

            // Se passar na validação do regex;
            if(whatsapp.match(/^[9|8]\d{7,8}/g)) {
                if (lat == "" || lng == "") {
                    event.preventDefault()
                    x0p('Ops! Dado não preenchido', 'Por gentileza, selecione um ponto no mapa', 'error');
                }else {
                    // DADOS SALVOS...
                    // Simulate Delay
                    setTimeout(function() {
                        x0p('Cadastrado com sucesso',
                            'O lar "' + name + '" já está no nosso banco de dados!',
                            'ok', false)
                            document.getElementById('theForm').submit()
                    }, 1500)
                }
            }else {// Se não passar na validação do regex;
                event.preventDefault()
                x0p('Ops!', 'Parece que seu número de whatsapp está meio errado. \n\n Por favor preencha novamente o campo. \n\n Ex: 912345678')
            }
        }else if (data.button == 'cancel') { // NÃO
            event.preventDefault()
            x0p('Cancelado',
                'Seus dados ainda não foram salvos.',
                'error', false);
        }else {
            event.preventDefault()
        }
    })
}