<template>
    <div>
        <app-navbar></app-navbar>
        <div class="md-layout">
            <div class="md-layout-item md-size-5"></div>
            <div class="md-layout-item md-size-90">
                <app-welcome :currency="currency" @changeCurrency="changeCurrency"></app-welcome>
                <offline @detected-condition="handleConnectivityChange"></offline>
            </div>
            <div class="md-layout-item md-size-5"></div>
            <div class="md-layout-item md-size-5"></div>
            <div class="md-layout-item md-size-60 md-xlarge-size-60 md-large-size-60 md-medium-size-90">
                <br>
                <app-coin :info="info" id="btchis" coinname="BTC" name="Bitcoin - BTC" :currency="currency" :price="inCurrency(price).BTC"></app-coin>
                <app-coin :info="info" id="ethhis" coinname="ETH" name="Ethereum - ETH" :currency="currency" :price="inCurrency(price).ETH"></app-coin>
                <app-coin :info="info" id="xrphis" coinname="XRP" name="Ripple - XRP" :currency="currency" :price="inCurrency(price).XRP"></app-coin>
            </div>
            <div class="md-layout-item md-size-30 md-xlarge-size-30 md-large-size-30 md-medium-size-100">
                <app-top coinname="BTC" :currency="currency" style="margin-top: 20px"></app-top>
                <app-top coinname="ETH" :currency="currency"></app-top>
                <app-top coinname="XRP" :currency="currency"></app-top>
                <app-news></app-news>
            </div>
            <div class="md-layout-item md-size-5"></div>
        </div>
        <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="showSnackbar" md-persistent>
            <span>Connection is lost, u are offline!</span>
        </md-snackbar>
    </div>
</template>
<style scoped>
</style>

<script>
import offline from 'v-offline'
import Navbar from './Sub/Navbar.vue'
import Welcome from './Sub/Welcome.vue'
import Coin from './Sub/Coin.vue'
import News from './Sub/News.vue'
import Top from './Sub/TopExchanges.vue'
export default {
    name: 'home',
    components: {
        'app-navbar': Navbar,
        'app-welcome': Welcome,
        'app-coin': Coin,
        'app-news': News,
        'app-top': Top,
        offline
    },
    data: function () {
        return {
            currency: this.$ls.get('currency', 'USD'),
            price: {
                'USD': {
                    'BTC': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''},
                    'ETH': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''},
                    'XRP': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''}
                },
                'EUR': {
                    'BTC': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''},
                    'ETH': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''},
                    'XRP': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''}
                },
                'GBP': {
                    'BTC': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''},
                    'ETH': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''},
                    'XRP': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''}
                },
                'JPY': {
                    'BTC': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''},
                    'ETH': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''},
                    'XRP': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''}
                },
                'CNY': {
                    'BTC': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''},
                    'ETH': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''},
                    'XRP': {FROMSYM: '', FROMSYMBOL: '', PRICE: '', CHANGE24HOUR: '', CHANGE24HOURPCT: '', LASTMARKET: '', LASTTRADEID: '', OPENHOUR: '', HIGHHOUR: '', LOWHOUR: '', OPEN24HOUR: '', OPEN24HOURNOSYM: '', HIGH24HOUR: '', LOW24HOUR: '', LASTVOLUME: '', LASTVOLUMETO: '', VOLUME24HOUR: '', VOLUME24HOURTO: ''}
                }
            },
            info: {loading: true},
            showSnackbar: false,
            Infinity: true
        }
    },
    watch: {
        currency: function () {
            this.$ls.set('currency', this.currency)
        }
    },
    mounted () {
        this.socketSub()
        this.language = this.$route.params.lang
    },
    methods: {
        changeCurrency: function (data) {
            this.currency = data
        },
        socketSub: function () {
            var subAdd = [
                '5~CCCAGG~BTC~USD', '5~CCCAGG~BTC~EUR', '5~CCCAGG~BTC~GBP', '5~CCCAGG~BTC~JPY', '5~CCCAGG~BTC~CNY',
                '5~CCCAGG~ETH~USD', '5~CCCAGG~ETH~EUR', '5~CCCAGG~ETH~GBP', '5~CCCAGG~ETH~JPY', '5~CCCAGG~ETH~CNY',
                '5~CCCAGG~XRP~USD', '5~CCCAGG~XRP~EUR', '5~CCCAGG~XRP~GBP', '5~CCCAGG~XRP~JPY', '5~CCCAGG~XRP~CNY'
            ]
            this.$socket.emit('SubAdd', {subs: subAdd})
            this.$options.sockets.m = (message) => {
                var messageType = message.substring(0, message.indexOf('~'))
                var res = {}
                // eslint-disable-next-line
                if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
                    // eslint-disable-next-line
                    res = CCC.CURRENT.unpack(message)
                    this.dataUnpack(res)
                }
            }
        },
        dataUnpack: function (data) {
            var from = data['FROMSYMBOL']
            var to = data['TOSYMBOL']
            // eslint-disable-next-line
            var fsym = CCC.STATIC.CURRENCY.getSymbol(from)
            // eslint-disable-next-line
            var tsym = CCC.STATIC.CURRENCY.getSymbol(to)
            // eslint-disable-next-line
            this.price[to][from].FROMSYM = CCC.STATIC.CURRENCY.getSymbol(from)
            for (var key in data) {
                if (key === 'PRICE' || key === 'LASTVOLUMETO' || key === 'VOLUME24HOURTO' || key === 'OPEN24HOUR' || key === 'OPENHOUR' || key === 'HIGH24HOUR' || key === 'HIGHHOUR' || key === 'LOWHOUR' || key === 'LOW24HOUR') {
                    // eslint-disable-next-line
                    this.price[to][from][key] = CCC.convertValueToDisplay(tsym, data[key])
                } else if (key === 'LASTVOLUME' || key === 'VOLUME24HOUR') {
                    // eslint-disable-next-line
                    this.price[to][from][key] = CCC.convertValueToDisplay(fsym, data[key])
                } else {
                    this.price[to][from][key] = data[key]
                }
            }
            // eslint-disable-next-line
            data.hasOwnProperty('OPEN24HOUR') ? this.price[to][from].OPEN24HOURNOSYM = data['OPEN24HOUR'] : ''
            if (data.hasOwnProperty('PRICE')) {
                // eslint-disable-next-line
                this.price[to][from].CHANGE24HOUR =  CCC.convertValueToDisplay(tsym, (data['PRICE'] - this.price[to][from].OPEN24HOURNOSYM))
                // eslint-disable-next-line
                this.price[to][from].CHANGE24HOURPCT =  ((data['PRICE'] - this.price[to][from].OPEN24HOURNOSYM) / this.price[to][from].OPEN24HOURNOSYM * 100).toFixed(2) + '%';
            }
            this.info.loading = false
        },
        inCurrency: function (price) {
            // eslint-disable-next-line
            if (this.currency === 'EUR') {return price.EUR}// eslint-disable-next-line
            else if (this.currency === 'GBP') { return price.GBP }// eslint-disable-next-line
            else if (this.currency === 'JPY') { return price.JPY }// eslint-disable-next-line
            else if (this.currency === 'CNY') { return price.CNY }
            return price.USD
        },
        handleConnectivityChange (status) {
            if (!status) {
                this.showSnackbar = true
            } else {
                this.showSnackbar = false
            }
        }
    }
}
</script>
