let map
let clt = {lat: 35.2144, lng: -80.9473};
let marker
let infoWindow

function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.2271, lng: -80.8431},
    zoom: 13
  })
}

function createMarker () {
  marker = new google.maps.Marker({
    position: clt,
    map: map,
    title: 'Charlotte-Douglas International Airport'
  })
}

function createInfoWindow () {
  infoWindow = new google.maps.InfoWindow({
    content: 'This is an info window'
  })
  marker.addListener('click', function() {
    infoWindow.open(map, marker)
  })
}
