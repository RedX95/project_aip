// Файл: tv_project/test_model.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tv_project');
var Tv = require('./models/tv').Tv;

async function runTests() {
    try {
        // 2. Создание индексов
        await Tv.createIndexes();
        console.log('🔧 Индексы созданы');
        
        // 3. ТЕСТ 1: Валидация обязательных полей
        console.log('\n=== ТЕСТ 1: Валидация обязательных полей ===');
        try {
            const badTv = new Tv({ title: 'Телевизор без модели' });
            await badTv.save();
            console.log('ОШИБКА: Невалидные данные прошли!');
            return;
        } catch (err) {
            console.log('Ожидаемая ошибка:', err.message.split(':')[0]);
        }
        
        // 4. ТЕСТ 2: Проверка уникальности модели
        console.log('\n=== ТЕСТ 2: Проверка уникальности ===');
        const tv1 = new Tv({
            title: 'Телевизор 1',
            model: 'UNIQUE_MODEL_001',
            brand: 'Samsung',
            price: 10000
        });
        
        const tv2 = new Tv({
            title: 'Телевизор 2',
            model: 'UNIQUE_MODEL_001', // ТА ЖЕ МОДЕЛЬ!
            brand: 'LG',
            price: 20000
        });
        
        await tv1.save();
        console.log('Первый телевизор сохранен');
        
        try {
            await tv2.save();
            console.log('ОШИБКА: Дубликат прошел!');
            return;
        } catch (err) {
            if (err.code === 11000) {
                console.log('Ожидаемая ошибка дубликата');
            } else {
                throw err;
            }
        }
        
        // 5. ТЕСТ 3: Проверка граничных значений
        console.log('\n=== ТЕСТ 3: Граничные значения ===');
        const smallTv = new Tv({
            title: 'Маленький ТВ',
            model: 'SMALL_TV_001',
            brand: 'Samsung',
            diagonal: 20, // Меньше min: 32
            price: 5000  // Меньше min: 10000
        });
        
        try {
            await smallTv.save();
            console.log('ОШИБКА: Неверные границы прошли!');
            return;
        } catch (err) {
            console.log('Ожидаемая ошибка границ:', err.message.split(':')[0]);
        }
        
        // 6. ТЕСТ 4: Корректное сохранение
        console.log('\n=== ТЕСТ 4: Корректное сохранение ===');
        const goodTv = new Tv({
            title: 'Samsung QLED Q80',
            model: 'QE65Q80TAU',
            brand: 'Samsung',
            diagonal: 65,
            price: 120000,
            display_technology: 'QLED',
            features: ['Smart TV', 'HDR10+'],
            energy_class: 'A+'
        });
        
        const savedTv = await goodTv.save();
        console.log('Телевизор сохранен:', savedTv.title);
        console.log('Метод getInfo():', savedTv.getInfo());
        console.log('Дата создания:', savedTv.created);
        
        // 7. ТЕСТ 5: Проверка enum значений
        console.log('\n=== ТЕСТ 5: Проверка допустимых значений ===');
        const badBrandTv = new Tv({
            title: 'Неизвестный бренд',
            model: 'UNKNOWN_001',
            brand: 'UnknownBrand', // Нет в enum
            price: 10000
        });
        
        try {
            await badBrandTv.save();
            console.log('ОШИБКА: Неверный бренд прошел!');
            return;
        } catch (err) {
            console.log('Ожидаемая ошибка enum:', err.message.split(':')[0]);
        }
        
        console.log('\nВСЕ ТЕСТЫ ПРОЙДЕНЫ УСПЕШНО!');
        
    } catch (err) {
        console.error('Ошибка:', err.message);
    } finally {
        mongoose.disconnect();
    }
}

runTests();