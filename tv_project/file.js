// Файл: tv_project/file.js
var async = require("async")

async.series([
    function(callback) {
        callback(null, "MAMA")
    },
    function(callback) {
        callback(null, "MЫЛА")
    },
    function(callback) {
        callback(null, "РАМУ")
    }
], function(err, result) {
    if(err) {
        console.log("Ошибка: " + err)
    } else {
        console.log(result.join(" "))   
    }
})