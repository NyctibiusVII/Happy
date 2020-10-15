const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
}

//create map
const map = L.map('mapid', options).setView([-22.9019077,-43.352603], 16) //([latitude, longitude], zoom)

//create an add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

//create icon
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

//create and add marker
L.marker([-22.9019077,-43.352603], {icon}).addTo(map)



//image gallery
function selectImage(event) {
    const button = event.currentTarget


    //Removendo as classes .active
    const buttons = document.querySelectorAll('.images button')
    buttons.forEach((button) => {
        button.classList.remove("active")
    })


    //Selecionando a imagem clicada
    const image = button.children[0]
    const imageContainer = document.querySelector('.orphanage-details > img')


    //Atualizando o container de imagem
    imageContainer.src = image.src


    //Adicionando a classe .active para o botão clicado
    button.classList.add('active')
}