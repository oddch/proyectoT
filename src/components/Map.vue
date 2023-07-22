<template>
  <div id="mapContainer">
  </div>
</template>

<script>

import L from 'leaflet'
import  io  from 'socket.io-client';

export default {
  name: 'App',
  components: {
    L
  },
  data() {
    return {
      apiKey: "2i3eri5CQjBWbgnoerqe",
      apiUrl: `https://api.maptiler.com/maps/streets/style.json?key=${this.apiKey}`,
      zoom: 10,
      center: [-75.5802, 6.2444],
      map: null,
      socket :null
    }
  },
  created() {
    this.socket = io('http://protegeme.com.co:8084')
    console.log('prueba')
   
  },
  mounted() {
    this.createMapLayer()
    this.socket.on('mensaje-personal', (data) => {
      console.log('Información recibida:');
    })
    this.socket.on('datos', (data) => {
      print('hola')
      console.log(data);
    })
    this.socket.emit('text', {'hola': 'hola'})
 
  },
  methods: {
    connection(){
      this.socket.on("mensaje-personal", (data) => {
       console.log('prueba')
      });
    },
    createMapLayer() {
     
      this.map = L.map('mapContainer').setView([6.25184, -75.56359], 13)
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map)

      // if (props.markers.length) {
        this.setMarkers()
      // }
    },

    setMarkers() {
      // props.markers.map((marker) => {
        L.marker([6.309575,-75.562647]).addTo(this.map)
          .bindPopup('Casa')
      // })
    }
  },

}
</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
<!-- --------------------------------------------------------------- -->
