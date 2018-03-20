import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import VueSocketio from 'vue-socket.io'
import vueMoment from 'vue-moment'
import MultiLanguage from 'vue-multilanguage'
import Storage from 'vue-ls'
var options = {
    namespace: 'potato-', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
}

// eslint-disable-next-line
import Chart from 'chart.js'
require('./assets/ccc-streamer-utilities.js')
window.Vue = Vue

var lang = {
    default: 'en',
    en: {
        Hour: 'Hour',
        CallsMade: 'Calls Made',
        callleft: 'call left',
        number: 'number',
        Histo: 'Histo',
        News: 'News',
        Price: 'Price',
        Strict: 'Strict',
        Minute: 'Minute',
        Second: 'Second',
        welcomein: 'welcome in',
        des: 'We provide live prices, historical information, and news for Bitcoin - BTC, Ethereum - ETH, and Ripple - XRP to 100k unique user per day.',
        Priceby: 'Price by',
        OpenHour: 'Open Hour',
        HighHour: 'HIGH Hour',
        LowHour: 'Low Hour',
        LastTradeVolume: 'Last Trade Volume',
        LastTradeVolumeTo: 'Last Trade Volume To',
        OpenDay: 'Open Day',
        HighDay: 'High Day',
        LowDay: 'Low Day',
        hVolume24: '24h Volume',
        hVolumeTo24: '24h VolumeTo',
        hChange24: '24h Change',
        LastMarket: 'Last Market',
        TradeID: 'Trade ID',
        y1: 'Y',
        m1: 'M',
        w1: 'W',
        d1: 'D',
        h1: 'H',
        Topexchanges: 'Top exchanges for',
        by: 'by',
        news: 'News',
        providers: 'providers'
    },
    ar: {
        Hour: 'في الساعة',
        CallsMade: 'نوع الطلب',
        callleft: 'وقت الاتصال',
        number: 'كم مرة',
        Histo: 'التاريخ',
        News: 'الاخبار',
        Price: 'الاسعار',
        Strict: 'صارم',
        Minute: 'في الدقيقة',
        Second: 'في الثانية',
        welcomein: 'مرحبا بك في',
        des: 'نحن نوفر معلومات مباشرة عن الاسعار والتغيرات في الاسعار وكذلك اخبار العملات مثل بتكون.',
        Priceby: 'السعر محول الى',
        OpenHour: 'بداية الساعة',
        HighHour: 'اعلى قيمة بالساعة',
        LowHour: 'اقل قيمة بالساعة',
        LastTradeVolume: 'قيمة اخر متاجرة',
        LastTradeVolumeTo: 'قيمة اخر متاجرة محولة',
        OpenDay: 'بداية اليوم',
        HighDay: 'اعلى قيمة اليوم',
        LowDay: 'اقل قيمة اليوم',
        hVolume24: 'القيمة في كل اليوم',
        hVolumeTo24: 'القيمة في كل اليوم محولة',
        hChange24: 'معدل التغير بالقيمة',
        LastMarket: 'اخر متجر',
        TradeID: 'رقم المتاجرة',
        y1: 'س',
        m1: 'ش',
        w1: 'اس',
        d1: 'ي',
        h1: 'سع',
        Topexchanges: 'افضل المتاجر لل',
        by: 'محمولة الى',
        news: 'الاخبار',
        providers: 'المزودين'
    }
}
Vue.use(MultiLanguage, lang)
Vue.use(VueMaterial)
Vue.use(vueResource)
Vue.use(vueMoment)
Vue.use(Storage, options)
Vue.use(VueSocketio, 'https://streamer.cryptocompare.com/')
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
