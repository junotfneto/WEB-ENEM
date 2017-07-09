var map;
var currentmarker = null;
var capitais=Array();
	capitais[0] = {lat: -12.9730401, lng: -38.502304}; //SALVADOR
	capitais[1] = {lat: -10.9472468, lng: -37.0730823}; //ARACAJU
	capitais[2] = {lat: -7.1194958, lng: -34.8450118}; //JOAO PESSOA
	capitais[3] = {lat: -8.0578381, lng: -34.8828969}; //RECIFE
	capitais[4] = {lat: -9.6498487, lng: -35.7089492}; //MACEIO
	capitais[5] = {lat: -3.7318616, lng: -38.5266704}; //FORTALEZA

      
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -12, lng: -38},
          zoom: 5
    });

    var i;
    for(i = 0; i < capitais.length; i++){
    	addMarker(map, capitais[i], "");
    }

    

    google.maps.event.addListener(map, 'click', function(event) {
        if(currentmarker != null)
          currentmarker.setMap(null);
        document.getElementById('posicoes-clicadas').innerHTML+= event.latLng+"<br/>";
        currentmarker = addMarker(map, event.latLng, "A");
    });
}

function addMarker(map, location, label){
	var marker = new google.maps.Marker({
          position: location,
          map: map,
          label: label
    });

    google.maps.event.addListener(marker, 'click', function(event) {
          document.getElementById('posicoes-clicadas').innerHTML+= event.latLng+"<br/>";
          if(currentmarker != null)
            currentmarker.setMap(null);
    });

    return marker;
}