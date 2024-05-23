<template>
  <div>
    <h1>Challenges</h1>
    <ul>
      <li v-for="(challenge, index) in challenges" :key="index">
        <div>
          <span>{{ challenge.name }}</span>
          <router-link :to="`/record/${index}`">
            <button>Go to Challenge</button>
          </router-link>
        </div>
        <div v-if="bestTimes[index]">
          <p>Best Overall Time: {{ formatTime(bestTimes[index].overallTime) }}</p>
          <ul>
            <li v-for="(segment, segIndex) in challenge.segments" :key="segIndex">
              {{ segment.name }}: {{ formatSegmentTime(bestTimes[index].segmentTimes[segIndex]) }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <router-link to="/create">
      <button>+</button>
    </router-link>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const challenges = ref([]);
    const bestTimes = ref({});

    const formatTime = (timeInSeconds) => {
      if (timeInSeconds == null) {
        return '--:--:--';
      }
      return new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    };

    const formatSegmentTime = (timeInSeconds) => {
      if (timeInSeconds == null) {
        return '--:--:--';
      }
      return new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    };

    onMounted(() => {
      const storedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];
      const storedBestTimes = JSON.parse(localStorage.getItem('bestTimes')) || {};
      challenges.value = storedChallenges;
      bestTimes.value = storedBestTimes;
    });

    return {
      challenges,
      bestTimes,
      formatTime,
      formatSegmentTime,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
