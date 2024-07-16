
# Олигонуклеотидный синтезатор

SPA, эмулирующее работу синтезатора олигонуклеотидов. Синтезатор может обрабатывать задачи на синтез последовательностей нуклеотидов, которые можно создавать, редактировать и удалять. Состояние синтезатора изменяется в зависимости от текущей задачи и количества выполненных задач.

## Основные возможности

- Добавление последовательностей в очередь на синтез.
- Индикация статуса синтезатора ("занят", "бездействует", "на обслуживании").
- Индикация прогресса синтеза последовательности.
- Валидация последовательностей (только символы "a", "t", "g", "c" и длина от 6 до 120) как при добавлении, так и при редактировании.
- Возможность редактирования и удаления последовательностей, если они еще не в обработке.
- Система таймеров, эмулирующая процесс присоединения букв к последовательности (1 буква = 1 секунда).
- Переключение синтезатора в режим обслуживания каждые пять выполненных задач на 3 секунды.
- Выбор приоритета задачи: низкого, среднего или высокого.
- Страница просмотра всех задач, включая выполненные.
- Расчет времени выполнения всех задач и каждой конкретной задачи.

## Stack

- Vue 3
- Vue Router
- Pinia 
- TypeScript

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run start
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```


## Комментарии
- Перед началом работы ТЗ было разбито на подзадачи.

  <img src="https://github.com/user-attachments/assets/1c78d466-5a1f-4fea-9ca2-eedd2618febf" style="width:600px;"/>

- Для снижения риска ошибок и самодокументируемости был выбран TypeScript.
- Логика таймера отделена от зависимых данных (он принимает три коллбэка) и вынесена из стора для возможности переиспользования.
- Таймер привязан к Date, а не только к SetInterval, потому что SetInterval не гарантирует точного времени.
- Для того, чтобы пользователь видел все символы, выбран textarea, а не input. Однако, поскольку многострочного ввода не предусмотрено, форма всё равно отправляется по нажатию Enter.
- С целью поддержания иммутабельности все данные, используемые вне стора, вынесены либо в геттеры, либо в computed.
