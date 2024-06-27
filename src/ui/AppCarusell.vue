<template>
  <div class="slider" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="slides" ref="slides">
      <div class="slide" :key="index" v-for="(image, index) in images" :style="{ transform: 'translateX(' + (index - currentIndex) * 100 + '%)' }">
        <img :src="image.src" :alt="image.title" @mousedown.prevent>
        <div class="content">
          <div class="slide-content">
            <div class="title">{{ image.title }}</div>
          </div>
          <div class="slide-contents">
            <div class="description">{{ image.description }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="btn success" v-for="(image, index) in images" :key="index" @click="goToSlide(index)"
              :class="{ active: currentIndex === index }"
              @mouseenter="handleButtonHover(true)"
              @mouseleave="handleButtonHover(false)">
        <img :src="image.src" :alt="image.title" class="thumbnail">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { src: '../../src/asstes/images/H.webp', title: 'Help', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium odio nostrum recusandae velit harum reiciendis deleniti deserunt, adipisci obcaecati! Ea numquam non magni atque quod expedita aliquid temporibus debitis saepe.' },
        { src:'../../src/asstes/images/HE.webp', title: 'Support', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium odio nostrum recusandae velit harum reiciendis deleniti deserunt, adipisci obcaecati! Ea numquam non magni atque quod expedita aliquid temporibus debitis saepe.' },
        { src:'../../src/asstes/images/i.webp', title: 'Contact', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium odio nostrum recusandae velit harum reiciendis deleniti deserunt, adipisci obcaecati! Ea numquam non magni atque quod expedita aliquid temporibus debitis saepe.' },
        { src:'../../src/asstes/images/q.webp', title: 'Qustions', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium odio nostrum recusandae velit harum reiciendis deleniti deserunt, adipisci obcaecati! Ea numquam non magni atque quod expedita aliquid temporibus debitis saepe.' }
      ],
      currentIndex: 0,
      startX: 0,
      currentTranslate: 0,
      sliding: false,
      hovering: false, // Track button hover state
      autoplayInterval: null // Interval id for autoplay
    };
  },
  mounted() {
    this.setupSwipe();
    this.startAutoplay();
  },
  methods: {
    goToSlide(index) {
      if (!this.sliding) {
        this.currentIndex = index;
        this.sliding = true;
        this.currentTranslate = -(index * 100);
        this.updateSlidePosition();
        setTimeout(() => {
          this.sliding = false;
        }, 500); // Transition duration + buffer time
      }
    },
    updateSlidePosition() {
      this.$refs.slides.style.transform = `translateX(${this.currentTranslate}%)`;
    },
    setupSwipe() {
      // Swipe functionality setup
      const slidesContainer = this.$refs.slides;
      slidesContainer.addEventListener('touchstart', this.handleTouchStart);
      slidesContainer.addEventListener('touchend', this.handleTouchEnd);
      slidesContainer.addEventListener('touchmove', this.handleTouchMove);
    },
    handleTouchStart(event) {
      if (!this.sliding) {
        this.startX = this.getTouchX(event);
      }
    },
    handleTouchEnd(event) {
      if (!this.sliding && this.startX !== null) {
        const endX = this.getTouchX(event);
        const deltaX = endX - this.startX;
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            this.currentIndex = Math.max(0, this.currentIndex - 1);
          } else {
            this.currentIndex = Math.min(this.images.length - 1, this.currentIndex + 1);
          }
          this.sliding = true;
          this.currentTranslate = -(this.currentIndex * 100);
          this.updateSlidePosition();
          setTimeout(() => {
            this.sliding = false;
          }, 500); // Transition duration + buffer time
        }
        this.startX = null;
      }
    },
    handleTouchMove(event) {
      if (this.startX !== null) {
        const currentX = this.getTouchX(event);
        const translateX = this.currentTranslate - ((this.startX - currentX) / this.$refs.slides.offsetWidth) * 100;
        this.$refs.slides.style.transform = `translateX(${translateX}%)`;
      }
    },
    getTouchX(event) {
      return event.touches ? event.touches[0].clientX : event.clientX;
    },
    handleMouseDown(event) {
      event.preventDefault();
      this.startX = event.clientX;
    },
    handleMouseMove(event) {
      if (this.startX !== null) {
        const currentX = event.clientX;
        const translateX = this.currentTranslate - ((this.startX - currentX) / this.$refs.slides.offsetWidth) * 100;
        this.$refs.slides.style.transform = `translateX(${translateX}%)`;
      }
    },
    handleMouseUp(event) {
      if (this.startX !== null) {
        const endX = event.clientX;
        const deltaX = endX - this.startX;
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            this.currentIndex = Math.max(0, this.currentIndex - 1);
          } else {
            this.currentIndex = Math.min(this.images.length - 1, this.currentIndex + 1);
          }
          this.sliding = true;
          this.currentTranslate = -(this.currentIndex * 100);
          this.updateSlidePosition();
          setTimeout(() => {
            this.sliding = false;
          }, 500); // Transition duration + buffer time
        }
        this.startX = null;
      }
    },
    handleMouseLeave(event) {
      if (this.startX !== null) {
        const endX = event.clientX;
        const deltaX = endX - this.startX;
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            this.currentIndex = Math.max(0, this.currentIndex - 1);
          } else {
            this.currentIndex = Math.min(this.images.length - 1, this.currentIndex + 1);
          }
          this.sliding = true;
          this.currentTranslate = -(this.currentIndex * 100);
          this.updateSlidePosition();
          setTimeout(() => {
            this.sliding = false;
          }, 500); // Transition duration + buffer time
        }
        this.startX = null;
      }
    },
    handleButtonHover(isHovering) {
      this.hovering = isHovering;
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.currentTranslate = -(this.currentIndex * 100);
        this.updateSlidePosition();
      }, 5000); // Change slide every 3 seconds (adjust as needed)
    },
    stopAutoplay() {
      clearInterval(this.autoplayInterval);
    }
  },
  beforeDestroy() {
    clearInterval(this.autoplayInterval);
  }
};
</script>

<style scoped>
.slider {
  width: 100%;
  margin: auto;
  text-align: center;
  overflow: hidden; /* Hide overflow for smooth swipe */
  position: relative;
}

.slides {
  display: flex;
  transition: transform 0.5s ease; /* Smooth transition between slides */
}

.slide {
  flex: 0 0 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.slide img {
  width: 100%;
  height: 500px;
}


.slide-content {
  position: absolute;
  left: 0px;
  width: 40%;
  color: #fff;
  background-color: rgba(255, 0, 0, 0.3);
  padding: 5px 10px;
  border-radius: 0px 5px 5px 0px;
  font-size: 56px;
  top:200px;
}
.slide-contents {
  position: absolute;
  left: 0;
  width: 80%;
  background-color: rgba(107, 100, 36, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 26px;
  box-sizing: border-box;
  top:300px;
  margin:40px;
}
.buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

button img.thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

button:hover img.thumbnail {
  opacity: 0.8;
  transform: scale(1.1);
}

button.active img.thumbnail {
  opacity: 1;
  transform: scale(1.2);
}

/* Cursor styling */
.slider:hover {
  cursor: grab; /* Change cursor on hover */
}

.slider:active {
  cursor: grabbing; /* Change cursor while clicking/dragging */
}

</style>
