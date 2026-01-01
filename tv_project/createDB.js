var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tv_project');

var Tv = require('./models/tv').Tv;
var data = require('./data.js').data;

async function fillDatabase() {
    try {
        console.log('Подключение к MongoDB...');
        
        // Ожидаем подключения
        await mongoose.connection.asPromise();
        console.log('Подключение установлено');
        
        // Удаляем ВСЕ документы из коллекции (вместо dropDatabase)
        await Tv.deleteMany({});
        console.log('Старые данные удалены');
        
        // Создаем индексы если нужно
        await Tv.createIndexes();
        
        var savedCount = 0;
        
        // Сохраняем все телевизоры
        for (var i = 0; i < data.length; i++) {
            var tvData = data[i];
            var uniqueModel = tvData.nick + '_' + Date.now() + '_' + i;
            
            var tv = new Tv({
                title: tvData.title,
                model: uniqueModel,
                brand: tvData.title.split(' ')[0],
                diagonal: tvData.diagonal || 55,
                price: tvData.price || 50000,
                display_technology: tvData.display_technology || 'LCD',
                features: tvData.features || ['Smart TV'],
                energy_class: tvData.energy_class || 'A',
                created: new Date()
            });
            
            await tv.save();
            savedCount++;
            console.log('Сохранен: ' + tv.title + ' (' + tv.model + ')');
        }
        
        console.log('Всего сохранено телевизоров: ' + savedCount);
        
    } catch (err) {
        console.log('Ошибка:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('Соединение с базой закрыто');
    }
}

// Запуск
fillDatabase();