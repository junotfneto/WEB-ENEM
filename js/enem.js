	var xhr = new XMLHttpRequest();
	var data;
	xhr.open("GET","https://raw.githubusercontent.com/junotfneto/WEB-ENEM/master/json/data.json");
	xhr.send();

	xhr.addEventListener("load", function(event){
		if(xhr.status != 200){
			console.log("E VISH");
			return;
		}
		document.getElementById("Carregando").innerHTML = "";
		data = JSON.parse(event.target.responseText);
		//for(i = 0; i < data.length; i++){
		//	console.log(data[i]);
		//}
		console.log(data[0]);
	});

	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	function getMedia(cidade){
		var i;
		var media = Array();
		//var media = 0.0;
		media[0] = 0.0;
		media[1] = 0.0;
		media[2] = 0.0;
		media[3] = 0.0;
		media[4] = 0.0;
		var cont = 0;
		for(i = 0; i < data.length; i++){
			if(data[i].NO_MUNICIPIO_RESIDENCIA == cidade){
				media[0] += data[i].NU_NOTA_REDACAO;
				if(isNumeric(data[i].NOTA_CH))
					media[1] += data[i].NOTA_CH;
				if(isNumeric(data[i].NOTA_CN))
					media[2] += data[i].NOTA_CN;
				if(isNumeric(data[i].NOTA_LC))
					media[3] += data[i].NOTA_LC;
				if(isNumeric(data[i].NOTA_MT))
					media[4] += data[i].NOTA_MT;
				cont++;
			}
		}
		for(i = 0; i < media.length; i++){
			media[i] = media[i]/cont;
		}
		return media;
	}

