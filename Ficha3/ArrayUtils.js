var arrayUtils = {
    isEmpty: function (array) {
        if (array.length == 0) {
            return true
        } else {
            return false
        }

    },
    max: function (array) {
        var max = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i] > max) {
                max = array[i];
            }
        }
        return max;
    },
    min: function (array) {
        var min = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i] < min) {
                min = array[i];
            }
        }
        return min;
    },
    average: function (array) {
        var med = array[0];
        for (let i = 1; i < array.length; i++) {
            med = (med + array[i])
        }
        med = med / array.length;
        return med;
    },

    indexOf: function (array, value) {
        return (array.indexOf(value));
    },

    subArray: function (array, startIndex, endIndex) {
        var subarray = [];
        for (let i = startIndex ; i < array.length && i <= endIndex; i++){
           subarray.push(array[i]);
        }
        return subarray;
    },

    isSameLength: function(a1,a2){
        if (a1.length == a2.length){
            return true;
        } else {
            return false;
        }
    },

    reverse: function(array){
        var inverso = [];
        for (let i = array.length - 1; i >= 0; i--){
            inverso.push(array[i]);
        }
        return inverso;
    },

    swap: function(array, index1, index2){
        var numero = array[index1]
        array[index1] = array[index2 ]
        array[index2] = numero
        return array
    },

    contains : function(array, value){
        var contains = '';
        for (let i = 0; i < array.length; i++) {
             if(array[i] == value){
                 contains = true;
             }else {
                 contains = false;
             }
            
        }return contains;
    },

    concatenate: function(a1,a2){
       var conc = [];
        for (let i = 0; i < a1.length; i++) {
            conc.push(a1[i]);
        }
        for (let j = 0; j < a2.length; j++) {
            conc.push(a2[j]);
            
        }
        return conc.sort();
    }

}

module.exports = arrayUtils;

