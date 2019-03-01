function notas_predefinida()
{
    var nota_teorica = 10;
    var nota_pratica = 13;
    var nota_final = (nota_teorica + nota_pratica) / 2;
    return nota_final;
}    
function notas_pergunta(nota1, nota2)
{
    string = "indique a nota1";
    nota1 = prompt("indique a sua nota1");
    nota2 = prompt("indique a sua nota2");
    var resultado = nota1 + nota2;
    return resultado
}