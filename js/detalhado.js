function updatePositionTableDetalhado(endereco, estado){
  //document.getElementById('info-latitude').innerHTML= latLng.lat();
  //document.getElementById('info-longitude').innerHTML= latLng.lng();
  console.log(enem[0]);
  document.getElementById('info-cidade2').innerHTML= endereco;
  document.getElementById('info-uf2').innerHTML= estado;

  var medias = calculaMedias(validaCaracteres(endereco));

  document.getElementById('info-redacao').innerHTML= medias[0].toFixed(2);
  if(isNaN(medias[0]))
    document.getElementById('info-redacao').innerHTML= "Sem dados suficientes";
  document.getElementById('info-chumanas').innerHTML= medias[1].toFixed(2);
  if(isNaN(medias[1]))
    document.getElementById('info-chumanas').innerHTML= "Sem dados suficientes";
  document.getElementById('info-cnaturais').innerHTML= medias[2].toFixed(2);
  if(isNaN(medias[2]))
    document.getElementById('info-cnaturais').innerHTML= "Sem dados suficientes";
  document.getElementById('info-linguagens').innerHTML= medias[3].toFixed(2);
  if(isNaN(medias[3]))
    document.getElementById('info-linguagens').innerHTML= "Sem dados suficientes";
  document.getElementById('info-matematica').innerHTML= medias[4].toFixed(2);
  if(isNaN(medias[4]))
    document.getElementById('info-matematica').innerHTML= "Sem dados suficientes";

}

var url = new URL(window.location.href);
var c = url.searchParams.get("city");
console.log(c);
var s = url.searchParams.get("state");
console.log(s);

updatePositionTableDetalhado(c, s);


var rangeIdade = document.getElementById("range-idade");
rangeIdade.addEventListener("change", function(evt){
  document.getElementById("lbl-idade").innerHTML = this.value;
  updatePositionTableDetalhado(c, s);
});

var i;

for(i = 0; i <= 5; i++){
  document.getElementById("c"+i).addEventListener("change", function(evt){
    var j;
    for(j = 0; j <= 5; j++){
      if(document.getElementById("c"+j).checked == true)
        break;
    }
    if(j > 5)
      this.checked = true;
    updatePositionTableDetalhado(c, s);
  });
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

function calculaMedias(cidade){
    var i;

    var cores = Array();
    for(i = 0; i <= 5; i++){
        cores[i-1] = false;
        if(document.getElementById("c"+i).checked)
          cores[i-1] = true;
    }

    var media = Array();
    //var media = 0.0;
    media[0] = 0.0;
    media[1] = 0.0;
    media[2] = 0.0;
    media[3] = 0.0;
    media[4] = 0.0;

    var cont = 0;
    var contpub = 0;
    var contpri = 0;
    for(i = 0; i < enem.length; i++){
      if(enem[i].NO_MUNICIPIO_RESIDENCIA == cidade){
        if(enem[i].IDADE > Number(document.getElementById("range-idade").value))
          continue;
        if(cores[enem[i].TP_COR_RACA] == false)
          continue;

        media[0] += enem[i].NU_NOTA_REDACAO;
        if(isNumeric(enem[i].NOTA_CH))
          media[1] += enem[i].NOTA_CH;
        if(isNumeric(enem[i].NOTA_CN))
          media[2] += enem[i].NOTA_CN;
        if(isNumeric(enem[i].NOTA_LC))
          media[3] += enem[i].NOTA_LC;
        if(isNumeric(enem[i].NOTA_MT))
          media[4] += enem[i].NOTA_MT;
        cont++;
        
      }
    }
    for(i = 0; i < media.length; i++){
      media[i] = media[i]/cont;
    }
    return media;
}