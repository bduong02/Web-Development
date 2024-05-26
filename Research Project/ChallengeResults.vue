// Bryan Duong
// ChallengeResults.vue

<template>
  <div>
    <h2>Challenge Results</h2>
    <!-- Loop through challenges and display results -->
    <ul>
      <li v-for="(challenge, index) in challenges" :key="index">
        <!-- Display challenge name -->
        <h3>{{ challenge.name }}</h3>
        <!-- Display total time for the challenge -->
        <div>Total Time: {{ formatTime(challenge.totalElapsed) }}</div>
        <!-- Loop through segments of the challenge and display segment details -->
        <ul>
          <li v-for="(segment, idx) in challenge.segments" :key="idx">
            {{ segment.name }} - {{ segment.time ? formatTime(segment.time) : 'Not recorded yet' }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    challenges: {
      type: Array,
      required: true,
    },
  },
  methods: {
    // Method to format time in seconds to MM:SS format
    formatTime(seconds) {
      // Handle invalid input or undefined time
      if (isNaN(seconds) || seconds === null || seconds === undefined) {
        return '00:00';
      }
      // Calculate minutes and seconds
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      // Return formatted time
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },
  },
};
</script>

<style scoped>

</style>
