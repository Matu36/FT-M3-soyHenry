function sumaArray (array, n) {
    if (!Array.isArray (array)) throw new TypeError ("array");
    if (typeof n !== "number") throw new TypeError ("number");
    for (var i = 0; i < array.length; i++) {
        for (var j = i + 1; j < array.length; j ++) {
            if (array[i] + array [j] === n) return true;
        }
    }
    return false
    
    };
    
    
    module.exports = {sumaArray}