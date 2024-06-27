<template>
    <div class="slider">
        <div class="slide">
            <img :src="images[currentIndex].src" :alt="'Image ' + (currentIndex + 1)">
            <div class="title">{{ images[currentIndex].title }}</div>
            <button class="arrow left-arrow" @click="prev">
                <i class="fas fa-arrow-left"></i>
            </button>
            <button class="arrow right-arrow" @click="next">
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        <div class="buttons">   
            <button class="btn success" v-for="(image, index) in images" :key="index" @click="goToSlide(index)" :class="{ active: currentIndex === index }">
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [
                { src: '../../src/asstes/images/img1.jpg', title: 'Image 1 Title' },
                { src: '../../src/asstes/images/img2.jpeg', title: 'Image 2 Title' },
                { src: '../../src/asstes/images/img3.jpg', title: 'Image 3 Title' },
                { src: '../../src/asstes/images/img4.png', title: 'Image 4 Title' }
            ],
            currentIndex: 0,
            slideInterval: null
        };
    },
    mounted() {
        this.startAutoSlide();
    },
    beforeDestroy() {
        clearInterval(this.slideInterval);
    },
    methods: {
        prev() {
            this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
            this.resetAutoSlide();
        },
        next() {
            this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : this.currentIndex + 1;
            this.resetAutoSlide();
        },
        goToSlide(index) {
            this.currentIndex = index;
            this.resetAutoSlide();
        },
        startAutoSlide() {
            this.slideInterval = setInterval(() => {
                this.next();
            }, 5000); // Har 5 soniyada o'zgaradi
        },
        resetAutoSlide() {
            clearInterval(this.slideInterval);
            this.startAutoSlide();
        }
    }
};
</script>

<style scoped>
.slider {
    width: 1000px;
    margin: auto;
    text-align: center;
}
.slide {
    width: 100%;
    height: 500px;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.5s ease-in-out;
}
.title {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 16px;
    transition: opacity 0.5s ease-in-out;
}
.buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
button {
    border: none;
    color:#000;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}
button:hover {
    background-color: #115c1b;
}
button.active {
    background-color: #33ff00;
}
button i {
    font-size: 16px;
}
.arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    padding: 10px;
    height:300px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    opacity: 0%;
}
.arrow.left-arrow {
    left: 10px;
}
.arrow.right-arrow {
    right: 10px;
}
.arrow:hover {
    opacity: 50%;

    background-color: rgba(0, 0, 0, 0.8); /* To'yinganroq rang */
}
</style>
