//create map
const map = L.map('mapid').setView([-27.2109325,-49.6448719], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',).addTo(map)

const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
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