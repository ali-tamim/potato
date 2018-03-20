<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
    body {
        background-color: #ffffff;
    }
    @import "~vue-material/dist/theme/engine"; // Import the theme engine
    @include md-register-theme("default", (
            primary: md-get-palette-color(purple, A200), // The primary color of your application
            accent: md-get-palette-color(red, A200), // The accent or secondary color
            all: md-get-palette-color(red, A200) // The accent or secondary color
    ));
    @import "~vue-material/dist/theme/all"; // Apply the theme
    .md-table-cell-container{
        text-align: left;
    }
    .loading{
        width: 100%;
        height: 200px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }
</style>
