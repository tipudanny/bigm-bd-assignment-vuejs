import Vue from 'vue';
import moment from "moment";

Vue.filter('ucFirst', (value) => {
    return value.ucfirst();
})

Vue.filter('capsAll', (value) => {
    return value.toUpperCase();
})

Vue.filter('fullDate', (value) => {
    return moment(value).format('LLLL');
})

Vue.filter('date', (value) => {
    return moment(value).format('DD/MM/YYYY');
})

Vue.filter('diffForHuman', (value) => {
    return moment(value).fromNow();
})

Vue.filter('dateWithMonth', (value) => {
    if (value !== null && value !== 'N/A') return moment(value).format('DD MMM,  YYYY')
})

Vue.filter('dateWithTime', (value) => {
    return moment(value).format('DD-MM-YYYY hh:mm a');
})

Vue.filter('str_limit', (value, size) => {
    if (!value) return '';
    value = value.toString();

    if (value.length <= size) {
        return value;
    }
    return value.substr(0, size) + '...';
});


//v-html to plain text conversion
Vue.filter('toText', (value) => {
    return value.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'')
        .replace(/<[^>]+?>/g,'')
        .replace(/\s+/g,' ')
        .replace(/ /g,' ')
        .replace(/>/g,' ');
})


