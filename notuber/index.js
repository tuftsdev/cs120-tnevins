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

function addMarker(obj){
  let olat = obj.lat;
  let olng = obj.lng;
  pos = {lat:olat, lng:olng}//new google.maps.LatLng(lat,lng);
  const marker = new google.maps.Marker({
    position: pos,
    map,
    icon: "./car.png",
    title: obj.username
  });
  console.log(marker);
}


function addRides(usrlat, usrlon,data){
  map = new google.maps.Map(document.getElementById("map"), {
    //center: {  lat: 42.352271, lng: -71.05524200000001},
    center: {  lat: usrlat, lng: usrlon},
    zoom: 8,
  });

  for( let val of latLngs){
    const marker = new google.maps.Marker({
        position: new google.maps.LatLng(val.lat,val.lng),
        map,
        icon: "./car.png",
        title: val.id
    });
  }

  const marker1 = new google.maps.Marker({
    position: new google.maps.LatLng(usrlat,usrlon),
    map,
    title: 'Hello there!'
    });

  for( let ride of data){
    console.log(ride);
    const marker2 = new google.maps.Marker({
      position: new google.maps.LatLng(ride.lat,ride.lng),
      icon: "./car.png",
      map,
      title: ride.username
  });
    console.log(marker2);
  }
}


 function getRides(url,usrlat,usrlon) {
  let params = `username=wgvMs3aL&lat=${usrlat}&lng=${usrlon}`;
  let http = new XMLHttpRequest();
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
        addRides(usrlat,usrlon, JSON.parse(http.response))
      }
    }
    http.send(params);
}


function getLatLong(position) {
  let usrlat = position.coords.latitude;
  let usrlon = position.coords.longitude;
 
    let url = "https://jordan-marsh.herokuapp.com/rides"
    getRides(url, usrlat, usrlon);

  }


function initMap(){
  navigator.geolocation.getCurrentPosition(getLatLong)

}
window.initMap = initMap;