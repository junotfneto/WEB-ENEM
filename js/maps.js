var map;
var currentmarker = null;
var autocomplete;
var capitais=Array();
//NORDESTE
	capitais[0] = {lat: -12.9730401, lng: -38.502304}; //SALVADOR
	capitais[1] = {lat: -10.9472468, lng: -37.0730823}; //ARACAJU
	capitais[2] = {lat: -7.1194958, lng: -34.8450118}; //JOAO PESSOA
	capitais[3] = {lat: -8.0578381, lng: -34.8828969}; //RECIFE
	capitais[4] = {lat: -9.6498487, lng: -35.7089492}; //MACEIO
	capitais[5] = {lat: -3.7318616, lng: -38.5266704}; //FORTALEZA
  capitais[6] = {lat: -5.0446853, lng: -42.7662325}; //TERESINA
  capitais[7] = {lat: -2.5391099, lng: -44.2829046}; //SAO LUIS
//SUDESTE
  capitais[8] = {lat: -23.5505199, lng: -46.6333094}; //SAO PAULO
  capitais[9] = {lat: -22.9068467, lng: -43.1728965}; //RIO DE JANEIRO
  capitais[10] = {lat: -20.2976178, lng: -40.2957768}; //VITORIA
  capitais[11] = {lat: -19.9166813, lng: -43.9344931}; //BELO HORIZONTE
//SUL
  capitais[12] = {lat: -25.4289541, lng: -49.267137}; //CURITIBA
  capitais[13] = {lat: -27.5953778, lng: -48.5480499}; //FLORIANOPOLIS
  capitais[14] = {lat: -30.0346471, lng: -51.2176584}; //PORTO ALEGRE
//DF
  capitais[15] = {lat: -15.7942287, lng: -47.8821658}; //BRASILIA
//CENTRO OSTE
  capitais[16] = {lat: -16.6868912, lng: -49.2647943}; //GOIANIA
  capitais[17] = {lat: -20.4697105, lng: -54.6201211}; //CAMPO GRANDE
  capitais[18] = {lat: -15.6014109, lng: -56.0978917}; //CUIABA
//NORTE
  capitais[19] = {lat: 0.0355735, lng: -51.070535}; //AMAPA
  capitais[20] = {lat: -3.1190275, lng: -60.0217314}; //MANAUS
  capitais[21] = {lat: -1.4557549, lng: -48.4901799}; //BELEM
  capitais[22] = {lat: -9.9753837, lng: -67.824918}; //RIO BRANCO
  capitais[23] = {lat: 2.8235098, lng: -60.6758331}; //BOA VISTA
  capitais[24] = {lat: -10.249091, lng: -48.3242858}; //PALMAS
  capitais[25] = {lat: -8.7611605, lng: -63.9004303}; //PORTO VELHO

      
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -12, lng: -38},
          streetViewControl: false,
          mapTypeControl: false,
          zoom: 5
    });

    var i;
    for(i = 0; i < capitais.length; i++){
    	addMarker(map, capitais[i], "");
    }

    

    google.maps.event.addListener(map, 'click', function(event) {
        if(currentmarker != null)
          currentmarker.setMap(null);
        //document.getElementById('posicoes-clicadas').innerHTML+= event.latLng+"<br/>";
        //updatePositionTable(event.latLng);
        //currentmarker = addMarker(map, event.latLng, "A");
    });

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('buscar-cidade'));
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

    autocomplete.addListener('place_changed', function() {
          if(currentmarker != null)
            currentmarker.setMap(null);
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }
          var inBR = false;
          for(i = 0; i < place.address_components.length; i++){
            if(place.address_components[i].short_name == "BR")
              inBR = true;
          }
          if(inBR == false){
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setIcon(/** @type {google.maps.Icon} */({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
          }));
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          addMarker(map,marker.position, "");

          var UF = "";
          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');

            for(var i = 0; i < place.address_components.length; i++){
              if(place.address_components[i].types[0] == "administrative_area_level_1")
                UF = place.address_components[i].short_name ;
            }
          }

          

          

          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
          infowindow.open(map, marker);
          updatePositionTable(marker.position, place.name, UF);
          console.log(place.address_components[3].short_name);
          console.log(getMedia(place.name.toUpperCase()));
        });
}

function addMarker(map, location, label){
	var marker = new google.maps.Marker({
          position: location,
          map: map,
          label: label
    });

    google.maps.event.addListener(marker, 'click', function(event) {
          //document.getElementById('posicoes-clicadas').innerHTML+= event.latLng+"<br/>";
          //updatePositionTable(event.latLng);
          //if(currentmarker != null)
          //  currentmarker.setMap(null);
    });

    return marker;
}

function updatePositionTable(latLng, endereco, estado){
  //document.getElementById('info-latitude').innerHTML= latLng.lat();
  //document.getElementById('info-longitude').innerHTML= latLng.lng();
  document.getElementById('info-cidade').innerHTML= endereco;
  document.getElementById('info-uf').innerHTML= estado;

  var medias = getMedia(endereco.toUpperCase());
  document.getElementById('info-redacao').innerHTML= medias[0].toFixed(2);
  document.getElementById('info-chumanas').innerHTML= medias[1].toFixed(2);
  document.getElementById('info-cnaturais').innerHTML= medias[2].toFixed(2);
  document.getElementById('info-linguagens').innerHTML= medias[3].toFixed(2);
  document.getElementById('info-matematica').innerHTML= medias[4].toFixed(2);

}

function getMap(){
  return map;
}

initMap();