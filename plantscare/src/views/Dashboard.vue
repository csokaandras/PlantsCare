<template>
  <div class="dashboard">
    <h1>Plant Statistics</h1>
    <table v-if="stats.length > 0" class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Plant Name</th>
          <th scope="col">Species</th>
          <th scope="col">Last watered date</th>
          <th scope="col">Watering count</th>
          <th scope="col">AVG amount ml</th>
          <th scope="col">Total watered ml</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stat in stats" :key="stat.id">
          <td scope="row">{{ stat.plant_id }}</td>
          <td>{{ stat.plant_name }}</td>
          <td>{{ stat.species }}</td>
          <td>{{ stat.last_watered_date }}</td>
          <td>{{ stat.watering_count }}</td>
          <td>{{ stat.average_amount_ml }}</td>
          <td>{{ stat.total_watered_ml }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Loading statistics...</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  data() {
    return {
      stats: [], // Array to store statistics
    }
  },
  methods: {
    async fetchStats() {
      try {
        const response = await axios.get('http://localhost:3000/stats')
        this.stats = response.data // Populate stats with API response
      } catch (error) {
        console.error('Error fetching statistics:', error)
        alert('Failed to load statistics. Please try again.')
      }
    },
  },
  mounted() {
    this.fetchStats() // Fetch statistics when the component is mounted
  },
}
</script>

<style scoped>
</style>
