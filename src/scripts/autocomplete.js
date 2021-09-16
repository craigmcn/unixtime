import AutoComplete from 'js-autocomplete'
import timezones from '../data/timezones.json'

export default new AutoComplete({
    selector: '#timezone_select',
    minChars: 2,
    source: (term, suggest) => {
        term = term.toLowerCase()
        const suggestions = []
        for (let i = 0; i < timezones.length; i++) {
            if (~timezones[i].value.toLowerCase().indexOf(term)) { suggestions.push(timezones[i]) }
        }
        suggest(suggestions)
    },
    renderItem: (item, search) => {
        search = search.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
        const re = new RegExp('(' + search.split(' ').join('|') + ')', 'gi')
        return `<div class="autocomplete-suggestion" data-id="${
            item.id
        }" data-value="${item.value}">${item.value.replace(re, '<b>$1</b>')}</div>`
    },
    onSelect: (e, term, item) => {
        document.getElementById('timezone_select').value = item.dataset.value
        document.getElementById('timezone').value = item.dataset.id
    }
})
