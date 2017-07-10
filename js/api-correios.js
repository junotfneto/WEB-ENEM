$("#submit-cep").click(function (event) {
    event.preventDefault();
    var cep = $("#buscar-cidade-cep").val();

    if (cep.length < 8) {
        alert("Digita o bagulho certo ai doente!");
        return;
    }

    var url = "http://correiosapi.apphb.com/cep/" + cep;


    $.ajax({
        type: "POST",
        url: url,
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'callback',
        jsonpCallback: 'jsonpCallback',
        contentType: "application/json",
        statusCode: {
            200: function (data) {
                $("#resultado-bairro").html(data.bairro);
                $("#resultado-cep").html(data.cep);
                $("#resultado-cidade").html(data.cidade);
                $("#resultado-estado").html(data.estado);
                $("#resultado-logradouro").html(data.logradouro);
                $("#resultado-logradouro-tipo").html(data.tipoDeLogradouro);
                
                console.log(data);
                //alert("Bairro: " + data.bairro + "\n" + "CEP: " + data.cep + "\n" + "Cidade: " + data.cidade + "\n" + "Estado: " + data.estado + "\n" + "Logradouro: " + data.logradouro + "\n" + "Tipo de logradouro: " + data.tipoDeLogradouro);
            } // Ok
            , 400: function (msg) { console.log(msg); } // Bad Request
            , 404: function (msg) {
                alert("CEP não encontrado!!");
            } // Not Found
        }
    });

});



