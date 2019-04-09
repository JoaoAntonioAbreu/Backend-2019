// Ex 5
function notaFinal(nota_pratica, nota_teorica) {

    var nota_final = (nota_teorica + nota_pratica) / 2;

    if (nota_final < 9) {
        return('aluno reprovado')
    } else {
        return('aluno aprovado')
    }
}

console.log(notaFinal(12, 10));


// Ex 6
function MesPorExtenso(mes) {

    if (mes == 1) {
        return('Janeiro')
    }
    else if (mes == 2) {
        return('Feveriro')
    }
    else if (mes == 3) {
        return('Março')
    }
    else if (mes == 4) {
        return('Abril')
    }
    else if (mes == 5) {
        return('Maio')
    }
    else if (mes == 6) {
        return('Junho')
    }
    else if (mes == 7) {
        return('Julho')
    }
    else if (mes == 8) {
        return('Agosto')
    }
    else if (mes == 9) {
        return('Setembro')
    }
    else if (mes == 10) {
        return('Outubro')
    }
    else if (mes == 11) {
        return('Novembro')
    }
    else if (mes == 12) {
        return('Dezembro')
    }
    else {
        return('mes invaligo')
    }
}
console.log(MesPorExtenso(12));

//Ex 7
function Calculadora(a, b, c) {
    if (c == '+') {
        return a + b;
    }
    else if (c == '-') {
        if (a > b) {
            return a - b;
        }
        else {
            return b - a;
        }
    }
    else if (c == '*') {
        return a * b;
    }
    else if (c == '/') {
        return a / b;
    }
    else if (c == '^') {
       
        return a ** b;
    }
    else {
        return('Operação invalida')
    }

}
console.log(Calculadora(2,2,'+'));

//Ex 8
function multiplos5(numero) {
    var n = [];
   for ( i = 1; i < numero; i++) {
       if (i % 5 == 0){
           n.push(i);        
       }
   }
   return n;
}
console.log(multiplos5(20));

//Ex 9
function soma(num){
   var t = 0;
    for (i = 0; i <= num; i++) {
        t = t + i
    }
    return t;
}
console.log(soma(100));

//Ex 10
function factorial (num){
    var f = 1;
    for (i = 1; i <= num; i++){
        f = f * i
    }
    return f;
}
console.log(factorial(5))

//Ex11
function max(array){
    var max = array[0];
    for (let i = 1; i < array.length; i++) {
             if(array[i] > max){
                 max = array[i];
             }  
    }
    return max;     
}
console.log(max([1,5,19]));

function min(array){
    var min = array[0];
    for (let i = 1; i < array.length; i++) {
             if(array[i] < min){
                min = array[i];
             }  
    }
    return min;     
}
console.log(min([1,5,19]));

function med(array){
    var med = array[0];
    for (let i = 1; i < array.length; i++) {
        med =(med + array[i])
    }
    med = med/array.length;
    return med;     
}
console.log(med([1,10,19]));