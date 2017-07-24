var buttonCep = document.querySelector("#submit-cep");
buttonCep.addEventListener("click", function (event) {

    event.preventDefault();
    inputCep = document.querySelector("#buscar-cidade-cep");
    var cep = inputCep.value;
    cep = cep.replace(/\D/g, '');

    if (cep.length == 8) {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            var xhr = new XMLHttpRequest();            var url = 'https://viacep.com.br/ws/' + cep + '/json/';            xhr.open("GET", url, true);
            xhr.send();
            xhr.addEventListener("load", function () {
                if (xhr.status == 200) {
                    var data = JSON.parse(xhr.responseText);
                    if (!("erro" in data)) {
                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode({ 'address': data.localidade + ", " + data.uf }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                var thisMap = getMap();
                                var loc = results[0]["geometry"]["location"];
                                addMarker(thisMap, loc, "");

                                thisMap.setCenter(loc);
                                thisMap.setZoom(17);
                                updatePositionTable(loc, data.localidade, data.uf);
                            }
                        });
                    }
                    else {
                        //CEP inválido.
                        inputCep.value = ("");
                        alert("CEP inválido.");
                    }
                }
                else {
                    inputCep.value = ("");
                    alert("Erro ao buscar CEP.");
                }
                

            });

        } //end if.
        else {
            //Formato de CEP inválido.
            inputCep.value = ("");
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //CEP sem valor ou incompleto.
        inputCep.value = ("");

        if (cep == "") {
            alert("O campo de CEP está vazio.");
        }
        else {
            alert("O CEP está incompleto.");
        }
    }
});
