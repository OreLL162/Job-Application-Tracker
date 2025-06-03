<template>
  <Bar :data="barData" :options="barOptions" :height="height" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps({
  jobs: Array,
  height: {
    type: Number,
    default: 180
  }
})

const statusCounts = computed(() => {
  const counts = { Applied: 0, Interview: 0, Assignment: 0, Offer: 0, Rejected: 0 }
  props.jobs.forEach(job => {
    if (counts[job.status] !== undefined) counts[job.status]++
  })
  return counts
})

const barData = computed(() => ({
  labels: Object.keys(statusCounts.value),
  datasets: [{
    label: 'Jobs by Status',
    backgroundColor: ['#60a5fa', '#a78bfa', '#fdba74', '#4ade80', '#f87171'],
    data: Object.values(statusCounts.value)
  }]
}))

const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0 // Only integer numbers
      }
    }
  }
}
</script>