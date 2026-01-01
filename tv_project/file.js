// Альтернативная версия file.js
var async = require("async")

var numbers_to_check = [1, "два", 3, 4, 5]

async.each(
    numbers_to_check,
    function(element, report) {
        if(typeof element === "number") {
            report()
        } else {
            report("Нашли не число: " + element)
        }
    },
    function(info) {
        if(info) {
            console.log(info)
        } else {
            console.log("Проверка прошла успешно. Все элементы массива являются числами")
        }
    }
)