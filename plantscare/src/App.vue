<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="container d-flex flex-column min-vh-100 vw-100">
    <header>
      <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3 d-flex w-auto">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#"><RouterLink to="/Dashboard">Dashboard</RouterLink></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><RouterLink to="/Plants">Plants</RouterLink></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><RouterLink to="/WateringsList">Watering</RouterLink></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <RouterView />

    <footer>
      <p>
        Bajai SZC Türr István Technikum &copy; 2025 Szoftver- Fejlesztő és Tesztelő Csóka András
      </p>
    </footer>
  </div>
</template>

<style scoped>
a {
  color: #aaaaaa;
  text-decoration: none;
}
</style>
