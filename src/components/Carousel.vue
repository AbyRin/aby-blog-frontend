<template>
  <div class="slider">
    <div class="slider-wrapper">
      <img :src="currentSlide.url" alt="">
    </div>
    <div class="slider-footer">
      <p>{{ currentSlide.title }}</p>
      <ul class="slider-indicator">
        <li v-for="(index) in sliderData" :key="index" :class="{ active: index === currentIndex }" />
      </ul>
      <div class="toggle">
        <button class="prev" @click="prevSlide">
          &lt;
        </button>
        <button class="next" @click="nextSlide">
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            sliderData: [
                { url: './image/reptile_image/0.png'},
                { url: './image/reptile_image/1.png'},

            ],
            currentIndex: 0,
            // testImg: './image/reptile_image/0.png',
        };
    },
    computed: {
        currentSlide() {
            return this.sliderData[this.currentIndex];
        },
    },
    mounted() {
        console.log('Image Path:', this.currentSlide.url);
        setInterval(this.nextSlide, 1500);
    },
    methods: {
        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.sliderData.length;
        },
        prevSlide() {
            this.currentIndex = (this.currentIndex - 1 + this.sliderData.length) % this.sliderData.length;
        },
    },
};
</script>

<style scoped lang="scss">
.slider {
    width: 560px;
    height: 400px;
    overflow: hidden;

    .slider-wrapper {
        width: 100%;
        height: 320px;

        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }

    .slider-footer {
        height: 80px;
        background-color: #31384f;
        padding: 12px 12px 0 12px;
        position: relative;

        .toggle {
            position: absolute;
            right: 0;
            top: 12px;
            display: flex;

            button {
                margin-right: 12px;
                width: 28px;
                height: 28px;
                appearance: none;
                border: none;
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
                border-radius: 4px;
                cursor: pointer;
            }

            &:hover {
                background: rgba(255, 255, 255, 0.2);
            }
        }

        p {
            color: #fff;
            font-size: 18px;
            margin: 0 0 10px;
        }

        .slider-indicator {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            align-items: center;

            li {
                width: 8px;
                height: 8px;
                margin: 4px;
                border-radius: 50%;
                background: #fff;
                opacity: 0.4;
                cursor: pointer;

                &.active {
                    width: 12px;
                    height: 12px;
                    opacity: 1;
                }
            }
        }
    }
}
</style>