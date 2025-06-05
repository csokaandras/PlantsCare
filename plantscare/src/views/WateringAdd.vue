<template>
  <div class="watering-add">
    <h1>Add Watering Record</h1>
    <form @submit.prevent="submitWatering">
      <div class="mb-3">
        <label for="dateWatered" class="form-label">Date Watered:</label>
        <input type="date" class="form-control" id="dateWatered" v-model="watering.date_watered" required />
      </div>
      <div class="mb-3">
        <label for="amountMl" class="form-label">Amount (ml):</label>
        <input type="number" class="form-control" id="amountMl" v-model="watering.amount_ml" required />
      </div>
      <div class="mb-3">
        <label for="notes" class="form-label">Notes:</label>
        <textarea class="form-control" id="notes" v-model="watering.notes"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Add Watering</button>
    </form>

    <RouterLink to="/WateringsList">
      <button type="button" class="btn btn-secondary mt-3">Back to Waterings List</button>
    </RouterLink>
  </div>
</template>

<script>
import axios from 'axios'
import { allowedNodeEnvironmentFlags } from 'process'
import { RouterLink } from 'vue-router'

export default {
  name: 'WateringAdd',
  data() {
    return {
      watering: {
        plant_id: this.$route.params.id,
        date_watered: '',
        amount_ml: '',
        notes: '',
      },
    }
  },
  methods: {
    async submitWatering() {
      try {
        const response = await axios.post('http://localhost:3000/waterings', this.watering)
        // Reset the form
        this.watering = {
          date_watered: '',
          amount_ml: '',
          notes: '',
        }
        alert('Watering record added successfully!')
      } catch (error) {
        console.error('Error adding watering record:', error)
        alert('Failed to add watering record. Please try again.')
      }
    },
  },
}
</script>

<style scoped>
form {
  max-width: 600px;
  margin: auto;
}

button {
  margin-top: 1rem;
}
</style>