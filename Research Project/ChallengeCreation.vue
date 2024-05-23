<template>
  <div>
    <h1>Create Challenge</h1>
    <input v-model="challengeName" placeholder="Challenge Name" />
    <div v-for="(segment, index) in segments" :key="index">
      <input v-model="segment.name" placeholder="Segment Name" />
      <button @click="removeSegment(index)">Remove</button>
    </div>
    <button @click="addSegment">Add Segment</button>
    <button @click="saveChallenge">Save Challenge</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const challengeName = ref('');
    const segments = ref([{name: ''}]);
    const router = useRouter();

    const addSegment = () => {
      segments.value.push({name: ''});
    };

    const removeSegment = (index) => {
      segments.value.splice(index, 1);
    };

    const saveChallenge = () => {
      const challenges = JSON.parse(localStorage.getItem('challenges')) || [];
      const newChallenge = {
        name: challengeName.value,
        segments: segments.value,
      };
      challenges.push(newChallenge);
      localStorage.setItem('challenges', JSON.stringify(challenges));
      router.push('/');
    };

    return {challengeName, segments, addSegment, removeSegment, saveChallenge};
  },
};
</script>
