<template>
  <form @submit.prevent="submitPlant">
    <h1>Edit Plant</h1>
    <div class="mb-3">
      <label for="name" class="form-label">Plant's name:</label>
      <input type="text" class="form-control" id="name" v-model="plant.name" required />
    </div>
    <div class="mb-3">
      <label for="species" class="form-label">Plant's species:</label>
      <input type="text" class="form-control" id="species" v-model="plant.species" required />
    </div>
    <div class="mb-3">
      <label class="form-label" for="wateringInterval">Watering Interval days:</label>
      <input
        type="number"
        class="form-control"
        id="wateringInterval"
        v-model="plant.wateringInterval"
        required
      />
    </div>
    <button type="submit" class="btn btn-primary">Update</button>
  </form>

  <RouterLink to="/Plants">
    <button type="button" class="btn btn-secondary mt-3">Back to Plants</button>
  </RouterLink>
</template>

<script>
import axios from 'axios'
import { RouterLink} from 'vue-router'

export default {
  name: 'PlantsEdit',
  data() {
    return {
      plant: {
        name: '',
        species: '',
        wateringInterval: '',
      },
    }
  },
  methods: {
    async fetchPlant() {
      const id = this.$route.params.id // Get the plant ID from the URL
      try {
        const response = await axios.get(`http://localhost:3000/plants/${id}`)
        const plantData = response.data
        this.plant.name = plantData.name
        this.plant.species = plantData.species
        this.plant.wateringInterval = plantData.water_interval_days
      } catch (error) {
        console.error('Error fetching plant data:', error)
        alert('Failed to load plant data. Please try again.')
      }
    },
    async submitPlant() {
      const id = this.$route.params.id // Get the plant ID from the URL
      try {
        await axios.patch(`http://localhost:3000/plants/${id}`, {
          name: this.plant.name,
          species: this.plant.species,
          water_interval_days: this.plant.wateringInterval,
        })
        alert('Plant updated successfully!')
      } catch (error) {
        console.error('Error updating plant:', error)
        alert('Failed to update plant. Please try again.')
      }
    },
  },
  mounted() {
    this.fetchPlant() // Fetch the plant data when the component is mounted
  },
}
</script>

<style scoped></style>