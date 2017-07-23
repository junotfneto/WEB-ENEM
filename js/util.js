function validaCaracteres(strToReplace) {
strSChar = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
strNoSChars = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
var newStr = "";
for (var i = 0; i < strToReplace.length; i++) {
    if (strSChar.indexOf(strToReplace.charAt(i)) != -1) {
        newStr += strNoSChars.substr(strSChar.search(strToReplace.substr(i, 1)), 1);
    } else {
        newStr += strToReplace.substr(i, 1);
    }
}

return newStr.replace(/[^a-zA-Z 0-9]/g, '').toUpperCase();
}