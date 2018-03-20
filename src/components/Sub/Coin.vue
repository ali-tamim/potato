<template>
    <div class="coin">
        <h4>{{ name }} <span v-lang.Priceby></span> {{ currency }}: </h4>
        <div v-show="!info.loading" class="md-layout info">
            <div class="md-layout-item md-size-30 md-xsmall-size-100">
                <h1 class="price">{{ price.PRICE }}</h1>
                <small class="md-xsmall-hide">
                    <table class="table-info one-info ">
                        <col width="80">
                        <tr><td v-lang.hChange24></td><td>{{ price.CHANGE24HOUR }} <small>({{ price.CHANGE24HOURPCT }})</small></td></tr>
                        <tr><td v-lang.LastMarket></td><td>{{ price.LASTMARKET }}</td></tr>
                        <tr><td v-lang.TradeID>:</td><td>{{ price.LASTTRADEID }}</td></tr>
                    </table>
                </small>
            </div>
            <div class="md-layout-item md-size-35 other-info md-xsmall-hide">
                <small class="md-xsmall-hide">
                    <table class="table-info">
                        <col width="125">
                        <tr><td v-lang.OpenHour></td><td>{{ price.OPENHOUR }}</td></tr>
                        <tr><td v-lang.HighHour></td><td>{{ price.HIGHHOUR }}</td></tr>
                        <tr><td v-lang.LowHour></td><td>{{ price.LOWHOUR }}</td></tr>
                        <tr><td v-lang.LastTradeVolume></td><td>{{ price.LASTVOLUME }}</td></tr>
                        <tr><td v-lang.LastTradeVolumeTo></td><td>{{ price.LASTVOLUMETO }}</td></tr>
                    </table>
                </small>
            </div>
            <div class="md-layout-item md-size-35 other-info md-xsmall-hide">
                <small class="md-xsmall-hide">
                    <table class="table-info">
                        <col width="100">
                        <tr><td v-lang.OpenDay></td><td>{{ price.OPEN24HOUR }}</td></tr>
                        <tr><td v-lang.HighDay></td><td>{{ price.HIGH24HOUR }}</td></tr>
                        <tr><td v-lang.LowDay></td><td>{{ price.LOW24HOUR }}</td></tr>
                        <tr><td v-lang.hVolume24></td><td>{{ price.VOLUME24HOUR }}</td></tr>
                        <tr><td v-lang.hVolumeTo24></td><td>{{ price.VOLUME24HOURTO }}</td></tr>
                    </table>
                </small>
            </div>
            <div class="md-layout-item md-size-100">
                <app-chart :id="id" :from="coinname" :to="currency" :chartData="coinData()" :format="format" :his="hisBy"></app-chart>
                <md-content>
                    <div class="his">
                        <md-button v-lang.h1 @click="hisByChanger('hour')" :class="['md-icon-button md-dense', hisBy == 'hour' ? 'md-primary' : '']"></md-button>
                        <md-button v-lang.d1 @click="hisByChanger('day')" :class="['md-icon-button md-dense', hisBy == 'day' ? 'md-primary' : '']"></md-button>
                        <md-button v-lang.w1 @click="hisByChanger('week')" :class="['md-icon-button md-dense', hisBy == 'week' ? 'md-primary' : '']"></md-button>
                        <md-button v-lang.m1 @click="hisByChanger('month')" :class="['md-icon-button md-dense', hisBy == 'month' ? 'md-primary' : '']"></md-button>
                        <md-button v-lang.y1 @click="hisByChanger('year')" :class="['md-icon-button md-dense', hisBy == 'year' ? 'md-primary' : '']"></md-button>
                    </div>
                    <md-divider></md-divider>
                </md-content>
            </div>
        </div>
        <div v-show="info.loading">
            <md-progress-spinner class="md-primary loading" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>
    </div>
