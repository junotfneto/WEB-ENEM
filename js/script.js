//Apenas números no input.
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

//Ao apertar ENTER no input de CEP ele realiza o procedimento sem precisar clickar no botão BUSCAR.
var buscarcep = document.getElementById("buscar-cidade-cep");
buscarcep.addEventListener("keypress", function(e){
    if (e.wich == 13 || e.keyCode == 13) {
        document.getElementById("submit-cep").click();
    }
});

var detalhes = document.getElementById("submit-detalhes");
detalhes.addEventListener("click", function(e){
    window.open("detalhado.html?city="+document.getElementById('info-cidade').innerHTML+"&state="+document.getElementById('info-uf').innerHTML,"_self");
});

//Máscara de CEP.
function mascara(t, mask) {
    var i = t.value.length;
    var saida = mask.substring(1, 0);
    var texto = mask.substring(i)
    if (texto.substring(0, 1) != saida) {
        t.value += texto.substring(0, 1);
    }
}