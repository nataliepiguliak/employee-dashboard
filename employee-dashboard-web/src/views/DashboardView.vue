<template>
  <div class="dashboard-page">
    <h1>Dashboard</h1>
    <div>
      <FileUpload @fileSelected="onFileSelected" @validationResult="onValidationResult" />
    </div>
    <div v-if="shouldShowValidationResult">
      <h2>Validation Result</h2>
      <ul>
        <li v-for="vr in validationResults">{{ vr }}</li>
      </ul>
    </div>
    <div v-if="this.shouldShowCharts" class="dashboard-content">
      <Bar
        :colors="this.colors"
        :labels="this.industryLabels"
        :title="'Average Work Hours per Industry'"
        :values="this.averageWorkHoursValues"
      ></Bar>
      <Pie
        :colors="this.colors"
        :labels="this.industryLabels"
        :title="'Average Vacation Hours per Industry'"
        :values="this.averageVacationHoursValues"
      ></Pie>
      <Line
        :colors="this.colors"
        :labels="this.industryLabels"
        :title="'Average Overtime Hours per Industry'"
        :values="this.averageOvertimeHoursValues"
      ></Line>
    </div>
  </div>
</template>

<script lang="ts">
import { Chart, registerables } from 'chart.js'
import DashboardService from '@/services/DashboardService'
import Bar from '@/components/charts/BarChart.vue'
import Pie from '@/components/charts/PieChart.vue'
import Line from '@/components/charts/LineChart.vue'
import FileUpload from '@/components/FileUpload.vue'

Chart.register(...registerables)

export default {
  name: 'Dashboard',
  components: {
    Bar,
    Pie,
    Line,
    FileUpload
  },
  data() {
    return {
      shouldShowCharts: false,
      shouldShowValidationResult: false,
      validationResults: [],
      averageWorkHoursValues: [],
      averageVacationHoursValues: [],
      averageOvertimeHoursValues: [],
      industryLabels: [],
      colors: []
    }
  },
  methods: {
    onFileSelected() {
      this.shouldShowCharts = false
      this.shouldShowValidationResult = false
    },
    onValidationResult(vr) {
      this.shouldShowCharts = false

      if (vr && vr.length > 0) {
        this.shouldShowValidationResult = true
        this.validationResults = vr
      } else {
        this.showCharts()
      }
    },
    showCharts() {
      const that = this

      DashboardService.get().then((response) => {
        const values = response.data

        that.industryLabels = values.map((v) => v.industry)
        that.averageWorkHoursValues = values.map((v) => v.averageWorkHours)
        that.averageVacationHoursValues = values.map((v) => v.averageVacationHours)
        that.averageOvertimeHoursValues = values.map((v) => v.averageOvertimeHours)

        // generate colors for charts
        that.industryLabels.map((l) => {
          that.colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
        })

        that.shouldShowCharts = true
      })
    }
  }
}
</script>

<style>
.dashboard-content {
  display: flex;
  height: 500px;
  justify-content: space-between;
  margin-top: 5em;
}

.dashboard-page {
  display: block;
  padding: 0 50px;
}
</style>
