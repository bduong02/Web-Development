// Bryan Duong
// ChallengeRecording.vue

<template>
  <div v-if="challenge">
    <!-- Display challenge name -->
    <h1>{{ challenge.name }}</h1>
    <div>
      <div>Overall Timer: {{ formatTime(timer) }}</div>
      <!-- Loop through segments and display segment details -->
      <ul>
        <li v-for="(segment, index) in challenge.segments" :key="index">
          <h2>{{ segment.name }}</h2>
          <div>
            <!-- Display segment timer and button to record time if not recorded yet -->
            Segment Timer: {{ segment.time ? formatTime(segment.time) : 'Not recorded yet' }}
            <button v-if="currentSegmentIndex === index && !segment.time" @click="recordSegmentTime(index)">Record Segment Time</button>
          </div>
        </li>
      </ul>
      <div>
        <!-- Buttons to control the timer -->
        <button @click="handleEnd">Reset Timer</button>
        <button @click="handlePause">{{ paused ? 'Resume' : 'Pause' }}</button>
        <button @click="stopAndSave">Stop and Save</button>
      </div>
    </div>
  </div>
  <div v-else>
    Challenge not found
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: {
    challenges: Array,
  },
  setup(props, { emit }) {
    const route = useRoute();
    const running = ref(false);
    const paused = ref(false);
    const timer = ref(0);
    const currentSegmentIndex = ref(0);
    const challenge = ref(null);
    let timerInterval = null;

    // Function to start the timer
    const handleStart = () => {
      running.value = true;
      startTimer();
    };

    // Function to start the timer interval
    const startTimer = () => {
      timerInterval = setInterval(() => {
        if (!paused.value) {
          timer.value += 1;
        }
      }, 1000);
    };

    // Function to reset the timer
    const handleEnd = () => {
      running.value = false;
      clearInterval(timerInterval);
      timer.value = 0; // Reset the timer to 0
      handleStart(); // Restart the timer
      emit('update-challenge', { ...challenge.value, timer: timer.value });
    };

    // Function to pause/resume the timer
    const handlePause = () => {
      paused.value = !paused.value;
    };

    // Function to stop the timer and save the challenge
    const stopAndSave = () => {
      running.value = false;
      clearInterval(timerInterval);
      // Save the overall challenge time
      emit('update-challenge', { ...challenge.value, totalElapsed: timer.value });
    };

    // Function to record segment time
    const recordSegmentTime = (index) => {
      if (currentSegmentIndex.value === index) {
        // Record the segment time
        challenge.value.segments[index].time = timer.value;
        // Move to the next segment
        currentSegmentIndex.value++;
        // Check if this is the last segment
        if (currentSegmentIndex.value >= challenge.value.segments.length) {
          stopAndSave();
        }
      }
    };

    // Function to format time in seconds to HH:MM:SS format
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // Fetch challenge data based on the route parameter
    onMounted(() => {
      const challengeName = route.params.name;
      challenge.value = props.challenges.find(c => c.name === challengeName) || null;
      if (challenge.value) {
        handleStart(); // Start the timer automatically when the component is mounted
      }
    });

    // Watch for changes in route parameters and update challenge data
    watch(() => route.params.name, (newName) => {
      challenge.value = props.challenges.find(c => c.name === newName) || null;
    });

    // Return reactive variables and functions
    return {
      running,
      paused,
      timer,
      currentSegmentIndex,
      challenge,
      handleStart,
      handleEnd,
      handlePause,
      stopAndSave,
      recordSegmentTime,
      formatTime,
    };
  },
};
</script>

<style scoped>

</style>
