<template>
  <div v-if="challenge">
    <h1>{{ challenge.name }}</h1>
    <div>Timer: {{ formatTime(timer) }}</div>
    <ul>
      <li v-for="(segment, index) in challenge.segments" :key="index" :style="{ color: getSegmentColor(index) }">
        {{ segment.name }}: {{ formatSegmentTime(segmentTimes[index]) }}
      </li>
    </ul>
    <div v-if="!running">
      <button @click="handleStart">Start</button>
    </div>
    <div v-else>
      <button @click="handleNextSegment" :disabled="paused || segmentTimes[segmentTimes.length - 1] !== null">
        Next Segment
      </button>
      <button @click="handleEnd">End</button>
      <button @click="handlePause">{{ paused ? 'Resume' : 'Pause' }}</button>
    </div>
  </div>
  <div v-else>
    Challenge not found
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const id = route.params.id;
    const challenges = JSON.parse(localStorage.getItem('challenges')) || [];
    const bestTimes = JSON.parse(localStorage.getItem('bestTimes')) || {};
    const challenge = challenges[id];

    const timer = ref(0);
    const segmentTimes = ref(Array(challenge?.segments.length).fill(null));
    const running = ref(false);
    const paused = ref(false);

    const formatTime = (timeInSeconds) => {
      return new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    };

    const formatSegmentTime = (timeInSeconds) => {
      return timeInSeconds !== null ? new Date(timeInSeconds * 1000).toISOString().substr(11, 8) : '--:--:--';
    };

    let interval = null;

    const startTimer = () => {
      interval = setInterval(() => {
        timer.value += 1;
      }, 1000);
    };

    const stopTimer = () => {
      clearInterval(interval);
      interval = null;
    };

    const handleStart = () => {
      running.value = true;
      paused.value = false;
      startTimer();
    };

    const handlePause = () => {
      paused.value = !paused.value;
      if (paused.value) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    const handleNextSegment = () => {
      const nextIndex = segmentTimes.value.findIndex((time) => time === null);
      if (nextIndex !== -1) {
        segmentTimes.value[nextIndex] = timer.value;
      }
    };

    const handleEnd = () => {
      running.value = false;
      paused.value = false;
      stopTimer();

      const currentRunTime = timer.value;
      const bestRun = bestTimes[id] || {
        overallTime: Infinity,
        segmentTimes: Array(challenge.segments.length).fill(Infinity)
      };

      if (currentRunTime < bestRun.overallTime) {
        bestTimes[id] = {overallTime: currentRunTime, segmentTimes: segmentTimes.value};
        localStorage.setItem('bestTimes', JSON.stringify(bestTimes));
      }
    };

    const getSegmentColor = (index) => {
      if (segmentTimes.value[index] === null) return 'black';
      const bestSegmentTime = bestTimes[id]?.segmentTimes[index] ?? Infinity;
      if (segmentTimes.value[index] < bestSegmentTime) return 'green';
      if (segmentTimes.value[index] === bestSegmentTime) return 'yellow';
      return 'red';
    };

    onMounted(() => {
      if (!challenge) return;
    });

    onUnmounted(() => {
      stopTimer();
    });

    return {
      challenge,
      timer,
      segmentTimes,
      running,
      paused,
      formatTime,
      formatSegmentTime,
      handleStart,
      handlePause,
      handleNextSegment,
      handleEnd,
      getSegmentColor,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
