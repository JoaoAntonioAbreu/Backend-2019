


    function started() {
        console.log("Started Download")
    };

   function update () {
        for (let i = 1; i <= 100; i++) {
            console.log(i + "% of Download");
        }
    };
    function completed () {
        console.log("Download Completed")
    };

function performDownload(started, update,completed){
    started();
    update();
    completed();
}

performDownload(started, update,completed);


var ArrayUtils = require("./ArrayUtils.js");

var array = [1,2,3,4];
var a1 = [2,3,4];
var a2 = [3,4,5];
var startIndex = 1;
var endIndex = 3;
var index1 = 1;
var index2 = 3;
var value = 1;


var isEmpty = "isEmpty: " + ArrayUtils.isEmpty(array);
console.log(isEmpty);

var max = "max: " + ArrayUtils.max(array);
console.log(max);

var min = "min: " + ArrayUtils.min(array);
console.log(min);

var average = "average: " + ArrayUtils.average(array);
console.log(average);

var indexOf = "indexOf: " + ArrayUtils.indexOf(array, value);
console.log(indexOf);

var subArray = "subArray: " + ArrayUtils.subArray(array, startIndex, endIndex);
console.log(subArray);

var isSameLength = "isSameLength: " + ArrayUtils.isSameLength(a1,a2);
console.log(isSameLength);

var reverse = "reverse: " + ArrayUtils.reverse(array);
console.log(reverse);

var swap = "swap: " + ArrayUtils.swap(array, index1, index2);
console.log(swap);

var contains = "contains: " + ArrayUtils.contains(array, value);
console.log(contains);

var concatenate = "concatenate : " + ArrayUtils.concatenate(a1,a2);
console.log(concatenate);