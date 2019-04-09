function person(firstname, lastname){
    this.firstname = firstname,
    this.lastname = lastname
    
}

person.prototype.age = null;
person.prototype.greet = function(age){
    console.log("Hello " + this.firstname + " " + this.lastname + " Idade: " + this.age);
}

var joao = new person('Joao', 'Abreu');
joao.age=18;
joao.greet();
var antonio = new person('Antonio', 'Sousa');
antonio.age=20;
antonio.greet();


console.log(joao.__proto__);
console.log(antonio.__proto__);
console.log(joao.__proto__ == antonio.__proto__)
