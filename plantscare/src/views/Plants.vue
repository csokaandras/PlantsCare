<template>
  <div class="dashboard">
    <h1>Plant management</h1>
    <RouterLink to="/PlantsAdd">
      <button type="button" class="btn btn-primary">Add</button>
    </RouterLink>
    <table v-if="stats.length > 0" class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Plant Name</th>
          <th scope="col">Species</th>
          <th scope="col">Watering Interval days</th>
          <th scope="col">Methods</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stat in stats" :key="stat.id">
          <td scope="row">{{ stat.id }}</td>
          <td>{{ stat.name }}</td>
          <td>{{ stat.species }}</td>
          <td>{{ stat.water_interval_days }}</td>
          <td>
            <RouterLnk :to="'/PlantsEdit/' + stat.id">
              <button type="button" class="btn btn-warning">Edit</button>
            </RouterLnk>
            <button type="button" class="btn btn-danger" v-on:click="deletePlant(stat.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Loading statistics...</p>
  </div>
</template>

<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'

export default {
  name: 'Plants',
  data() {
    return {
      stats: [], // Array to store statistics
    }
  },
  methods: {
    async fetchStats() {
      try {
        const response = await axios.get('http://localhost:3000/plants')
        this.stats = response.data // Populate stats with API response
      } catch (error) {
        console.error('Error fetching statistics:', error)
        alert('Failed to load statistics. Please try again.')
      }
    },
    async deletePlant(id) {
      try {
        await axios.delete(`http://localhost:3000/plants/${id}`)
        this.stats = this.stats.filter((stat) => stat.id !== id) // Remove the deleted plant from the stats array
        alert('Plant deleted successfully!')
      } catch (error) {
        console.error('Error deleting plant:', error)
        alert('Failed to delete plant. Please try again.')
      }
    },
  },
  mounted() {
    this.fetchStats() // Fetch statistics when the component is mounted
  },
}
</script>

<style scoped></style>
