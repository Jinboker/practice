<template>
    <div class="content">
        <div class="wrap">
            <img-sec></img-sec>
            <controller-nav></controller-nav>
        </div>
    </div>
</template>

<script>

import ImgSec from './components/ImgSec.vue'
import ConNav from './components/ConNav.vue'

export default {
    components: {
        "img-sec": ImgSec,
        "controller-nav": ConNav
    }
}

</script>

<style>
body,ul,ol,dl,dd,h1,h2,h3,h4,h5,h6,p,input,select,textarea,form{margin: 0; padding: 0;}
img{border:none;}
ul,ol{list-style:none;}
input,select,textarea{outline:none;border:none;background:none;}
textarea{resize:none;}
a{text-decoration:none;}

@font-face {
    font-family: "icons-turn-arrow";
    src: url("./fonts/icons/turn-arrow.woff") format("woff");\
    font-weight: normal;
    font-size: normal;
}

html, body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}
body {
    color: #555;
    font-family: 'Avenir Next', 'Lantinghei SC','宋体';
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.content {
    height: 100%;
    width: 100%;
    background-color: #fff;
}

.wrap {
    position: absolute;
    top: 50%;
    margin-top: -400px;
    width: 100%;
    height: 800px;
    background-color: #333;
    overflow: hidden;
}
</style>
