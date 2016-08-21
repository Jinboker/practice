<template lang="html">
    <ul class="img-sec">
        <!-- 循环添加图片，photo-turn负责翻转 -->
        <li class="photo-list "
            v-for="imgData in ImgDatas"
            :class="{ 'photo-center': centerClass === $index }"
            @click="turnOver($index, $event)"
        >
            <div class="photo-turn">
                <div class="side side-front">
                    <div class="photo-ct">
                        <img :src="imgData.url" :alt="imgData.title">
                    </div>
                    <p class="photo-title">{{ imgData.title }}</p>
                </div>
                <div class="side side-back">
                    <p class="photo-desc">{{ imgData.desc }}</p>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import ImgDatas from '../data/imgDatas.json'

//动态添加图片的路径
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
        turnOver(iIndex, ev) {
            let cls = ev.currentTarget.className;

            cls = /photo-turn-back/.test(cls)
            ? cls.replace(/photo-turn-back/, '')
            : cls = cls + ' photo-turn-back';

            ev.currentTarget.className = cls;

            this.centerClass = iIndex;
        }
    }
};

</script>

<style lang="css">
    .img-sec {
        position: absolute;
        top: 50%;
        margin-top: -400px;
        width: 100%;
        height: 800px;
        background-color: #333;
        overflow: hidden;
    }
    .photo-list {
        position: absolute;
        top: 0;
        left: 0;
        width: 260px;
        height: 320px;
        z-index: 1;
        box-shadow: 0 0 1px rgba(0, 0, 0, .01);
        cursor: pointer;
        overflow: hidden;

        transition: all .5s;

        perspective: 1800px;
    }
    .photo-list .side {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 20px;
        background-color: #eee;
        box-sizing: border-box;
        overflow: hidden;
    }
    .photo-ct {
        width: 100%;
        height: 250px;
        line-height: 250px;
        overflow: hidden;
    }

    /*海报正面的样式*/
    .side-front img {
        width: 100%;
        vertical-align: middle;
    }
    .side-front .photo-title {
        text-align: center;
        font-size: 16px;
        line-height: 50px;
    }

    /*海报背面的样式*/
    .side-back .photo-desc {
        text-align: center;
        color: #666;
        font-weight: bold;
        font-size: 20px;
        line-height: 1.5em;
    }

    /*当前选中的海报的样式*/
    .img-sec .photo-center {
        left: 50%;
        top: 50%;
        margin: -160px 0 0 -130px;
        z-index: 88;
    }

    /*3d旋转*/
    .photo-turn {
        position: absolute;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;

        transition: all .5s;
    }
    .side-back {
        transform: rotateY(180deg);
    }
    .side-front {
        transform: rotateY(0deg);
    }
    .photo-list .side {
        backface-visibility:hidden;
    }
    .photo-turn-front .photo-turn {
        transform: rotateY(0deg);
    }
    .photo-turn-back .photo-turn {
        transform: rotateY(180deg);
    }
</style>
