// Bryan Duong
// router.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import ChallengeList from '@/components/ChallengeList.vue';
import ChallengeCreation from '@/components/ChallengeCreation.vue';
import ChallengeRecording from '@/components/ChallengeRecording.vue';
import ChallengeResults from '@/components/ChallengeResults.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/create-challenge',
        name: 'ChallengeCreation',
        component: ChallengeCreation,
    },
    {
        path: '/list-challenges',
        name: 'ChallengeList',
        component: ChallengeList,
    },
    {
        path: '/record/:name',
        name: 'ChallengeRecording',
        component: ChallengeRecording,
        props: true,
    },
    {
        path: '/results',
        name: 'ChallengeResults',
        component: ChallengeResults,
        props: (route) => ({ challenges: route.query.challenges ? JSON.parse(route.query.challenges) : [] }),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
