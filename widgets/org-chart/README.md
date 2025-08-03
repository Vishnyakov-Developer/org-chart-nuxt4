# OrgChart Widget

Виджет организационной диаграммы для Nuxt 4 с Pinia.

## Структура

```
widgets/org-chart/
├── components/          # Vue компоненты
│   ├── OrgChart.vue    # Главный компонент диаграммы
│   ├── PageHeader.vue  # Заголовок страницы
│   ├── SideScreen.vue  # Боковая панель
│   ├── EditMenu.vue    # Меню редактирования
│   ├── ShowPerson.vue  # Отображение сотрудника
│   ├── DeptBox.vue     # Блок отдела
│   ├── ShowDept.vue    # Отображение отдела
│   └── ...             # Другие компоненты
├── stores/
│   └── orgChart.js     # Pinia store
├── composables/
│   └── useAsyncComputed.js # Замена AsyncComputed
├── assets/
│   └── css/
│       └── main.css    # Стили
└── index.vue          # Главный виджет
```

## Использование

### В основном проекте

```vue
<template>
  <div>
    <OrgChartWidget />
  </div>
</template>

<script setup>
import OrgChartWidget from '~/widgets/org-chart/index.vue'
</script>
```

### Импорт в другой проект

1. Скопируйте папку `widgets/org-chart/` в ваш проект
2. Установите зависимости:
   ```bash
   npm install pinia @pinia/nuxt pug
   ```
3. Добавьте модуль в `nuxt.config.js`:
   ```js
   modules: ['@pinia/nuxt']
   ```
4. Импортируйте виджет в вашем компоненте

## API

### Store (Pinia)

```js
import { useOrgChartStore } from '~/widgets/org-chart/stores/orgChart'

const store = useOrgChartStore()

// Основные методы
store.initStore()           // Инициализация
store.setActiveDepartment(dept)  // Установить активный отдел
store.setShowPerson(person)      // Показать сотрудника
store.initZoom()           // Инициализация зума
```

### Composables

```js
import { useAsyncComputed } from '~/widgets/org-chart/composables/useAsyncComputed'

const { result, loading, error } = useAsyncComputed(() => {
  // Ваша асинхронная логика
  return fetch('/api/data')
})
```

### События

Виджет поддерживает следующие события:
- `mousemove` - отслеживание мыши
- `keyup` - обработка клавиш (ESC для отмены)

## Конфигурация

Виджет использует внешние файлы для данных:
- `data.js` - данные организационной структуры
- `config.js` - конфигурация
- `translate.js` - переводы

## Миграция с Vue 2

Основные изменения:
- Vuex → Pinia
- Options API → Composition API
- `this.$router` → `useRouter()`
- `mapState` → `computed(() => store.state)`
- `vue-async-computed` → `useAsyncComputed` composable

## Решенные проблемы

### Pug поддержка
- Установлен `pug@^3.0.1` для поддержки шаблонов
- Обновлены плагины для Nuxt 4

### Плагины
- `AsyncComputed.js` - обновлен для Nuxt 4
- `HelpFunctions.js` - добавлен правильный экспорт
- Удален пустой `vueMatertialIcons.js`

### Конфигурация
- Добавлен `compatibilityDate: '2025-08-04'` в `nuxt.config.js`

## Зависимости

- Nuxt 4.0.1
- Vue 3.5.18
- Pinia 3.0.3
- @heroicons/vue 2.2.0
- panzoom 9.4.3
- lodash 4.17.19
- pug 3.0.1 