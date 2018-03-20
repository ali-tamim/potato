<template>
    <div>
        <md-content class="welcome">
            <h2><span v-lang.welcomein></span> <img src="./../../assets/img/potato.png" width="20"/> <strong>potato wallet</strong></h2>
            <p v-lang.des></p>
        </md-content>
        <md-content>
            <div class="currency">
                <md-button @click="currencyChanger('USD')" :class="['md-icon-button md-raised', currency == 'USD' ? 'md-primary' : '']">$</md-button>
                <md-button @click="currencyChanger('EUR')" :class="['md-icon-button md-raised', currency == 'EUR' ? 'md-primary' : '']">€</md-button>
                <md-button @click="currencyChanger('GBP')" :class="['md-icon-button md-raised', currency == 'GBP' ? 'md-primary' : '']">£</md-button>
                <md-button @click="currencyChanger('JPY')" :class="['md-icon-button md-raised', currency == 'JPY' ? 'md-primary' : '']">¥</md-button>
                <md-button @click="currencyChanger('CNY')" :class="['md-icon-button md-raised', currency == 'CNY' ? 'md-primary' : '']">¥</md-button>
            </div>
        </md-content>
    </div>
</template>
<style scoped>
    .welcome {
        width: 100%;
        padding: 20PX;
        text-align: center;
    }
    .currency{
        margin-bottom: -38px;
        text-align: right;
        margin-right: 30px;
    }
    @media(min-width: 1280px) {
        .currency {
            margin-right: 460px;
        }
    }
</style>
<script>
export default {
    name: 'Welcome',
    props: ['currency'],
    data: function () {
        return {
            ccurrency: this.currency
        }
    },
    methods: {
        currencyChanger: function (ccurrency) {
            this.ccurrency = ccurrency
            this.$emit('changeCurrency', ccurrency)
        }
    }
}
</script>
