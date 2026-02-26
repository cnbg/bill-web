import { usePrimeVue } from 'primevue/config'

export function changePrimeVueLocale(locale: string) {
    const primevue = usePrimeVue()

    if(primevue?.config?.locale && locale === 'ru') {
        primevue.config.locale.startsWith = 'Начинается с'
        primevue.config.locale.contains = 'Содержит'
        primevue.config.locale.notContains = 'Не содержит'
        primevue.config.locale.endsWith = 'Заканчивается на'
        primevue.config.locale.equals = 'Равно'
        primevue.config.locale.notEquals = 'Не равно'
        primevue.config.locale.lt = 'Меньше чем'
        primevue.config.locale.lte = 'Меньше или равно'
        primevue.config.locale.gt = 'Больше чем'
        primevue.config.locale.gte = 'Больше или равно'
        primevue.config.locale.clear = 'Очистить'
        primevue.config.locale.apply = 'Применить'
        primevue.config.locale.noFilter = 'Без фильтра'        
    }
}