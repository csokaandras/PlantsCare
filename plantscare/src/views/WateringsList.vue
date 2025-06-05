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
    </table>
    <p v-else>Loading watering records...</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Waterings',
  data() {
    return {
      waterings: [], // Array to store watering records
      plants: [], // Array to store plants for the dropdown
      selectedPlantId: '', // Selected plant ID from the dropdown
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
        const response = await axios.get('http://localhost:3000/waterings/'+selectedPlantId)
        this.waterings = response.data // Populate waterings with API response
      } catch (error) {
        console.error('Error fetching watering records:', error)
        alert('Failed to load watering records. Please try again.')
      }
    },
    async fetchPlants() {
      try {
        const response = await axios.get('http://localhost:3000/plants')
        this.plants = response.data // Populate plants with API response
      } catch (error) {
        console.error('Error fetching plants:', error)
        alert('Failed to load plants. Please try again.')
      }
    },
    async deleteWatering(id) {
      try {
        await axios.delete(`http://localhost:3000/waterings/${id}`)
        this.waterings = this.waterings.filter((watering) => watering.id !== id) // Remove the deleted record
        alert('Watering record deleted successfully!')
      } catch (error) {
        console.error('Error deleting watering record:', error)
        alert('Failed to delete watering record. Please try again.')
      }
    },
  },
  mounted() {
    this.fetchWaterings() // Fetch watering records when the component is mounted
    this.fetchPlants() // Fetch plants for the dropdown when the component is mounted
  },
}
</script>

<style scoped>
</style>