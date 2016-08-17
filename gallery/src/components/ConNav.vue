<template lang="html">
<ul class="controller-nav">
    <li v-for="navStatus in aNavStatus"
        v-bind:class="{ 'js-click': i === $index }"
        v-on:click="navOverTurn($index)"
    ></li>
</ul>
</template>


<script>
let aNavStatus = [];
for (let i = 0; i < 16; i++) {
    aNavStatus[i] = {
        isClick: false
    };
}

export default {
    data() {
        return {
            aNavStatus,
            i: 0
        }
    },
    methods: {
        navOverTurn(iIndex) {
            this.i = iIndex;
        }
    }
};
</script>

<style>
    .controller-nav {
        position: absolute;
        left: 0;
        bottom: 30px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }
    .controller-nav li {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        border-radius: 50%;
        background-color: #aaa;
        text-align: center;
        transform: scale(.5);
        transition: all .5s;
    }
    /*按钮被点击*/
    .controller-nav .js-click {
        transform: scale(1);
    }
    .controller-nav .js-click::after {
        display: inline-block;
        text-align: center;
        line-height: 30px;
        content: "\e600";
        font-family: "icons-turn-arrow";
        font-size: 80%;
        color: #fff;
    }
</style>
