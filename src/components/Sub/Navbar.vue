<template>
    <div>
        <md-toolbar class="md-primary">
            <h3 class="md-title" style="flex: 1">potato wallet</h3>
            <md-button class="md-icon-button">
                <img src="./../../assets/img/GitHub-Mark-32px.png"/>
            </md-button>
            <md-button @click="openReqInfo">!</md-button>
        </md-toolbar>
        <md-divider></md-divider>
        <div v-if="show" class="md-layout">
            <div class="md-layout-item md-size-5"></div>
            <div v-show="!loading" class="md-layout-item">
                <p v-lang.Hour></p>
                <md-table>
                    <md-table-row><md-table-cell v-lang.CallsMade></md-table-cell><md-table-cell v-lang.number></md-table-cell><md-table-cell v-lang.callleft></md-table-cell></md-table-row>
                    <md-table-row><md-table-cell v-lang.Histo></md-table-cell><md-table-cell>{{ info.Hour.CallsMade.Histo }}</md-table-cell><md-table-cell>{{ info.Hour.CallsLeft.Histo }}</md-table-cell></md-table-row>
                    <md-table-row><md-table-cell v-lang.News></md-table-cell><md-table-cell>{{ info.Hour.CallsMade.News }}</md-table-cell><md-table-cell>{{ info.Hour.CallsLeft.News }}</md-table-cell></md-table-row>
                    <md-table-row><md-table-cell v-lang.Price></md-table-cell><md-table-cell>{{ info.Hour.CallsMade.Price }}</md-table-cell><md-table-cell>{{ info.Hour.CallsLeft.Price }}</md-table-cell></md-table-row>
                    <md-table-row><md-table-cell v-lang.Strict></md-table-cell><md-table-cell>{{ info.Hour.CallsMade.Strict }}</md-table-cell><md-table-cell>{{ info.Hour.CallsLeft.Strict }}</md-table-cell></md-table-row>
                </md-table>
            </div>
            <div v-show="!loading" class="md-layout-item">
                <p v-lang.Minute></p>
                <md-table>
                    <md-table-row><md-table-cell v-lang.CallsMade></md-table-cell><md-table-cell v-lang.number></md-table-cell><md-table-cell v-lang.callleft></md-table-cell></md-table-row>
                    <md-table-row><md-table-cell v-lang.Histo></md-table-cell><md-table-cell>{{ info.Minute.CallsMade.Histo }}</md-table-cell><md-table-cell>{{ info.Minute.CallsLeft.Histo }}</md-table-cell></md-table-row>
                    <md-table-row><md-table-cell v-lang.News></md-table-cell><md-table-cell>{{ info.Minute.CallsMade.News }}</md-table-cell><md-table-cell>{{ info.Minute.CallsLeft.News }}</md-table-cell></md-table-row>
                    <md-table-row><md-table-cell v-lang.Price></md-table-cell><md-table-cell>{{ info.Minute.CallsMade.Price }}</md-table-cell><md-table-cell>{{ info.Minute.CallsLeft.Price }}</md-table-cell></md-table-row>
                    <md-table-row><md-table-cell v-lang.Strict></md-table-cell><md-table-cell>{{ info.Minute.CallsMade.Strict }}</md-table-cell><md-table-cell>{{ info.Minute.CallsLeft.Strict }}</md-table-cell></md-table-row>
                </md-table>
            </div>
            <div v-show="!loading" class="md-layout-item">
                <p v-lang.Second></p>
                <md-table>
                    <md-table-row><md-table-cell v-lang.CallsMade></md-table-cell><md-table-cell v-lang.number></md-table-cell><md-table-cell v-lang.callleft></md-table-cell></md-table-row>
                    <md-table-row><md-table-cell v-lang.Histo></md-table-cell><md-table-cell>{{ info.Second.CallsMade.Histo }}</md-table-cell><md-table-cell>{{ info.Second.CallsLeft.Histo }}</md-table-cell></md-table-row>
                    <md-table-row><md-table-cell v-lang.News></md-table-cell><md-table-cell>{{ info.Second.CallsMade.News }}</md-table-cell><md-table-cell>{{ info.Second.CallsLeft.News }}</md-table-cell></md-table-row>
                    <md-table-row><md-table-cell v-lang.Price></md-table-cell><md-table-cell>{{ info.Second.CallsMade.Price }}</md-table-cell><md-table-cell>{{ info.Second.CallsLeft.Price }}</md-table-cell></md-table-row>
                    <md-table-row><md-table-cell v-lang.Strict></md-table-cell><md-table-cell>{{ info.Second.CallsMade.Strict }}</md-table-cell><md-table-cell>{{ info.Second.CallsLeft.Strict }}</md-table-cell></md-table-row>
                </md-table>
            </div>
            <div class="md-layout-item md-size-5"></div>
        </div>
    </div>
</template>
<style scoped>
    .md-elevation-4{
        box-shadow: none;
    }
    .md-layout-item{
        padding: 10px;
    }
</style>
<script>
export default {
    data: function () {
        return {
            info: {Hour: {CallsMade: {}, CallsLeft: {}}, Minute: {CallsMade: {}, CallsLeft: {}}, Second: {CallsMade: {}, CallsLeft: {}}},
            show: false,
            loading: true
        }
    },
    mounted () {
        this.getInfoData()
    },
    methods: {
        getInfoData: function () {
            if (this.$ls.get('api-limit')) {
                this.info = JSON.parse(this.$ls.get('api-limit'))
                this.loading = false
            } else {
                this.$http.get('https://min-api.cryptocompare.com/stats/rate/limit').then(res => {
                    this.$ls.set('api-limit', JSON.stringify(res.body), 24 * 60 * 60 * 1000)
                    this.info = res.body
                    this.loading = false
                }, res => {
                    console.log(res)
                })
            }
        },
        openReqInfo: function () {
            if (this.show) {
                this.show = false
            } else {
                this.show = true
            }
        }
    }
}
</script>
