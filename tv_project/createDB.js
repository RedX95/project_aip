const mongoose = require('mongoose');
const data = require('./data.js').data;
const Tv = require('./models/tv');

async function createDatabase() {
  try {
    console.log('Создание базы данных телевизоров...\n');
    
    // 1. Подключение к MongoDB
    console.log('1. Подключение к MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/tv_project');
    console.log('   Подключено успешно\n');
    
    // 2. Очистка базы
    console.log('2. Очистка базы данных...');
    await mongoose.connection.dropDatabase();
    console.log('   База очищена\n');
    
    // 3. Создание индексов
    console.log('3. Создание индексов...');
    await Tv.syncIndexes();
    console.log('   Индексы созданы\n');
    
    // 4. Добавление телевизоров
    console.log('4. Добавление телевизоров:');
    console.log('   ──────────────────────────────');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const tvData of data) {
      try {
        const tv = new Tv(tvData);
        await tv.save();
        successCount++;
        console.log(`   ${tvData.brand} ${tvData.title.split(' ').slice(1).join(' ')}`);
      } catch (err) {
        errorCount++;
        console.log(`   Ошибка: ${tvData.title} - ${err.message}`);
      }
    }
    
    console.log('\n   ──────────────────────────────');
    console.log(`   Успешно: ${successCount}`);
    console.log(`   Ошибок: ${errorCount}`);
    
    // 5. Проверка результатов
    const totalTvs = await Tv.countDocuments();
    console.log(`\n5. Итог: ${totalTvs} телевизоров в базе`);
    
    // 6. Вывод списка брендов
    const brands = await Tv.distinct('brand');
    console.log(`   Бренды: ${brands.join(', ')}`);
    
    console.log('\nБаза данных успешно создана!');
    
  } catch (err) {
    console.error('\nКритическая ошибка:', err.message);
    console.error('   Проверьте, запущен ли MongoDB сервер');
    console.error('   Команда для запуска: mongod');
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('\nСоединение с базой закрыто');
    }
    console.log('\nДля запуска приложения выполните: npm start');
  }
}

createDatabase();