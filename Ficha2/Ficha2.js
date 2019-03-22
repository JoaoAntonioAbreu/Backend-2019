//Ex 1
function imc(peso, altura) {
    imc = peso / (altura) ** 2
    info = ''
    if (imc < 18.5) {
        info = 'abaixo do peso';
    } else if (imc > 18.5 && imc < 25) {
        info = 'peso normal';
    } else if (25 < imc && imc < 30) {
        info = 'acima do peso';
    } else if (imc > 30) {
        info = 'obeso';
    }
    return info;
}
console.log(imc(150, 2));

//Ex 2
function frase(frase) {
    var strsplit = frase.split(" ");
    var inverso = [];
    for (let i = 0; i < strsplit.length; i++) {
        for (let j = strsplit[i].length - 1; j >= 0; j--) {
            inverso = inverso + strsplit[i][j]
        }
        inverso += " ";
    }

    return inverso;
}
console.log(frase('ola mundo'));


//Ex 3
function vogal(frase) {
    frase = frase.toLowerCase();
    var vogais = ['a', 'e', 'i', 'o', 'u'];
    vogal = 0;
    for (let i = 0; i < frase.length; i++) {
        for (let j = 0; j < vogais.length; j++) {
            if (frase[i] == vogais[j]) {
                vogal = vogal + 1
            }
        }
    }
    vogal = 'numero de vogais: ' + vogal;
    return vogal;
}
console.log(vogal('OlA mUndos'));

//Ex 4
function letras(frase ,a){
frase = frase.toLowerCase();
numero = 0;
   for (let i = 0; i < frase.length; i++) {
        if (frase[i] == a){
            numero +=1;
        }
   }
   numero = 'Vezes que ocorrem a referida letra: '+numero;
   return numero;
}
console.log(letras('OlaaaaA Mundo','a'));