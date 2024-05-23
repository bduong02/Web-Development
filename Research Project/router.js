// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import ChallengeCreationScreen from '@/components/ChallengeCreation.vue';
import ChallengeListingScreen from '@/components/ChallengeList.vue';
import ChallengeRecordingScreen from '@/components/ChallengeRecording.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/create-challenge',
        name: 'ChallengeCreationScreen',
        component: ChallengeCreationScreen
    },
    {
        path: '/list-challenges',
        name: 'ChallengeListingScreen',
        component: ChallengeListingScreen
    },
    {
        path: '/record/:id',
        name: 'ChallengeRecordingScreen',
        component: ChallengeRecordingScreen
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
