// Bryan Duong
// ChallengeList.vue

<template>
  <div>
    <h2>Challenges</h2>
    <!-- Loop through challenges and display each challenge -->
    <ul>
      <li v-for="(challenge, index) in challenges" :key="index">
        {{ challenge.name }}
        <!-- Button to start recording for the current challenge -->
        <button @click="startRecording(challenge.name)">Record</button>
        <!-- Button to remove the current challenge -->
        <button @click="removeChallenge(index)">Remove</button>
      </li>
    </ul>
    <!-- Link to view challenge results -->
    <router-link :to="{ name: 'ChallengeResults', query: { challenges: JSON.stringify(challenges) } }">View Results</router-link>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: {
    challenges: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    // Access the router instance
    const router = useRouter();
    // Reactive variable for challenges
    const challenges = ref(props.challenges);

    // watches for changes in props.challenges and update the local challenges variable
    watch(() => props.challenges, (newChallenges) => {
      challenges.value = newChallenges;
    });

    // Function to start recording for a challenge
    const startRecording = (challengeName) => {
      router.push({ name: 'ChallengeRecording', params: { name: challengeName } });
    };

    // Function to remove a challenge by index
    const removeChallenge = (index) => {
      challenges.value.splice(index, 1);
      // Update local storage after removing the challenge
      localStorage.setItem('challenges', JSON.stringify(challenges.value));
    };

    // Return reactive variables and functions
    return {
      challenges,
      startRecording,
      removeChallenge,
    };
  },
};
</script>

<style scoped>

</style>
