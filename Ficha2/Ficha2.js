//Ex 1
function imc(peso, altura) {
    imc = peso / (altura) ** 2
    info = ''
    if (imc < 18.5) {
        info = ('Ex1: '+'abaixo do peso');
    } else if (imc > 18.5 && imc < 25) {
        info = ('Ex1: '+'peso normal');
    } else if (25 < imc && imc < 30) {
        info = ('Ex1: '+'acima do peso');
    } else if (imc > 30) {
        info = ('Ex1: '+'obeso');
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
    inverso = ('Ex 2: ' + "frase inversa: " + inverso)

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
    vogal = ('Ex 3: ' + 'numero de vogais: ' + vogal);
    return vogal;
}
console.log(vogal('OlA mUndos'));

//Ex 4
function letras(frase, a) {
    frase = frase.toLowerCase();
    numero = 0;
    for (let i = 0; i < frase.length; i++) {
        if (frase[i] == a) {
            numero += 1;
        }
    }
    numero = ('Ex 4: ' + 'Vezes que ocorrem a referida letra: ' + numero);
    return numero;
}
console.log(letras('OlaaaaA Mundo', 'a'));

//Ex 5
function horas(e, s) {
    total = 0;
    hora = s - e;
    hora = hora.toFixed(2);
    hora = hora.toString().split(".");
    minutos = parseFloat((hora[1] * 0.01)) * 60;
    total = ("Ex 5: " + "O funcionario trabalhou no total " + hora[0] + " horas e " + minutos + " minutos")
    return total;
}
console.log(horas(8.15, 15.30));

//Ex 6
function retangulo(a, l) {
    console.log("Ex 6:")
    for (let i = 0; i < a; i++) {
        console.log("*".repeat(l))

    }
}
retangulo(10, 10);

//Ex 7
function triangulo(a) {
    console.log("Ex 7:")
    for (let i = 1; i <= a; i++) {
        console.log("*".repeat(i))
    }
}
triangulo(10);

//Ex 8

function caixa(l) {
    console.log("Ex 8:")
    for (let i = 1; i <= l; i++) {

        if (i == 1) { console.log("*".repeat(l)) }
        else if (i > 1 && i < 10) { console.log("*" + " ".repeat(l - 2) + "*") }
        else if (i == 10) { console.log("*".repeat(i)) }

    }
}

caixa(10)

//Ex 9 
function alunos() {
    var obj = { joao: 9, lenio: 2, antonio: 10.5 };
    list = [];
    list.push(obj)

    console.log(list)
}
alunos();