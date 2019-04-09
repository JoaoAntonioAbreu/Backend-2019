var array = [];
array.push(function (){
     return 'Hello';
});


array.push(function(){
    return 'world';
});

array.push(function(){
    return '1 2 3';
});


for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
    
}
console.log(array);

