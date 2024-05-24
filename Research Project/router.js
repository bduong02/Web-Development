import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import ChallengeList from '@/components/ChallengeList.vue';
import ChallengeCreation from '@/components/ChallengeCreation.vue';
import ChallengeRecording from '@/components/ChallengeRecording.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/create-challenge',
        name: 'ChallengeCreation',
        component: ChallengeCreation
    },
    {
        path: '/list-challenges',
        name: 'ChallengeList',
        component: ChallengeList
    },
    {
        path: '/record/:id',
        name: 'ChallengeRecording',
        component: ChallengeRecording
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