</template>
<style scoped>
    .coin {
        padding: 10px 0px;
        border-top: 1px solid #e040fb;
        margin-bottom: 30px;
    }
    .info{
    }
    .one-info{
        padding: 10px;
    }
    .price{
        text-align: center;
    }
    .other-info{
        border-left: 1px solid #e040fb;
        padding: 4px;
    }
    .table-info td{
        padding: 4px 0px;
    }
    .his{
        padding: 20px 0px;
        text-align: right;
        margin-right: 30px;
    }
</style>
<script>
import Chart from './Chart.vue'
export default {
    components: {
        'app-chart': Chart
    },
    name: 'coin',
    props: ['info', 'name', 'currency', 'price', 'id', 'coinname'],
    data: function () {
        return {
            hisBy: 'year',
            format: 'YYYY MMM D',
            btchisData: [],
            ethhisData: [],
            xrphisData: []
        }
    },
    mounted () {
        this.getHisData(this.coinname, this.currency)
    },
    watch: {
        currency: function (newVal, oldVal) {
            this.getHisData(this.coinname, this.currency)
        },
        hisBy: function () {
            this.getHisData(this.coinname, this.currency)
        }
    },
    methods: {
        coinData: function () {
            if (this.coinname === 'BTC') {
                return this.btchisData
            } else if (this.coinname === 'ETH') {
                return this.ethhisData
            } else if (this.coinname === 'XRP') {
                return this.xrphisData
            }
        },
        getHisData: function (par, currency) {
            if (this.$ls.get('his-data-' + this.hisBy + '-' + par + '-' + currency)) {
                console.log('now : his-data-' + this.hisBy + '-' + par + '-' + currency)
                var hisData = JSON.parse(this.$ls.get('his-data-' + this.hisBy + '-' + par + '-' + currency))
                if (par === 'BTC') {
                    this.btchisData = hisData
                } else if (par === 'ETH') {
                    this.ethhisData = hisData
                } else if (par === 'XRP') {
                    this.xrphisData = hisData
                }
            } else {
                var url = ''
                if (this.hisBy === 'year') {
                    url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + par + '&tsym=' + currency + '&limit=365'
                } else if (this.hisBy === 'month') {
                    url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + par + '&tsym=' + currency + '&limit=30'
                } else if (this.hisBy === 'week') {
                    url = 'https://min-api.cryptocompare.com/data/histoday?fsym=' + par + '&tsym=' + currency + '&limit=7'
                } else if (this.hisBy === 'day') {
                    url = 'https://min-api.cryptocompare.com/data/histohour?fsym=' + par + '&tsym=' + currency + '&limit=24'
                } else if (this.hisBy === 'hour') {
                    url = 'https://min-api.cryptocompare.com/data/histominute?fsym=' + par + '&tsym=' + currency + '&limit=60'
                }
                this.$http.get(url).then(res => {
                    var expire = 1
                    if (this.hisBy === 'year' || this.hisBy === 'month') {
                        expire = 24 * 60 * 60 * 1000
                    } else if (this.hisBy === 'week') {
                        expire = 2 * 60 * 60 * 1000
                    } else if (this.hisBy === 'day') {
                        expire = 30 * 60 * 1000
                    } else {
                        expire = 5 * 60 * 1000
                    }
                    this.$ls.set('his-data-' + this.hisBy + '-' + par + '-' + currency, JSON.stringify(res.body.Data), expire)
                    if (par === 'BTC') {
                        this.btchisData = res.body.Data
                    } else if (par === 'ETH') {
                        this.ethhisData = res.body.Data
                    } else if (par === 'XRP') {
                        this.xrphisData = res.body.Data
                    }
                }, res => {
                    console.log(res)
                })
            }
        },
        hisByChanger: function (by) {
            this.hisBy = by
            if (by === 'year') {
                this.format = 'YYYY MMM D'
            } else if (by === 'month') {
                this.format = 'MMM D'
            } else if (by === 'week') {
                this.format = 'll'
            } else if (by === 'day') {
                this.format = 'Ha'
            } else if (by === 'hour') {
                this.format = 'h:mm a'
            }
        }
    }
}
</script>
