// Bryan Duong
// App.vue

<template>
  <div id="app">
    <main>
      <router-view
          :challenges="challenges"
          @save-challenge="addChallenge"
          @update-challenge="updateChallenge"
      />
    </main>
  </div>
</template>

<script setup>
import {reactive, toRefs, onMounted} from 'vue';

// Create a reactive challenges array to manage state centrally
const state = reactive({
  challenges: [],
});

// Method to calculate total elapsed time for a challenge
function calculateTotalElapsed(challenge) {
  const lastRecordedSegment = challenge.segments.filter(segment => segment.time).slice(-1)[0];
  return lastRecordedSegment ? lastRecordedSegment.time : 0;
}

// Method to add a new challenge
function addChallenge(newChallenge) {
  newChallenge.totalElapsed = calculateTotalElapsed(newChallenge);
  state.challenges.push(newChallenge);
  localStorage.setItem('challenges', JSON.stringify(state.challenges)); // Update localStorage
}

// Method to update an existing challenge
function updateChallenge(updatedChallenge) {
  const index = state.challenges.findIndex(c => c.name === updatedChallenge.name);
  if (index !== -1) {
    updatedChallenge.totalElapsed = calculateTotalElapsed(updatedChallenge);
    state.challenges[index] = updatedChallenge;
    localStorage.setItem('challenges', JSON.stringify(state.challenges)); // Update localStorage
  }
}

// Retrieve challenges from localStorage when component is mounted
onMounted(() => {
  const savedChallenges = localStorage.getItem('challenges');
  if (savedChallenges) {
    state.challenges = JSON.parse(savedChallenges);
  }
});

const {challenges} = toRefs(state);
</script>

<style scoped>

</style>
