<template>
  <LineChart ref="lineRef" :chartData="chartData" :options="options" />
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { LineChart } from 'vue-chart-3'

export default {
  name: 'Line',
  components: {
    LineChart
  },
  props: {
    values: [Number],
    labels: [String],
    colors: [String],
    title: String
  },
  setup(props) {
    const data = props.values
    const labels = props.labels
    const colors = props.colors

    const lineRef = ref()

    const options = ref({
      responsive: true,
      plugins: {
        legend: null,
        title: {
          display: true,
          text: props.title
        }
      }
    })

    const chartData = computed(() => ({
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: colors
        }
      ]
    }))
    return { chartData, lineRef, options }
  }
}
</script>
