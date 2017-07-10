// Apenas numeros no imput
function onlyNumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\ /;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

//Ao apertar ENTER no imput de CEP ele realiza o procedimento sem precisar clickar no botão BUSCAR
$("#buscar-cidade-cep").keypress(function (e) {
    if (e.wich == 13 || e.keyCode == 13) {
        $("#submit-cep").trigger("click");
    }
});