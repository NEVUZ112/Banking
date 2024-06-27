<template>
    <swiper :modules="[EffectFade]" effect="fade">
      <swiper-slide><img src="../asstes/images/img1.jpg" alt="" id="imger"></swiper-slide>
      <swiper-slide><img src="../asstes/images/img3.jpg" alt="" id="imger"></swiper-slide>
      <swiper-slide><img src="../asstes/images/img1.jpg" alt="" id="imger"></swiper-slide>
      <swiper-slide><img src="../asstes/images/img3.jpg" alt="" id="imger"></swiper-slide>    
      <swiper-slide><img src="../asstes/images/img1.jpg" alt="" id="imger"></swiper-slide>
      <swiper-slide><img src="../asstes/images/img3.jpg" alt="" id="imger"></swiper-slide>
      ...
    </swiper>
  </template>
  <script>
    import { EffectFade } from 'swiper/modules';
    import { Swiper, SwiperSlide } from 'swiper/vue';
  
    import 'swiper/css';
    import 'swiper/css/effect-fade';
  
    export default {
      components: {
        Swiper,
        SwiperSlide,
      },
      setup() {
        return {
          EffectFade,
        };
      },
    };
  </script>
  <style>
  #imger{
            width:100%;
        }
  </style>