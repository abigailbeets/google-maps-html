// 'use strict';
// import blueEssenceStyle from './map_styles.js';
//TODO get images to show

let map
let clt = {lat: 35.2144, lng: -80.9473};
let marker
let markers = []
let infoWindow

let style = [{
    "featureType": "water",
    "elementType": "all",
    "stylers": [
        {
            "color": "#7dcdcd"
        }
    ]
}]

let locations = [
  { title: 'Discovery Place', location: { lat: 35.2291, lng: -80.8407 }},
  { title: 'Bank of America Stadium', location: { lat: 35.2257, lng: -80.8528 }},
  { title: 'Music Factory', location: { lat: 35.2394, lng: -80.8457 }},
  { title: 'Whitewater Center', location: { lat: 35.2726, lng: -80.0053 }},
]

let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let labelIndex = 0

function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.2271, lng: -80.8431},
    zoom: 13,
    styles: style,
    mapTypeControl: false
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

function createMarkers () {
  let largeInfoWindow = new google.maps.InfoWindow

  let defaultIcon = makeMarkerIcon('0091FF')
  let highlightedIcon = makeMarkerIcon('FFFF24')

  for (let i = 0; i < locations.length; i++) {
    let position = locations[i].location
    let title = locations[i].title
    let randomColor = '000000'.replace(/0/g, function(){return (~~(Math.random()*16)).toString(16)})
    let label = labels[labelIndex++ % labels.length]
    // let defaultIcon = makeMarkerIcon(randomColor)

    let marker = new google.maps.Marker({
      position: position,
      title: title,
      icon: defaultIcon,
      animation: google.maps.Animation.DROP,
      id: i
    })

    markers.push(marker)
    // bounds.extend(marker.position)

    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfoWindow)
    })

    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon)
    })

    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon)
    })
  }
}

function makeMarkerIcon (markerColor) {
  let markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=|0|' + markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21,34),
    new google.maps.Point(0,0),
    new google.maps.Point(10,34),
    new google.maps.Size(21, 34))

    return markerImage
}

function populateInfoWindow (marker, infoWindow) {
  if (infoWindow.marker != marker) {
    infoWindow.marker = marker
    infoWindow.setContent('')
    infoWindow.open(map, marker)

    infoWindow.addListener('closeclick', function() {
      infoWindow.marker = null
    })

    let streetViewService = new google.maps.StreetViewService()
    let radius = 50

    function getStreetView(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        let nearStreetViewLocation = data.location.latLng
        debugger
        let heading = google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation, marker.position)
          debugger
          infoWindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>')
          let panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 30
            }
          }

          let panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions)
          debugger
      }
      else {
        infoWindow.setContent('<div>' + marker.title + '</div>' + '<div>No Street View Found</div>')
      }
    }
    streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView)
    infoWindow.open(map, marker)
  }
}

function showListings () {
  let bounds = new google.maps.LatLngBounds()

  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map)
    bounds.extend(markers[i].position)
  }

  map.fitBounds(bounds)
}

function hideListings () {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null)
  }
}
