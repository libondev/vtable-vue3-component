
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.css'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')

// import Map from 'ol/Map.js';
// import TileLayer from 'ol/layer/Tile.js';
// import View from 'ol/View.js';
// import {OSM, TileDebug} from 'ol/source.js';

// const map = new Map({
//   layers: [
//     new TileLayer({
//       source: new OSM(),
//     }),
//     new TileLayer({
//       source: new TileDebug(),
//     }),
//   ],
//   target: 'app',
//   view: new View({
//     center: [0, 0],
//     zoom: 1,
//   }),
// });
