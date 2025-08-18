# Тестовое задание bltz-wb

## Команды:

Запуск базы данных:
```bash
docker compose up -d --build my_postgres
```
Для запуска миграций:
```bash
npm run migrate
```

Отдельная работа с миграциями:
```bash
npx knex migrate:latest
npx knex migrate:rollback --all
```

Для запуска в режиме разработки:
```bash
npm run dev
```

Для запуска приложения в режиме разработки c миграцией:
```bash
npm run start-with-migrate
```

Запуск проверки самого приложения:
```bash
docker compose up -d --build app
```

### Гугл таблица

[Ссылка]([https://www.genome.gov/](https://docs.google.com/spreadsheets/d/1pFLQttagLoGHpp4FWezoV_QvGkjUYGVAzBXEhnoPrzw/edit?usp=sharing))
Файл с кредами гугла btlz-wb-test-469415-f829d479cf7a.json в рут директории
