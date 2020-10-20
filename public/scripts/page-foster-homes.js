//create map
const map = L.map('mapid').setView([-22.9019077,-43.352603], 15);// ([latitude, longitude], zoom)

//create an add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

//create popup overlay
function addMarker({id, name, lat, lng} = fosterHome) {// WARNINGX
    const popup = L.popup({
        closeButton: false,
        className: "map-popup",
        minWidth: 240,
        minHeight: 240
    }).setContent(
        `${name}`+
        `<div id="text-limiter">`+
        `<a href="/foster-home?id=${id}"> <img src="/images/arrow-white.svg"> </a>`+
        `</div>`)
    //.setContent(`${name} <a href="foster-home?id=${id}"> <img src="/images/arrow-white.svg"> </a>`)
    

    L.marker([lat, lng], { icon })
     .addTo(map)
     .bindPopup(popup)    
}

//create and add marker
const fosterHomeSpan = document.querySelectorAll('.foster-homes span')

fosterHomeSpan.forEach( span => {
    const fosterHome = {
        id: span.dataset.id,
        name: span.dataset.name,
        lat: span.dataset.lat,
        lng: span.dataset.lng
    }

    addMarker(fosterHome)
})