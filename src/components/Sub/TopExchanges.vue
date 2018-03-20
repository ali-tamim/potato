<template>
    <div class="top">
        <h4><span v-lang.Topexchanges></span> {{ coinname }} <span v-lang.by></span> {{ currency }}: </h4>
        <div>
            <md-table v-show="!loading">
                <md-table-row v-for="(oneTop, index) in top" :key="index">
                    <md-table-cell md-numeric>{{ oneTop.exchange }}</md-table-cell>
                    <md-table-cell md-numeric>{{ converData(oneTop.volume24hTo) }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
        <div v-show="loading">
            <md-progress-spinner class="md-primary loading" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
        </div>
    </div>
</template>
<style>
    .top{
        border-top: 1px solid #e040fb;
        border-left: 1px solid #e040fb;
        padding: 10px 20px;
    }
</style>
<script>
export default {
    name: 'Top',
    props: ['coinname', 'currency'],
    data: function () {
        return {
            top: [],
            loading: true
        }
    },
    mounted () {
        this.getTopData()
        console.log(this.coinname)
    },
    watch: {
        currency: function () {
            this.getTopData()
        }
    },
    methods: {
        getTopData: function () {
            if (this.$ls.get('top-data-' + this.coinname + '-' + this.currency)) {
                this.top = JSON.parse(this.$ls.get('top-data-' + this.coinname + '-' + this.currency))
                this.loading = false
            } else {
                this.$http.get('https://min-api.cryptocompare.com/data/top/exchanges?fsym=' + this.coinname + '&tsym=' + this.currency).then(res => {
                    this.$ls.set('top-data-' + this.coinname + '-' + this.currency, JSON.stringify(res.body.Data), 15 * 60 * 1000)
                    this.top = res.body.Data
                    this.loading = false
                }, res => {
                    console.log(res)
                })
            }
        },
        converData: function (data) {
            // eslint-disable-next-line
            return CCC.convertValueToDisplay(CCC.STATIC.CURRENCY.getSymbol(this.currency), data)
        }
    }
}
</script>
