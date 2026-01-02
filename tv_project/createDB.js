const mongoose = require('mongoose');
const data = require('./data.js').data;

// Подключение к MongoDB
async function main() {
    try {
        console.log('1. Подключение к базе данных...');
        await mongoose.connect('mongodb://localhost/tv_project');

        console.log('2. Очистка базы данных...');
        await mongoose.connection.db.dropDatabase();

        console.log('3. Создание индексов...');
        require('./models/tv').Tv;

        for (const modelName of Object.keys(mongoose.models)) {
            await mongoose.models[modelName].createIndexes();
        }

        console.log('4. Добавление телевизоров...');
        const Tv = mongoose.models.Tv;

        for (const tvData of data) {
            const tv = new Tv({
                title: tvData.title,
                model:
                    tvData.nick +
                    '_' +
                    Date.now() +
                    '_' +
                    Math.random().toString(36).slice(2, 6),
                brand: tvData.title.split(' ')[0],
                diagonal: tvData.diagonal,
                price: tvData.price,
                display_technology: tvData.display_technology,
                features: tvData.features,
                energy_class: tvData.energy_class
            });

            await tv.save();
        }

        console.log('База успешно создана и проиндексирована');
    } catch (err) {
        console.error('Ошибка:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

// Запуск
main();
