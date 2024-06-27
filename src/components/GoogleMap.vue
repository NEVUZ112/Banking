<template>
  <div>
    <h1 style="text-align:center;">Xarita</h1>
    <input 
      v-model="location" 
      placeholder="Hududni kiriting" 
      style="width: 80%; padding: 8px; margin-bottom: 10px;"
    />
    <button @click="searchLocation" style="padding: 8px; width: 150px;" class="btn success">Qidirish</button>
    <div ref="mapContainer" style="width: 100%; height: 400px; margin-top: 10px;"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const mapContainer = ref(null);
    const location = ref('');
    let map;
    let marker;

    const initializeMap = () => {
      map = new google.maps.Map(mapContainer.value, {
        center: { lat: 30.4722, lng: 40.7240 },
        zoom: 12,
      });

      marker = new google.maps.Marker({
        position: { lat: 30.4722, lng: 40.7240 },
        map: map,
      });
    };

    const searchLocation = () => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: location.value }, (results, status) => {
        if (status === 'OK') {
          const position = results[0].geometry.location;
          map.setCenter(position);
          map.setZoom(14);
          marker.setPosition(position);
        } else {
          alert('Qidiruv natijasi topilmadi: ' + status);
        }
      });
    };

    onMounted(() => {
      initializeMap();
    });

    return {
      mapContainer,
      location,
      searchLocation,
    };
  },
};
</script>

<style>
/* Stil qo'shishingiz mumkin */
</style>