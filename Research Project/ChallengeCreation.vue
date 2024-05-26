// Bryan Duong
// ChallengeCreation.vue

<template>
  <div>
    <h1>Create Challenge</h1>
    <!-- Input field for the challenge name -->
    <input v-model="challengeName" placeholder="Challenge Name" />
    <!-- Loop through segments and display input fields for each segment -->
    <div v-for="(segment, index) in segments" :key="index">
      <input v-model="segment.name" placeholder="Segment Name" />
      <!-- Button to remove the current segment -->
      <button @click="removeSegment(index)">Remove</button>
    </div>
    <!-- Button to add a new segment -->
    <button @click="addSegment">Add Segment</button>
    <!-- Button to save the challenge -->
    <button @click="saveChallenge">Save Challenge</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(props, { emit }) {
    // Reactive variables for challenge name and segments
    const challengeName = ref('');
    const segments = ref([{ name: '' }]);

    // Function to add a new segment
    const addSegment = () => {
      segments.value.push({ name: '' });
    };

    // Function to remove a segment by index
    const removeSegment = (index) => {
      segments.value.splice(index, 1);
    };

    // Function to save the challenge
    const saveChallenge = () => {
      // Create a new challenge object with the input values
      const newChallenge = {
        name: challengeName.value,
        segments: segments.value,
        totalElapsed: 0, // Initialize totalElapsed as 0
      };
      // Emit an event to save the challenge
      emit('save-challenge', newChallenge);

      // Clear input fields after saving
      challengeName.value = '';
      segments.value = [{ name: '' }];
    };

    // Return reactive variables and functions
    return {
      challengeName,
      segments,
      addSegment,
      removeSegment,
      saveChallenge,
    };
  },
};
</script>

<style scoped>

</style>
