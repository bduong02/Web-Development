// Bryan Duong
// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './components/router.js';

const app = createApp(App);

// Retrieve challenges from localStorage
const savedChallenges = localStorage.getItem('challenges');
if (savedChallenges) {
    app.config.globalProperties.$challenges = JSON.parse(savedChallenges);
} else {
    app.config.globalProperties.$challenges = []; // Initialize as empty array if no saved data
}

app.use(router).mount('#app');
