<template lang="html">
    <ul class="img-sec">
        <li v-for="imgData in ImgDatas"
            :class="{ 'photo-center': centerClass === $index }"
            @click="photoTurnOver($index)"
        >
            <div class="photo-wrap">
                <div class="photo-front">
                    <div class="photo-content">
                        <img :src="imgData.url" :alt="imgData.title">
                    </div>
                    <p class="photo-title">{{ imgData.title }}</p>
                </div>
                <!-- <div class="photo-back">
                     {{ ImgDatas[imgData].desc }}
                </div> -->
            </div>
        </li>
    </ul>
</template>

<script>
import ImgDatas from '../data/imgDatas.json'

for (let i = 0; i < ImgDatas.length; i++) {
    ImgDatas[i].url = require('../images/' + ImgDatas[i].fileName);
}

export default {
    data() {
        return {
            ImgDatas,
            centerClass: 0
        }
    },
    methods: {
        photoTurnOver(iIndex) {
            this.centerClass = iIndex;
        }
    }
};

</script>

<style lang="css">
    .img-sec {
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
    }
    .img-sec li {
        width: 260px;
        height: 320px;
        padding: 20px;
        background-color: #eee;
        z-index: 1;
        box-shadow: 0 0 1px rgba(0, 0, 0, .01);
        overflow: hidden;
    }
    .photo-center {
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -160px 0 0 -130px;
    }
    .photo-wrap {
        width: 100%;
        height: 100%;
    }
    .photo-wrap img {
        width: 100%;
        vertical-align: middle;
    }
    .photo-content {
        width: 100%;
        height: 280px;
        line-height: 280px;
        overflow: hidden;
    }
    .photo-title {
        text-align: center;
        font-size: 16px;
        line-height: 60px;
    }
</style>
