import Vue from 'vue';

Vue.filter('currency', function(n, currency) {
    if (!n) return n;
    const hashCurrencies = {
        'EUR': '€',
        'USD': '$'
    }
    let numString = n.toString().slice(0, -2) + ',' + n.toString().slice(-2)
    if (currency !== 'USD')
        return `${numString} ${hashCurrencies[currency]}`
    else
        return `${hashCurrencies[currency]} ${numString}`
});