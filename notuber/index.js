let map;
const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
let latLngs = [
    {id: "mXfkjrFw", lat:42.3453, lng:-71.0464},
    {id: "nZXB8ZHz", lat:42.3662, lng:-71.0621},
    {id:"Tkwu74WC" , lat:42.3603 , lng: -71.0547},
    {id: "5KWpnAJN", lat: 42.3472, lng:-71.0802 },
    {id: "uf5ZrXYw" , lat:42.3663 , lng:-71.0544 },
    {id:"VMerzMH8" , lat:42.3542 , lng:-71.0704 }
];
function initMap(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: {  lat: 42.352271, lng: -71.05524200000001},
    zoom: 14,
  });

  for( let val of latLngs){
    const marker = new google.maps.Marker({
        position: new google.maps.LatLng(val.lat,val.lng),
        map,
        icon: "./car.png",
        title: val.id
    });
  }
}


window.initMap = initMap;