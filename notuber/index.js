let map;
const iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
 let gdata;

function computeDistance(upos, data){
  let res = []
  for(let node of data){  
    let r = new google.maps.LatLng(node.lat,node.lng);
    let meters = google.maps.geometry.spherical.computeDistanceBetween(upos, r);
    if(!isNaN(meters)&& meters >0){
      node.distance = meters;
      res.push(meters);
    }
  }
  return res;
}

function findClosestRide(pos, data){
  //let pos = new google.maps.LatLng(usrlat,usrlon)
  let meters = computeDistance(pos,data);
  let min = Math.min(...meters);
  for(let node of data){ 
    if(node.distance === min){
      return node;
    }
  }
}

function addline(ulat, ulng,data){
  let pos = new google.maps.LatLng(ulat,ulng)
  let node = findClosestRide(pos,data);
  const flightPlanCoordinates = [
    { lat:node.lat, lng: node.lng },
    { lat: ulat, lng: ulng },
  ];
  const flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    map,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  let miles = node.distance * .000621 ; 
  const contentString =
  '<div id="content">' +
  '<div id="siteNotice">' +
  "</div>" +
  '<h1 id="firstHeading" class="firstHeading">closet ride:'+ node.username+'</h1>' +
  '<div id="bodyContent">' +
  "<p>lat:"+ node.lat+ " Long:" +node.lng +
  "<br/>Distance from ride:"+ miles +" miles</br>formula: miles = meters * 0.000621</p>" +
  "</div>" +
  "</div>";
  return contentString;

}



function addRides(usrlat, usrlon,data){
  map = new google.maps.Map(document.getElementById("map"), {
    //center: {  lat: 42.352271, lng: -71.05524200000001},
    center: {  lat: usrlat, lng: usrlon},
    zoom: 4,
  });

  let usermarker = new google.maps.Marker({
    position: new google.maps.LatLng(usrlat,usrlon),
    map,
    title: 'Hello there!'
    });
    

  usermarker.addListener("click", () => {
    let contentstr = addline(usrlat,usrlon,data);
    const infowindow = new google.maps.InfoWindow({
      content: contentstr,
      ariaLabel: "miles to location",
    });
    infowindow.open({
      anchor: usermarker,
      map,
    });
  });

  for( let ride of data){
    const marker2 = new google.maps.Marker({
      position: new google.maps.LatLng(ride.lat,ride.lng),
      icon: "./car.png",
      map,
      title: ride.username
  });
  }
}


 function getRides(url,usrlat,usrlon) {
  let params = `username=s0ny&lat=${usrlat}&lng=${usrlon}`;
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
    let url = "https://calm-inlet-90299.herokuapp.com/rides"//"https://jordan-marsh.herokuapp.com/rides"
    getRides(url, usrlat, usrlon);

  }


function initMap(){
  navigator.geolocation.getCurrentPosition(getLatLong)
}

window.initMap = initMap;