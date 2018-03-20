<template>
    <div class="news">
        <h3 v-lang.news></h3>
        <md-field v-show="!loading">
            <label for="providers" v-lang.providers></label>
            <md-select v-model="selected" name="providers" id="providers" multiple>
                <md-option v-for="(p, index) in pro" :key="index" :value="p">{{ p }}</md-option>
            </md-select>
        </md-field>
        <div v-show="!loading" class="news-post" v-for="(news, index) in filterNews" :key="index">
            <img :src="news.imageurl" />
            <p class="title">{{ news.title }}</p>
            <div>
                <md-chip class="md-primary">Static</md-chip>
                <md-chip class="md-primary">Static</md-chip>
                <md-chip class="md-primary">Static</md-chip>
                <md-chip class="md-primary">Static</md-chip>
            </div>
            <md-button :href="news.url" class="md-primary" target="_blank">read more!</md-button>
        </div>
        <md-progress-spinner v-show="loading" class="md-primary loading" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
    </div>
</template>
<style scoped>
    .news{
        border-top: 1px solid #e040fb;
        border-left: 1px solid #e040fb;
        padding: 0px 40px 0px 40px;
    }
    .news-post{
        margin-bottom: 15px;
        border-bottom: 1px solid #e040fb;
        padding: 0px 0px 40px 0px;
    }
    .news-post img{
        width: 100%;
    }
    .title{
        padding: 0px 10px;
        font-weight: bold;
        background-color: #FFFFFF;
    }
</style>
<script>
export default {
    name: 'News',
    data: function () {
        return {
            allNews: [],
            selected: [],
            pro: [],
            filterNews: [],
            loading: true
        }
    },
    mounted () {
        this.getNewsData()
        this.filterN()
    },
    watch: {
        selected: function () {
            this.filterN()
        }
    },
    methods: {
        filterN: function () {
            this.filterNews = []
            this.selected.forEach((select) => {
                this.allNews.forEach((news) => {
                    if (news.source === select) {
                        console.log(news.source)
                        this.filterNews.push(news)
                    }
                })
            })
        },
        getNewsData: function () {
            if (this.$ls.get('news-data')) {
                this.allNews = JSON.parse(this.$ls.get('news-data'))
                this.allNews.forEach((news) => {
                    if (this.pro.indexOf(news.source) === -1) {
                        this.pro.push(news.source)
                    }
                })
                this.selected.push('ccn')
                this.loading = false
            } else {
                this.$http.get('https://min-api.cryptocompare.com/data/news/?lang=EN').then(res => {
                    this.$ls.set('news-data', JSON.stringify(res.body), 24 * 60 * 60 * 1000)
                    this.allNews = res.body
                    this.loading = false
                }, res => {
                    console.log(res)
                })
            }
        }
    }
}
</script>
