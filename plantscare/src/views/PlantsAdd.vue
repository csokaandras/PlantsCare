<template>
  <form @submit.prevent="submitPlant">
    <h1>Plant Management</h1>
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
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>

  <RouterLink to="/Plants">
    <button type="button" class="btn btn-secondary mt-3">Back to Plants</button>
  </RouterLink>
</template>
<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'
export default {
  name: 'PlantsAdd',
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
    async submitPlant() {
      try {
        const response = await axios.post('http://localhost:3000/plants', {
          name: this.plant.name,
          species: this.plant.species,
          water_interval_days: this.plant.wateringInterval,
        })
        console.log(response.data)
        // Reset the form
        this.plant.name = ''
        this.plant.species = ''
        this.plant.wateringInterval = ''
        alert('Plant added successfully!')
      } catch (error) {
        console.error('Error adding plant:', error)
      }
    },
  },
}
</script>

<style scoped></style>
