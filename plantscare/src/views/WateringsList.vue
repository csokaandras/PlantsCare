<template>
  <div class="dashboard">
    <h1>Watering Management</h1>
    <select class="form-select" v-model="selectedPlantId" aria-label="Select Plant">
      <option value="" disabled selected>Select a plant</option>
      <option v-for="plant in plants" :key="plant.id" :value="plant.id" @click="fetchWaterings(plant.id)">
        {{ plant.name }} ({{ plant.species }})
      </option>
    </select>

    <table v-if="waterings.length > 0" class="table mt-4">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Plant ID</th>
          <th scope="col">Date Watered</th>
          <th scope="col">Amount (ml)</th>
          <th scope="col">Notes</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="watering in waterings" :key="watering.id">
          <td>{{ watering.id }}</td>
          <td>{{ watering.plant_id }}</td>
          <td>{{ watering.date_watered }}</td>
          <td>{{ watering.amount_ml }}</td>
          <td>{{ watering.notes }}</td>
          <td>
            <button type="button" class="btn btn-danger" @click="deleteWatering(watering.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
      <RouterLink :to="'/WateringAdd/' + selectedPlantId">
        <button type="button" class="btn btn-primary mt-3">Add Watering Record</button>
      </RouterLink>
    </table>
    <p v-else>Loading watering records...</p>
  </div>
</template>

<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'

export default {
  name: 'WateringsList',
  data() {
    return {
      waterings: [],
      plants: [],
      selectedPlantId: 0,
      newWatering: {
        plant_id: '',
        date_watered: '',
        amount_ml: '',
        notes: '',
      },
    }
  },
  methods: {
    async fetchWaterings(selectedPlantId) {
      try {
        const response = await axios.get(`http://localhost:3000/plants/${selectedPlantId}/waterings`)
        this.waterings = response.data
      } catch (error) {
        console.error('Error fetching watering records:', error)
        alert('Failed to load watering records. Please try again.')
      }
    },
    async fetchPlants() {
      try {
        const response = await axios.get('http://localhost:3000/plants')
        this.plants = response.data
      } catch (error) {
        console.error('Error fetching plants:', error)
        alert('Failed to load plants. Please try again.')
      }
    },
    async deleteWatering(id) {
      try {
        await axios.delete(`http://localhost:3000/waterings/${id}`)
        this.waterings = this.waterings.filter((watering) => watering.id !== id)
      } catch (error) {
        console.error('Error deleting watering record:', error)
        alert('Failed to delete watering record. Please try again.')
      }
    },
  },
  mounted() {
    this.fetchPlants()
  },
}
</script>

<style scoped>
</style>