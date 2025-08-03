# План миграции на Nuxt 4 с Pinia

## ✅ Выполнено

### 1. Обновление зависимостей
- ✅ Обновлен `package.json` для Nuxt 4
- ✅ Заменен Vuex на Pinia 3.0.3
- ✅ Обновлены все зависимости до совместимых версий
- ✅ Удален Tailwind CSS (по требованию)

### 2. Структура виджета
- ✅ Создана папка `widgets/org-chart/`
- ✅ Скопированы все компоненты
- ✅ Создан Pinia store (`stores/orgChart.js`)
- ✅ Создан главный виджет (`index.vue`)

### 3. Миграция на Vue 3
- ✅ Обновлен `nuxt.config.js` для Nuxt 4
- ✅ Заменен Options API на Composition API
- ✅ Обновлен главный компонент `OrgChart.vue`
- ✅ Создан `app.vue` для Nuxt 4

### 4. Store миграция
- ✅ Vuex → Pinia
- ✅ `mapState` → `computed(() => store.state)`
- ✅ `mapActions` → прямые вызовы методов
- ✅ Добавлены все необходимые методы

## 🔄 В процессе

### 5. Обновление компонентов
- ⏳ Обновить все компоненты для Vue 3
- ⏳ Заменить `this.$router` на `useRouter()`
- ⏳ Обновить обработку событий
- ⏳ Исправить импорты компонентов

### 6. Тестирование
- ⏳ Проверить работу всех функций
- ⏳ Исправить ошибки компиляции
- ⏳ Протестировать интеграцию

## 📋 Следующие шаги

### 7. Доработка компонентов
```bash
# Обновить остальные компоненты
widgets/org-chart/components/PageHeader.vue
widgets/org-chart/components/SideScreen.vue
widgets/org-chart/components/EditMenu.vue
widgets/org-chart/components/ShowPerson.vue
widgets/org-chart/components/DeptBox.vue
widgets/org-chart/components/ShowDept.vue
# ... и другие
```

### 8. Интеграция с основным проектом
1. Скопировать папку `widgets/org-chart/` в основной проект
2. Добавить зависимости в `package.json`:
   ```json
   {
     "dependencies": {
       "@pinia/nuxt": "^0.11.2",
       "pinia": "^3.0.3"
     }
   }
   ```
3. Добавить модуль в `nuxt.config.js`:
   ```js
   modules: ['@pinia/nuxt']
   ```
4. Импортировать виджет:
   ```vue
   <template>
     <OrgChartWidget />
   </template>
   
   <script setup>
   import OrgChartWidget from '~/widgets/org-chart/index.vue'
   </script>
   ```

### 9. Финальная настройка
- ⏳ Настроить внешние файлы данных (`data.js`, `config.js`)
- ⏳ Добавить TypeScript (опционально)
- ⏳ Оптимизировать производительность
- ⏳ Добавить тесты

## 🎯 Результат

После завершения миграции у вас будет:
- ✅ Современный виджет на Nuxt 4
- ✅ Использование Pinia вместо Vuex
- ✅ Composition API вместо Options API
- ✅ Готовность к интеграции в основной проект
- ✅ Совместимость с вашими версиями зависимостей

## 🚀 Запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

## 📁 Структура после миграции

```
project/
├── widgets/
│   └── org-chart/          # Виджет для интеграции
│       ├── components/     # Vue компоненты
│       ├── stores/         # Pinia stores
│       ├── assets/         # Стили и ресурсы
│       └── index.vue       # Главный виджет
├── pages/
│   └── index.vue          # Главная страница
├── app.vue                # Главный компонент
├── nuxt.config.js         # Конфигурация Nuxt 4
└── package.json           # Зависимости
``` 